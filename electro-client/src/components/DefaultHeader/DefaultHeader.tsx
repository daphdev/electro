import React from 'react';
import { ActionIcon, Autocomplete, Burger, createStyles, Group, Header, useMantineColorScheme } from '@mantine/core';
import { Bell, Browser, Icon, Messages, MoonStars, Search, Sun, User } from 'tabler-icons-react';
import { MantineLogo } from './MantineLogo';
import { Link } from 'react-router-dom';
import { useToggleNavbarStore } from '../../stores/ToggleNavbarStore';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
    width: 300
  },

  link: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    '&:active': {
      backgroundColor: theme.colors[theme.primaryColor][6],
      color: theme.white,
    }
  },
}));

interface HeaderLink {
  link: string;
  label: string;
  icon: Icon;
  target?: string;
}

const headerLinks: HeaderLink[] = [
  {
    link: '/admin/account',
    label: 'Tài khoản',
    icon: User,
  },
  {
    link: '/admin/notification',
    label: 'Thông báo',
    icon: Bell
  },
  {
    link: '/admin/message',
    label: 'Tin nhắn',
    icon: Messages
  },
  {
    link: '/',
    label: 'Website',
    icon: Browser,
    target: '_blank',
  },
];

export function DefaultHeader() {
  const { classes } = useStyles();

  const { opened, toggleOpened } = useToggleNavbarStore();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';

  const headerLinksFragment = headerLinks.map((headerLink) => (
    <Link
      key={headerLink.label}
      to={headerLink.link}
      target={headerLink.target}
      className={classes.link}
    >
      <headerLink.icon size={16} style={{ marginRight: 7.5 }}/>
      {headerLink.label}
    </Link>
  ));

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggleOpened} size="sm"/>
          <MantineLogo/>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {headerLinksFragment}
          </Group>
          <Autocomplete
            className={classes.search}
            icon={<Search size={16}/>}
            placeholder="Tìm kiếm"
            data={['Quản lý địa chỉ', 'Quản lý tỉnh thành', 'Quản lý quận huyện']}
          />
          <ActionIcon
            variant="outline"
            color={dark ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Thay đổi chế độ màu"
          >
            {dark ? <Sun size={18}/> : <MoonStars size={18}/>}
          </ActionIcon>
        </Group>
      </div>
    </Header>
  );
}
