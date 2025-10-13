'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Popover, Box } from '@mui/material'

import { links } from '@/constants'

interface HorizontalMenuPopOverProps {
  open: boolean
  anchorEl: HTMLElement | null
  handlePopoverClose: () => void
}

const HorizontalMenuPopOver = ({ open, anchorEl, handlePopoverClose }: HorizontalMenuPopOverProps) => {
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!anchorEl) return
      const popoverElement = document.getElementById('invite-popover')

      if (popoverElement && !popoverElement.contains(e.target as Node) && !anchorEl.contains(e.target as Node)) {
        handlePopoverClose()
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [open, anchorEl, handlePopoverClose])

  return (
    <Popover
      id='invite-popover'
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      disableRestoreFocus
      sx={{ marginTop: '5px' }}
    >
      <Box className='flex flex-col gap-2 min-w-[145px] mt-[4px]' onMouseLeave={handlePopoverClose}>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={handlePopoverClose} 
            className={`hover:bg-[#35C0ED] hover:text-white p-2 ${pathname === link.href ? 'bg-[#35C0ED] text-white' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </Box>
    </Popover>
  )
}

export default HorizontalMenuPopOver
