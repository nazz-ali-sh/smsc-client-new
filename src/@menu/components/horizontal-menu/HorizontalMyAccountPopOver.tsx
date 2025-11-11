'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Popover, Box } from '@mui/material'

import { myAccountLinks } from '@/constants'

interface HorizontalMyAccountPopOverProps {
  open: boolean
  anchorEl: HTMLElement | null
  handlePopoverClose: () => void
}

const HorizontalMyAccountPopOver = ({ open, anchorEl, handlePopoverClose }: HorizontalMyAccountPopOverProps) => {
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return

    let timeoutId: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      if (!anchorEl) return
      const popoverElement = document.getElementById('my-account-popover')

      if (timeoutId) clearTimeout(timeoutId)

      if (anchorEl.contains(e.target as Node) || (popoverElement && popoverElement.contains(e.target as Node))) {
        return
      }

      timeoutId = setTimeout(() => {
        handlePopoverClose()
      }, 150)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [open, anchorEl, handlePopoverClose])

  return (
    <Popover
      id='my-account-popover'
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
      <Box className='flex flex-col gap-2 min-w-[160px] mt-[4px]'>
        {myAccountLinks.map(link => (
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

export default HorizontalMyAccountPopOver
