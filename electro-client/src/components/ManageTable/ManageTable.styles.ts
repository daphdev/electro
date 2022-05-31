import { createStyles } from '@mantine/core';

export const useManageTableStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2) + '!important'
        : theme.colors[theme.primaryColor][0] + '!important',
  },
}));
