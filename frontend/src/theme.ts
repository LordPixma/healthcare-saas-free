import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e8f2ff',
      100: '#c7d9ff',
      200: '#a3beff',
      300: '#7ea3ff',
      400: '#5a89ff',
      500: '#2c7be5',
      600: '#1c5fc4',
      700: '#13459b',
      800: '#0b2c72',
      900: '#03134a',
    },
    accent: {
      500: '#fca311',
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

export default theme;
