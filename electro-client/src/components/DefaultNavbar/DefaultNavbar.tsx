import React, { useState } from 'react';
import { createStyles, Menu, Navbar } from '@mantine/core';
import {
  AddressBook,
  BellRinging, Box, Building, BuildingWarehouse,
  Car,
  CurrencyDollar,
  DatabaseImport, FileBarcode,
  Fingerprint,
  Home,
  Icon,
  Key,
  Settings,
  TwoFA,
  Users
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      [theme.fn.largerThan('sm')]: {
        height: 'calc(100vh - 56px)',
      }
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
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
  };
});

interface NavbarChildLink {
  link: string,
  label: string,
}

interface NavbarLink {
  link: string,
  label: string,
  icon: Icon,
  childLinks?: NavbarChildLink[]
}

const navbarLinks: NavbarLink[] = [
  {
    link: '',
    label: 'Trang chủ',
    icon: Home
  },
  {
    link: '/admin/address',
    label: 'Quản lý địa chỉ',
    icon: AddressBook,
    childLinks: [
      {
        link: '/admin/address',
        label: 'Quản lý địa chỉ',
      },
      {
        link: '/admin/address/province',
        label: 'Quản lý tỉnh thành',
      },
      {
        link: '/admin/address/district',
        label: 'Quản lý quận huyện',
      }
    ],
  },
  {
    link: '/admin/user',
    label: 'Quản lý người dùng',
    icon: Fingerprint,
    childLinks: [
      {
        link: '/admin/user',
        label: 'Quản lý người dùng',
      },
      {
        link: '/admin/user/role',
        label: 'Quản lý quyền',
      },
    ],
  },
  {
    link: '/admin/employee',
    label: 'Quản lý nhân viên',
    icon: Building,
    childLinks: [
      {
        link: '/admin/employee',
        label: 'Quản lý nhân viên',
      },
      {
        link: '/admin/employee/office',
        label: 'Quản lý văn phòng',
      },
      {
        link: '/admin/employee/department',
        label: 'Quản lý phòng ban',
      },
      {
        link: '/admin/employee/jobtype',
        label: 'Quản lý loại hình công việc',
      },
      {
        link: '/admin/employee/joblevel',
        label: 'Quản lý cấp bậc công việc',
      },
      {
        link: '/admin/employee/jobtitle',
        label: 'Quản lý chức danh công việc',
      },
    ],
  },
  {
    link: '/admin/customer',
    label: 'Quản lý khách hàng',
    icon: Users,
    childLinks: [
      {
        link: '/admin/customer',
        label: 'Quản lý khách hàng',
      },
      {
        link: '/admin/customer/group',
        label: 'Quản lý nhóm khách hàng',
      },
      {
        link: '/admin/customer/status',
        label: 'Quản lý trạng thái khách hàng',
      },
      {
        link: '/admin/customer/resource',
        label: 'Quản lý nguồn khách hàng',
      },
    ],
  },
  {
    link: '/admin/product',
    label: 'Quản lý sản phẩm',
    icon: Box,
    childLinks: [
      {
        link: '/admin/category',
        label: 'Quản lý danh mục',
      },
      {
        link: '/admin/product',
        label: 'Quản lý sản phẩm',
      },
      {
        link: '/admin/product/brand',
        label: 'Quản lý nhãn hiệu',
      },
      {
        link: '/admin/product/supplier',
        label: 'Quản lý nhà cung cấp',
      },
      {
        link: '/admin/product/unit',
        label: 'Quản lý đơn vị tính',
      },
      {
        link: '/admin/product/tag',
        label: 'Quản lý tag',
      },
      {
        link: '/admin/product/guarantee',
        label: 'Quản lý bảo hành',
      },
      {
        link: '/admin/product/property',
        label: 'Quản lý thuộc tính sản phẩm',
      },
    ],
  },
  {
    link: '/admin/inventory',
    label: 'Quản lý tồn kho',
    icon: BuildingWarehouse,
    childLinks: [
      {
        link: '/admin/inventory',
        label: 'Quản lý tồn kho',
      },
      {
        link: '/admin/inventory/warehouse',
        label: 'Quản lý nhà kho',
      },
      {
        link: '/admin/inventory/purchaseorder',
        label: 'Quản lý đơn mua hàng',
      },
      {
        link: '/admin/inventory/destination',
        label: 'Quản lý điểm nhập hàng',
      },
      {
        link: '/admin/inventory/docket',
        label: 'Quản lý phiếu nhập xuất kho',
      },
      {
        link: '/admin/inventory/reason',
        label: 'Quản lý lý do phiếu NXK',
      },
      {
        link: '/admin/inventory/count',
        label: 'Quản lý phiếu kiểm kho',
      },
      {
        link: '/admin/inventory/transfer',
        label: 'Quản lý phiếu chuyển kho',
      },
    ],
  },
  {
    link: '/admin/order',
    label: 'Quản lý đơn hàng',
    icon: FileBarcode,
    childLinks: [
      {
        link: '/admin/order',
        label: 'Quản lý đơn hàng',
      },
      {
        link: '/admin/order/resource',
        label: 'Quản lý nguồn đơn hàng',
      },
      {
        link: '/admin/order/cancellationreason',
        label: 'Quản lý lý do hủy đơn hàng',
      },
    ]
  },
  {
    link: '/admin/waybill',
    label: 'Quản lý vận đơn',
    icon: Car,
    childLinks: [
      {
        link: '/admin/waybill',
        label: 'Quản lý vận đơn',
      },
      {
        link: '/admin/waybill/shipper',
        label: 'Quản lý nhà vận chuyển',
      },
    ],
  },
  {
    link: '/admin/voucher',
    label: 'Quản lý sổ quỹ',
    icon: CurrencyDollar,
    childLinks: [
      {
        link: '/admin/voucher',
        label: 'Quản lý sổ quỹ',
      },
      {
        link: '/admin/paymentmethod',
        label: 'Quản lý hình thức thanh toán',
      },
    ],
  },
];

export function DefaultNavbar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Trang chủ');

  const navbarLinksFragment = navbarLinks.map(navbarLink => {
    const navbarLinkFragment = (
      <Link
        className={cx(classes.link, { [classes.linkActive]: navbarLink.label === active })}
        to={navbarLink.link}
        key={navbarLink.label}
        onClick={() => setActive(navbarLink.label)}
      >
        <navbarLink.icon className={classes.linkIcon}/>
        <span>{navbarLink.label}</span>
      </Link>
    );

    const navbarChildLinksFragment = navbarLink.childLinks?.map(childLink => (
      <Menu.Item key={childLink.label} component={Link} to={childLink.link}>
        {childLink.label}
      </Menu.Item>
    ));

    if (navbarChildLinksFragment) {
      return (
        <Menu
          key={navbarLink.label}
          trigger="hover"
          position="right"
          placement="center"
          withArrow
          sx={{ width: '100%' }}
          control={navbarLinkFragment}
          styles={{
            body: { width: 225 }
          }}
        >
          {navbarChildLinksFragment}
        </Menu>
      )
    }

    return navbarLinkFragment;
  });


  return (
    <Navbar height={'100%'} width={{ sm: 250 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        {navbarLinksFragment}
      </Navbar.Section>
    </Navbar>
  );
}
