import {
  Badge,
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Popover,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import React, { useState } from 'react';
import { ElectroLogo } from 'components/index';
import { Bell, FileBarcode, List, Search, ShoppingCart, User } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import CategoryMenu from 'components/ClientHeader/CategoryMenu';
import { useElementSize } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  header: {
    boxShadow: 'rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 10px 15px -5px, rgb(0 0 0 / 4%) 0px 7px 7px -5px',
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    marginBottom: theme.spacing.md * 2,
  },

  iconGroup: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.md,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    },

    '&:active': {
      color: theme.white,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[6],
    },

  },
}));

function ClientHeader() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const [openedCategoryMenu, setOpenedCategoryMenu] = useState(false);

  const { ref: refHeaderStack, width: widthHeaderStack } = useElementSize();

  return (
    <header className={classes.header}>
      <Container size="xl">
        <Stack spacing={0} ref={refHeaderStack}>
          <Group position="apart" py={theme.spacing.md}>
            <Center component={Link} to="/">
              <ElectroLogo/>
            </Center>
            <TextInput
              placeholder="Bạn tìm gì..."
              variant="filled"
              size="md"
              radius="md"
              icon={<Search size={16}/>}
              sx={{ width: 500 }}
            />
            <Group spacing="xs">
              <Tooltip
                label="Giỏ hàng"
                position="bottom"
              >
                <UnstyledButton component={Link} to="/cart">
                  <Group spacing="xs" px={theme.spacing.sm} py={theme.spacing.xs} className={classes.iconGroup}>
                    <ShoppingCart strokeWidth={1}/>
                    <Text weight={500} size="sm">2</Text>
                  </Group>
                </UnstyledButton>
              </Tooltip>
              <Tooltip
                label="Đơn hàng"
                position="bottom"
              >
                <UnstyledButton component={Link} to="/order">
                  <Group spacing="xs" px={theme.spacing.sm} py={theme.spacing.xs} className={classes.iconGroup}>
                    <FileBarcode strokeWidth={1}/>
                    <Text weight={500} size="sm">5</Text>
                  </Group>
                </UnstyledButton>
              </Tooltip>
              <Tooltip
                label="Thông báo"
                position="bottom"
              >
                <UnstyledButton component={Link} to="/user/notification">
                  <Group spacing="xs" px={theme.spacing.sm} py={theme.spacing.xs} className={classes.iconGroup}>
                    <Bell strokeWidth={1}/>
                  </Group>
                </UnstyledButton>
              </Tooltip>
              <Tooltip
                label="Tài khoản"
                position="bottom"
              >
                <UnstyledButton component={Link} to="/user">
                  <Group spacing="xs" px={theme.spacing.sm} py={theme.spacing.xs} className={classes.iconGroup}>
                    <User strokeWidth={1}/>
                  </Group>
                </UnstyledButton>
              </Tooltip>
            </Group>
          </Group>
          <Group position="apart" mb="md">
            <Group spacing={theme.spacing.xs / 2}>
              <Popover
                opened={openedCategoryMenu}
                onClose={() => setOpenedCategoryMenu(false)}
                target={(
                  <Button onClick={() => setOpenedCategoryMenu((o) => !o)} leftIcon={<List size={16}/>} radius="md">
                    Danh mục sản phẩm
                  </Button>
                )}
                width={widthHeaderStack}
                position="bottom"
                placement="start"
                radius="md"
                shadow="md"
              >
                <CategoryMenu/>
              </Popover>
              <Button variant="subtle" radius="md">
                Sản phẩm mới
              </Button>
              <Button variant="subtle" color="green" radius="md">
                Sản phẩm xu hướng
              </Button>
              <Button variant="subtle" color="pink" radius="md">
                Khuyến mại
              </Button>
            </Group>
            <Group spacing="xs">
              <Badge color="pink" size="xs" variant="filled">Hot</Badge>
              <Text size="sm" color="dimmed">Miễn phí giao hàng cho đơn hàng trên 1 triệu đồng</Text>
            </Group>
          </Group>
        </Stack>
      </Container>
    </header>
  );
}

export default ClientHeader;
