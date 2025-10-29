import { useTheme } from '@mui/material/styles'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

import HorizontalNav, { Menu } from '@menu/horizontal-menu'
import { MenuItem } from '@menu/vertical-menu'
import VerticalNavContent from './VerticalNavContent'

import useVerticalNav from '@menu/hooks/useVerticalNav'

import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'

type RenderExpandIconProps = {
  level?: number
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='ri-arrow-right-s-line' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const HorizontalMenu = () => {
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()

  const { transitionDuration } = verticalNavOptions

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor: 'var(--mui-palette-background-default)'
      }}
    >
      <Menu
        rootStyles={menuRootStyles(theme)}
        renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuItemStyles={menuItemStyles(theme, 'ri-circle-fill')}
        popoutMenuOffset={{
          mainAxis: ({ level }) => (level && level > 0 ? 4 : 14),
          alignmentAxis: 0
        }}
        verticalMenuProps={{
          menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
          renderExpandIcon: ({ open }) => (
            <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
          ),
          renderExpandedMenuItemIcon: { icon: <i className='ri-circle-fill' /> }
        }}
      >
        <MenuItem href='/dashboard' icon={<i className='ri-home-smile-line' />}>
          Dashboard
        </MenuItem>
        <MenuItem href='/tender-information' icon={<i className='ri-mail-open-line' />}>
          Tender Information
        </MenuItem>
        <MenuItem href='/tender-result' icon={<i className='ri-database-line' />}>
          Tender Results
        </MenuItem>
        <MenuItem href='/shortlist-agent' icon={<i className='ri-pantone-line' />}>
          Shortlisted Agents
        </MenuItem>
        <MenuItem href='/calendar' icon={<i className='ri-file-list-2-line' />}>
          Invites
        </MenuItem>
        <MenuItem href='/chats' icon={<i className='ri-pages-line' />}>
          Chats
        </MenuItem>
        <MenuItem href='/final-selection' icon={<i className='ri-bar-chart-2-line' />}>
          Final Selection
        </MenuItem>
        <MenuItem href='/insurance' icon={<i className='ri-bar-chart-2-line' />}>
          Insurance
        </MenuItem>
      </Menu>
    </HorizontalNav>
  )
}

export default HorizontalMenu
