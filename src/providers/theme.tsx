import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#855DCD',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1AB4A3',
      contrastText: '#6F6C90',
    },
    text: {
      primary: '#170F49',
      secondary: '#2D3648',
    },
  },
  typography: {
    allVariants: {
      textTransform: 'none',
      fontSize: 16,
    },
    fontFamily: 'Helvetica Neue',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          '@media (min-width:600px)': {
            fontSize: '16px',
          },
        },
      },
    },
  },
});
