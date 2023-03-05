import { extendTheme } from '@chakra-ui/react'

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
}

export const defaultTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        margin: 0,
        padding: 0,
        bg: '#DCE4E3',
        fontFamily: "'Poppins', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        boxSizing: 'border-box',
      },
    }),
  },
  colors: {
    yellow: {
      base: '#FBA94C',
    },

    red: {
      '100': '#AB222E',
      '300': '#FC8181',
      '500': '#E53E3E',
    },

    gray: {
      '50': '#AAAAAA',
      '100': '#DCE4E3',
      '200': '#A0A1A3',
    },

    green: {
      '300': '#8ED7C6',
      '500': '#27A853',
      '600': '#18C29C',
      '700': '#217463',
      '800': '#3DA68E',
      '900': '#084236',
    },

    white: {
      '100': '#FFFFFF',
      '200': '#EEF0F0',
      '300': '#E7E7E7',
    },
  },
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: '#DCE4E3',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
    Button: {
      variants: {
        sidebarButton: {
          width: '100%',
          padding: '1rem',
          borderRadius: '12px',

          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          gap: '0.75rem',

          background: 'transparent',
          color: '#084236',
          font: '400 1rem "Poppins", sans-serif',
          cursor: 'pointer',

          '&:hover': {
            background: '#8ED7C6',
            width: '100%',
          },
        },
        menuButton: {
          background: 'transparent',
          cursor: 'pointer',
        },
      },
    },

    Text: {
      variants: {
        cardLabel: {
          fontSize: '0.875rem',
          fontWeight: '400',
          Color: '#A0A1A3',
          lineHeight: 1,

          strong: {
            color: '#18C29C',
          },
        },
        cardNumber: {
          fontSize: '1.75rem',
          fontWeight: '700',
          Color: '#000000',
          lineHeight: 1,
        },
      },
    },
  },
})
