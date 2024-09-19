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
    },
    DateInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    InputWrapper: {
      classNames: {
        label: `mb-1.5`,
      },
    },
    Modal: {
      classNames: {
        title: `font-semibold text-xl`,
        header: `border-t-[20px]  border-t-lime-200 `,
      },
    },
  },
});

// const secondaryTheme = createTheme({
//   fontFamily: 'Nunito Sans',
// });

export const theme = mergeThemeOverrides(primaryTheme);
