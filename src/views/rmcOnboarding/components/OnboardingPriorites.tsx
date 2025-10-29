'use client'
import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import type { DragEndEvent } from '@dnd-kit/core'
import {
  DndContext,
  useDraggable,
  useDroppable,
  pointerWithin,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

import CustomButton from '@/common/CustomButton'
import {
  submitRmcPriorities,
  getRmcPriorities,
  type RmcPrioritiesPayload,
  type RmcPriority
} from '@/services/rmc-onboarding-apis/rmc-onboarding-api'
import type { RootState } from '@/redux-store'
import { useRmcOnboardingData } from '@/hooks/useRmcOnboardingData'

interface PriorityItem {
  id: string
  title: string
  description: string
}

const transformPriorities = (apiPriorities: RmcPriority[]): PriorityItem[] => {
  return (
    apiPriorities?.map(priority => ({
      id: priority?.id?.toString(),
      title: priority?.name,
      description: priority?.description
    })) || []
  )
}

const Draggable: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  })

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='cursor-grab'>
      {children}
    </div>
  )
}

const Droppable: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`w-full py-5 border rounded-md flex items-center justify-between px-4 mb-7 transition-colors ${
        isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      {children}
    </div>
  )
}

const OnboardingPriorities: React.FC = () => {
  const router = useRouter()
  const [available, setAvailable] = useState<PriorityItem[]>([])
  const [slots, setSlots] = useState<(PriorityItem | null)[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const rmcData = useSelector((state: RootState) => state?.rmcOnboarding?.rmcData)
  const { data: onboardingData, invalidateCache } = useRmcOnboardingData()

  const { data: priorities } = useQuery({
    queryKey: ['rmc-priorities', onboardingData?.onboarding_id ?? rmcData?.tender_onboarding_id],
    queryFn: getRmcPriorities,
    enabled: !!(onboardingData?.onboarding_id || rmcData?.tender_onboarding_id),
    retry: 2
  })

  useEffect(() => {
    if (priorities && priorities?.length > 0) {
      const transformedPriorities = transformPriorities(priorities)

      const existingPriorities = onboardingData?.steps?.step_6?.priorities || []
      const initialSlots = new Array(priorities?.length)?.fill(null)

      existingPriorities?.forEach((priorityId: number, index: number) => {
        const priorityItem = transformedPriorities?.find(item => parseInt(item?.id) === priorityId)

        if (priorityItem && index < initialSlots?.length) {
          initialSlots[index] = priorityItem
        }
      })

      const availablePriorities = transformedPriorities?.filter(
        item => !existingPriorities?.includes(parseInt(item?.id))
      )

      setAvailable(availablePriorities)
      setSlots(initialSlots)
    }
  }, [priorities, onboardingData])

  const mutation = useMutation({
    mutationFn: submitRmcPriorities,
    onSuccess: () => {
      invalidateCache()
      router.push('/open')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit priorities. Please try again.')
      setIsSubmitting(false)
    }
  })

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 }
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 }
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    if (!over?.id?.toString()?.startsWith('slot-')) return

    const slotIndex = parseInt(over?.id?.toString()?.replace('slot-', '') || '0', 10)

    const draggedFromAvailable = available?.find(item => item?.id === active?.id)
    const draggedFromSlotIndex = slots?.findIndex(item => item?.id === active?.id)

    const newSlots = [...slots]

    if (draggedFromAvailable) {
      const firstEmptySlot = newSlots?.findIndex(slot => slot === null)

      if (slotIndex !== firstEmptySlot) {
        toast.error('Please drop priorities in sequence. Fill slots consecutively starting from position 1.')

        return
      }
    }

    if (newSlots?.[slotIndex]) {
      setAvailable(prev => [...prev, newSlots?.[slotIndex] as PriorityItem])
    }

    if (draggedFromAvailable) {
      newSlots[slotIndex] = draggedFromAvailable
      setSlots(newSlots)
      setAvailable(prev => prev?.filter(item => item?.id !== draggedFromAvailable?.id) || [])
    }

    if (draggedFromSlotIndex !== -1) {
      const draggedItem = slots?.[draggedFromSlotIndex]

      if (draggedItem) {
        newSlots[slotIndex] = draggedItem
        newSlots[draggedFromSlotIndex] = null
        setSlots(newSlots)
      }
    }
  }

  const handleRemove = (index: number) => {
    const removedItem = slots?.[index]

    if (removedItem) {
      setAvailable(prev => [...prev, removedItem])
      const newSlots = [...slots]

      newSlots[index] = null
      setSlots(newSlots)
    }
  }

  const generateSlotColors = (length: number): string[] => {
    const baseColors = ['#002AFF', '#005BFF', '#0090FF', '#00C6FF', '#00FFFF', '#00FFC6', '#00FF90']
    const colors: string[] = []

    for (let i = 0; i < length; i++) {
      colors?.push(baseColors[i % baseColors?.length])
    }

    return colors
  }

  const slotColors = generateSlotColors(slots?.length || 0)

  const validateSequence = (): boolean => {
    const filledSlots = slots?.map((slot, index) => (slot ? index : -1)).filter(index => index !== -1)

    if (available?.length > 0) {
      toast.error('Please set all priorities before proceeding.')

      return false
    }

    if (filledSlots?.length === 0) {
      toast.error('Please select at least one priority.')

      return false
    }

    for (let i = 0; i < filledSlots?.length; i++) {
      if (filledSlots[i] !== i) {
        toast.error('Please arrange priorities in sequence. There should be no gaps between selected priorities.')

        return false
      }
    }

    return true
  }

  const handleNext = () => {
    if (isSubmitting || mutation.isPending) return

    if (!onboardingData?.onboarding_id && !rmcData?.tender_onboarding_id) {
      toast.error('Tender onboarding ID not found. Please try again.')

      return
    }

    if (!validateSequence()) {
      return
    }

    setIsSubmitting(true)

    const priorities =
      slots?.map(slot => (slot ? parseInt(slot?.id) : null))?.filter((id): id is number => id !== null) || []

    const payload: RmcPrioritiesPayload = {
      tender_onboarding_id: onboardingData?.onboarding_id ?? rmcData?.tender_onboarding_id,
      priorities: priorities,
      step: 6
    }

    mutation.mutate(payload)
  }

  const handleBack = () => {
    router.push('/spaces')
  }

  return (
    <>
      <div className='flex flex-col items-center py-10 pb-20'>
        <h1 className='text-3xl font-bold text-[#262B43] mb-8'>RMC Onboarding</h1>

        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className='bg-white p-10 w-full '>
            <div className='grid grid-cols-2 gap-8'>
              <div>
                <h2 className='text-lg font-semibold text-[#262B43] mb-4'>RMC Priorities</h2>
                <p className='text-sm text-[#696969] mb-6'>
                  Drag the items into the right box in order from most to least important. Start from the first box.
                </p>
                <h2 className='text-lg font-semibold text-[#424242] mb-4'>Priority List</h2>

                <div className='space-y-[31px] '>
                  {available?.map(item => (
                    <Draggable key={item?.id} id={item?.id}>
                      <div className='p-2 flex items-center gap-3'>
                        <Image src='/svgs/drag.svg' alt='drag-icon' width={22} height={22} />

                        <div className='flex items-start flex-col'>
                          <p className='font-medium text-[#424242] text-xl '>{item?.title}</p>
                          <p className='text-[#969696] font-medium  text-base pt-1'>{item?.description}</p>
                        </div>
                      </div>
                    </Draggable>
                  ))}
                </div>
              </div>

              <div className='mt-24'>
                <h2 className='text-xs font-semibold text-[#424242] mb-7'>Most Important</h2>
                {slots?.map((slot, index) => (
                  <Droppable key={index} id={`slot-${index}`}>
                    <div className='flex items-center justify-between w-full'>
                      <div className='flex items-center gap-3'>
                        <span
                          className='w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center'
                          style={{ backgroundColor: slotColors?.[index] }}
                        >
                          {index + 1}
                        </span>
                        {slot && <span className='text-gray-700 font-medium'>{slot?.title}</span>}
                      </div>
                      {slot && (
                        <button
                          onClick={() => handleRemove(index)}
                          className='text-gray-500 hover:text-red-500 bg-transparent cursor-pointer'
                        >
                          <i className='ri-close-line text-lg'></i>
                        </button>
                      )}
                    </div>
                  </Droppable>
                ))}

                <p className='text-xs font-semibold text-[#424242] mt-2'>Least Important</p>
              </div>
            </div>

            <div className='flex justify-between gap-3 mt-10'>
              <CustomButton onClick={handleBack} variant='outlined' startIcon={<i className='ri-arrow-left-line'></i>}>
                Back
              </CustomButton>
              <CustomButton
                endIcon={<i className='ri-arrow-right-line'></i>}
                onClick={handleNext}
                isLoading={isSubmitting || mutation.isPending}
                disabled={isSubmitting || mutation.isPending}
              >
                {isSubmitting || mutation.isPending ? 'Submitting...' : 'Next'}
              </CustomButton>
            </div>
          </div>
        </DndContext>
      </div>
    </>
  )
}

export default OnboardingPriorities
