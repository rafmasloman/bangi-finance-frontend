import { createTheme, mergeThemeOverrides } from '@mantine/core';

const primaryTheme = createTheme({
  fontFamily: 'Urbanist, sans-serif',
  components: {
    Input: {
      classNames: {
        input: `bg-gray-100 py-3`,
      },
    },
    InputBase: {
      defaultProps: {
        radius: 'md',
      },
      classNames: {
        label: `text-base`,
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
      classNames: {
        label: `text-base`,
      },
    },
    DateInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    InputWrapper: {
      classNames: {
        label: `mb-2`,
      },
    },
  },
});

// const secondaryTheme = createTheme({
//   fontFamily: 'Nunito Sans',
// });

export const theme = mergeThemeOverrides(primaryTheme);
