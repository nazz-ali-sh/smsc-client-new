'use client'

import React, { useState } from 'react'

import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'

export interface DropdownAction {
  label: string
  onClick: () => void
  icon?: React.ReactNode
}

interface ActionsDropdownProps {
  actions: DropdownAction[]
  iconButtonProps?: React.ComponentProps<typeof IconButton>
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ actions, iconButtonProps }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleActionClick = (action: DropdownAction) => {
    handleClose()
    action.onClick()
  }

  return (
    <>
      <IconButton size='small' onClick={handleOpen} {...iconButtonProps}>
        <i className='ri-more-2-fill text-textSecondary' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ style: { minWidth: 140 } }}
      >
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={() => handleActionClick(action)}>
            {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
            <ListItemText primary={action.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ActionsDropdown
