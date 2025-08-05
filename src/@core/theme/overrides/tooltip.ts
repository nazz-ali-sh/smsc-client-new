import type { Theme } from '@mui/material/styles'

const tooltip: Theme['components'] = {
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        fontSize: theme.typography.subtitle1.fontSize,
        padding: '15px 12px',
        lineHeight: '25px',
        color: '#000000', // black text
        backgroundColor: '#fff', // white background
        borderRadius: 'var(--mui-shape-customBorderRadius-md)',
        paddingInline: theme.spacing(3),
        margin: 0,
        border: '1px solid #E0E0E0', // optional border for clarity
        boxShadow: theme.shadows[1], // optional shadow for better visibility
        maxWidth: 300, // optional max width to control tooltip size
        fontWeight: 400, // fontWeight should be a number, not '400px'
        fontFamily: 'Calibri, sans-serif' // explicitly Calibri font
      }),
      popper: {
        '&[data-popper-placement*="bottom"] .MuiTooltip-tooltip': {
          marginBlockStart: '6px !important'
        },
        '&[data-popper-placement*="top"] .MuiTooltip-tooltip': {
          marginBlockEnd: '6px !important'
        },
        '&[data-popper-placement*="left"] .MuiTooltip-tooltip': {
          marginInlineEnd: '6px !important'
        },
        '&[data-popper-placement*="right"] .MuiTooltip-tooltip': {
          marginInlineStart: '6px !important'
        }
      },
      arrow: {
        color: '#fff', // white arrow background
        border: '1px solid black' // optional border for arrow
      }
    }
  }
}

export default tooltip
