'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { CommandDialog } from 'cmdk'

// Type Imports

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports

// Style Imports
import './styles.css'

// Data Imports

// Footer component for the search menu
const CommandFooter = () => {
  return (
    <div cmdk-footer=''>
      <div className='flex items-center gap-1'>
        <kbd>
          <i className='ri-arrow-up-line text-base' />
        </kbd>
        <kbd>
          <i className='ri-arrow-down-line text-base' />
        </kbd>
        <span>to navigate</span>
      </div>
      <div className='flex items-center gap-1'>
        <kbd>
          <i className='ri-corner-down-left-line text-base' />
        </kbd>
        <span>to open</span>
      </div>
      <div className='flex items-center gap-1'>
        <kbd>esc</kbd>
        <span>to close</span>
      </div>
    </div>
  )
}

const NavSearch = () => {
  // States
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  // Hooks
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)

    return () => document.removeEventListener('keydown', down)
  }, [])

  // Reset the search value when the menu is closed
  useEffect(() => {
    if (!open && searchValue !== '') {
      setSearchValue('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <>
      {isBreakpointReached || settings.layout === 'horizontal' ? (
        <IconButton className='text-textPrimary' onClick={() => setOpen(true)}>
          {/* <i className='ri-search-line' /> */}
        </IconButton>
      ) : (
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => setOpen(true)}>
          {/* <IconButton className='text-textPrimary' onClick={() => setOpen(true)}>
            <i className='ri-search-line' />
          </IconButton> */}
          {/* <div className='whitespace-nowrap select-none text-textDisabled'>Search ⌘K</div> */}
        </div>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        {/* <div className='flex items-center justify-between border-be pli-4 plb-3 gap-2'>
          <i className='ri-search-line' />
          <CommandInput value={searchValue} onValueChange={setSearchValue} />
          <span className='text-textDisabled'>[esc]</span>
          <i className='ri-close-line cursor-pointer' onClick={() => setOpen(false)} />
        </div> */}

        <CommandFooter />
      </CommandDialog>
    </>
  )
}

export default NavSearch
