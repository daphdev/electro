import { createStyles } from '@mantine/core';

export const useFilterPanelStyles = createStyles((theme) => ({
  titleFilterPanel: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
  },
}));
