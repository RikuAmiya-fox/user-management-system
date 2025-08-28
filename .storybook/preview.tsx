import React from 'react'; // Reactを明示的にインポート
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/theme';
import Image from 'next/image';

Image.propTypes = {
  unoptimized: null,
};


const withThemeProvider: Decorator = (Story, context) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withThemeProvider],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;