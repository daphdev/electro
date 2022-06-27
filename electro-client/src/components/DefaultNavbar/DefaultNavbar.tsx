import React, { useState } from 'react';
import { Center, Navbar, ScrollArea, Stack, useMantineTheme } from '@mantine/core';
import {
  AddressBook,
  Box,
  Building,
  BuildingWarehouse,
  Car,
  CurrencyDollar,
  FileBarcode,
  Fingerprint,
  Home,
  Icon,
  Users
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import useAppStore from 'stores/use-app-store';
import useDefaultNavbarStyles from 'components/DefaultNavbar/DefaultNavbar.styles';

interface NavbarLink {
  link: string;
  label: string;
  icon: Icon;
  childLinks?: NavbarChildLink[];
}

interface NavbarChildLink {
  link: string;
  label: string;
}

const navbarLinks: NavbarLink[] = [
  {
    link: '/admin',
    label: 'Trang chủ',
    icon: Home,
  },
  {
    link: '/admin/address',
    label: 'Địa chỉ',
    icon: AddressBook,
    childLinks: [
      {
        link: '/admin/address/province',
        label: 'Tỉnh thành',
      },
      {
        link: '/admin/address/district',
        label: 'Quận huyện',
      },
    ],
  },
  {
    link: '/admin/user',
    label: 'Người dùng',
    icon: Fingerprint,
    childLinks: [
      {
        link: '/admin/user/role',
        label: 'Quyền',
      },
    ],
  },
  {
    link: '/admin/employee',
    label: 'Nhân viên',
    icon: Building,
    childLinks: [
      {
        link: '/admin/employee/office',
        label: 'Văn phòng',
      },
      {
        link: '/admin/employee/department',
        label: 'Phòng ban',
      },
      {
        link: '/admin/employee/job-type',
        label: 'Loại hình công việc',
      },
      {
        link: '/admin/employee/job-level',
        label: 'Cấp bậc công việc',
      },
      {
        link: '/admin/employee/job-title',
        label: 'Chức danh công việc',
      },
    ],
  },
  {
    link: '/admin/customer',
    label: 'Khách hàng',
    icon: Users,
    childLinks: [
      {
        link: '/admin/customer/group',
        label: 'Nhóm khách hàng',
      },
      {
        link: '/admin/customer/status',
        label: 'Trạng thái khách hàng',
      },
      {
        link: '/admin/customer/resource',
        label: 'Nguồn khách hàng',
      },
    ],
  },
  {
    link: '/admin/product',
    label: 'Sản phẩm',
    icon: Box,
    childLinks: [
      {
        link: '/admin/category',
        label: 'Quản lý danh mục sản phẩm',
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
    label: 'Tồn kho',
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
        link: '/admin/inventory/purchase-order',
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
        link: '/admin/inventory/docket-reason',
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
    label: 'Đơn hàng',
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
        link: '/admin/order/cancellation-reason',
        label: 'Quản lý lý do hủy đơn hàng',
      },
    ],
  },
  {
    link: '/admin/waybill',
    label: 'Vận đơn',
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
    label: 'Sổ quỹ',
    icon: CurrencyDollar,
    childLinks: [
      {
        link: '/admin/voucher',
        label: 'Quản lý sổ quỹ',
      },
      {
        link: '/admin/payment-method',
        label: 'Quản lý hình thức thanh toán',
      },
    ],
  },
];

export function DefaultNavbar() {
  const theme = useMantineTheme();
  const { opened } = useAppStore();
  const { classes, cx } = useDefaultNavbarStyles();
  const [active, setActive] = useState('Trang chủ');

  const navbarLinksFragment = navbarLinks.map(navbarLink => (
    <Stack
      key={navbarLink.label}
      spacing={0}
      sx={{ borderRadius: theme.radius.sm, overflow: 'hidden' }}
    >
      <Link
        to={navbarLink.link}
        className={cx(classes.link, { [classes.linkActive]: navbarLink.label === active })}
        onClick={() => setActive(navbarLink.label)}
      >
        <navbarLink.icon className={classes.linkIcon}/>
        <span>{navbarLink.label}</span>
      </Link>
      {navbarLink.label === active && (navbarLink.childLinks || []).map(childLink => (
        <Link
          key={childLink.label}
          to={childLink.link}
          className={cx(classes.link, { [classes.childLinkActive]: navbarLink.label === active })}
        >
          <Center sx={{ width: 24, marginRight: theme.spacing.sm }}>
            <div className={classes.childLinkDot}/>
          </Center>
          <span>{childLink.label}</span>
        </Link>
      ))}
    </Stack>
  ));

  return (
    <Navbar
      p="md"
      width={{ md: 250 }}
      hidden={!opened}
    >
      <Navbar.Section grow component={ScrollArea}>
        {navbarLinksFragment}
      </Navbar.Section>
    </Navbar>
  );
}
