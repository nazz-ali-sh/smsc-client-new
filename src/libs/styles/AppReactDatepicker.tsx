'use client'

// MUI imports
import { styled } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

// Styled Components
const AppReactDatepicker = styled('div')(({ theme }: { theme: Theme }) => ({
  '& .react-datepicker': {
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.875rem',
    border: 'none',
    borderRadius: '8px',
    boxShadow: 'none',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '16px',
    '& .react-datepicker__month-container': {
      width: '100%',
      '& .react-datepicker__header': {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        border: 'none',
        padding: '0 0 16px 0',
        '& .react-datepicker__current-month': {
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: '1rem',
          marginBottom: '8px'
        },
        '& .react-datepicker__day-names': {
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          marginBottom: '8px'
        },
        '& .react-datepicker__day-name': {
          color: theme.palette.text.secondary,
          fontWeight: 500,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          padding: '4px',
          textAlign: 'center'
        }
      },
      '& .react-datepicker__month': {
        margin: 0,
        '& .react-datepicker__week': {
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          '& .react-datepicker__day': {
            margin: 0,
            padding: '8px',
            textAlign: 'center',
            color: theme.palette.text.primary,
            fontSize: '0.875rem',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            lineHeight: '16px',
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            },
            '&.react-datepicker__day--selected': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
              fontWeight: 600
            },
            '&.react-datepicker__day--keyboard-selected': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
              fontWeight: 600
            },
            '&.react-datepicker__day--disabled': {
              color: theme.palette.text.disabled
            },
            '&.react-datepicker__day--outside-month': {
              color: theme.palette.text.disabled
            }
          }
        }
      }
    },
    '& .react-datepicker__navigation': {
      '& .react-datepicker__navigation-icon': {
        '&::before': {
          borderColor: theme.palette.text.primary
        }
      },
      '& .react-datepicker__navigation-button': {
        backgroundColor: 'transparent',
        border: 'none',
        padding: '4px 8px',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: theme.palette.action.hover
        }
      }
    }
  }
}))

export default AppReactDatepicker
