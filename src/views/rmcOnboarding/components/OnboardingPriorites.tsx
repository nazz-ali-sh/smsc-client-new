'use client'
import React, { useState } from 'react'

import Image from 'next/image'

import { useRouter } from 'next/navigation'

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

interface PriorityItem {
  id: string
  title: string
  description: string
}

const response: PriorityItem[] = [
  {
    id: '1',
    title: 'Saving Money',
    description: 'I want to reduce my service charges and get better value for money.'
  },
  {
    id: '2',
    title: 'Clearer Communication',
    description: 'I want regular updates and quicker replies from my managing agent.'
  },
  {
    id: '3',
    title: 'Being Involved',
    description: 'I want to be consulted on important decisions about our building.'
  },
  {
    id: '4',
    title: 'Better Problem Solving',
    description: 'I want maintenance and issues dealt with quickly and properly.'
  },
  {
    id: '5',
    title: 'Proactive Management',
    description: 'I want potential issues identified and resolved before they escalate.'
  },
  {
    id: '6',
    title: 'Higher Standards',
    description: 'I want a professional, consistent service that reflects pride in the block.'
  },
  {
    id: '7',
    title: 'Clearer Financial Reporting',
    description: 'I want easy-to-understand budgets and breakdowns of what we’re paying for.'
  }
]

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
  const [available, setAvailable] = useState<PriorityItem[]>(response)
  const [slots, setSlots] = useState<(PriorityItem | null)[]>(new Array(7).fill(null))

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

    if (!over.id.toString().startsWith('slot-')) return

    const slotIndex = parseInt(over.id.toString().replace('slot-', ''), 10)

    const draggedFromAvailable = available.find(item => item.id === active.id)
    const draggedFromSlotIndex = slots.findIndex(item => item?.id === active.id)

    const newSlots = [...slots]

    if (newSlots[slotIndex]) {
      setAvailable(prev => [...prev, newSlots[slotIndex] as PriorityItem])
    }

    if (draggedFromAvailable) {
      newSlots[slotIndex] = draggedFromAvailable
      setSlots(newSlots)
      setAvailable(prev => prev.filter(item => item.id !== draggedFromAvailable.id))
    }

    if (draggedFromSlotIndex !== -1) {
      const draggedItem = slots[draggedFromSlotIndex]

      if (draggedItem) {
        newSlots[slotIndex] = draggedItem
        newSlots[draggedFromSlotIndex] = null
        setSlots(newSlots)
      }
    }
  }

  const handleRemove = (index: number) => {
    const removedItem = slots[index]

    if (removedItem) {
      setAvailable(prev => [...prev, removedItem])
      const newSlots = [...slots]

      newSlots[index] = null
      setSlots(newSlots)
    }
  }

  const slotColors = ['#002AFF', '#005BFF', '#0090FF', '#00C6FF', '#00FFFF', '#00FFC6', '#00FF90']

  const handleNext = () => {
    router.push('/rmc-onboarding-open')
  }

  return (
    <>
      <div className='  flex flex-col items-center py-10 pb-20'>
        <h1 className='text-3xl font-bold text-[#262B43] mb-8'>RMC Onboarding</h1>

        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className='bg-white  p-10 w-11/12 max-w-7xl grid grid-cols-2 gap-8'>
            <div>
              <h2 className='text-lg font-semibold text-[#262B43] mb-4'>RMC Priorities</h2>
              <p className='text-sm text-[#696969] mb-6'>
                Drag the items below to arrange them from most to least important.
              </p>
              <h2 className='text-lg font-semibold text-[#424242] mb-4'>Priority List</h2>

              <div className='space-y-[31px] '>
                {available.map(item => (
                  <Draggable key={item.id} id={item.id}>
                    <div className='p-2 flex items-center gap-3'>
                      <Image src='/svgs/drag.svg' alt='drag-icon' width={22} height={22} />

                      <div className='flex items-start flex-col'>
                        <p className='font-medium text-[#424242] text-xl '>{item.title}</p>
                        <p className='text-[#969696] font-medium  text-base pt-1'>{item.description}</p>
                      </div>
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>

            <div className='mt-24'>
              <h2 className='text-xs font-semibold text-[#424242] mb-7'>Most Important</h2>
              {slots.map((slot, index) => (
                <Droppable key={index} id={`slot-${index}`}>
                  <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-3'>
                      <span
                        className='w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center'
                        style={{ backgroundColor: slotColors[index] }}
                      >
                        {index + 1}
                      </span>
                      {slot && <span className='text-gray-700 font-medium'>{slot.title}</span>}
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
              <div className='flex justify-end gap-3 mt-10'>
                <CustomButton startIcon={<i className='ri-arrow-left-line'></i>}>Back</CustomButton>
                <CustomButton endIcon={<i className='ri-arrow-right-line'></i>} onClick={handleNext}>
                  Next
                </CustomButton>
              </div>
            </div>
          </div>
        </DndContext>
      </div>
    </>
  )
}

export default OnboardingPriorities
