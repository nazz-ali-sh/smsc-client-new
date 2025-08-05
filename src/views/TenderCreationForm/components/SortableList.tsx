'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  KeyboardSensor
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import six_Dots from '../../../../public/images/customImages/sixDots.svg'
import type { DragAndDrop, SortableListProps } from '../types'

const SortableItem: React.FC<{ id: string; content: string; subtext: string }> = ({ id, content, subtext }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: transform ? 'lightblue' : 'white',
    marginBottom: '8px',
    borderRadius: '4px',
    boxShadow: transform ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
  }

  return (
    <ListItem ref={setNodeRef} style={style} {...attributes}>
      <ListItemIcon {...listeners} style={{ cursor: 'grab' }}>
        <Image src={six_Dots} alt='dots' />
      </ListItemIcon>
      <ListItemText primary={content} secondary={subtext} />
    </ListItem>
  )
}

const SortableList: React.FC<SortableListProps> = ({ sortListData, isLoading }) => {
  console.log(sortListData, 'sortListData')
  const [items, setItems] = useState<DragAndDrop[]>(sortListData)

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      const newItems = [...items]
      const [movedItem] = newItems.splice(oldIndex, 1)

      newItems.splice(newIndex, 0, movedItem)
      setItems(newItems)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {isLoading ? (
            <div className='loader flex justify-center items-center w-[100%]'>Loading...</div>
          ) : items && items.length > 0 ? (
            items.map(item => (
              <SortableItem key={item.id} id={item.id} content={item.name} subtext={item.description} />
            ))
          ) : (
            <div className='text-center w-[100%]'>No data available</div>
          )}
        </List>
      </SortableContext>
    </DndContext>
  )
}

export default SortableList
