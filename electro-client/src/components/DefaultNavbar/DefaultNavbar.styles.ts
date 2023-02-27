import { createStyles } from '@mantine/core';

const useDefaultNavbarStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
      minWidth: 24,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],

        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
        },
      },
    },

    linkDisabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },

    childLinkActive: {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.15)
          : theme.fn.rgba(theme.colors[theme.primaryColor][0], 0.5),
      color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
      },
    },

    childLinkDot: {
      width: 6.5,
      height: 6.5,
      backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
      borderRadius: '50%',
    },
  };
});

export default useDefaultNavbarStyles;
