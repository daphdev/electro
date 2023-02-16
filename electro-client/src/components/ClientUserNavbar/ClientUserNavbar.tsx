import { Button, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { Alarm, Award, Bell, Heart, Icon, MessageCircle, Settings, Star, User } from 'tabler-icons-react';

function ClientUserNavbar() {
  const location = useLocation();

  const navButton = (name: string, path: string, Icon: Icon, childPath?: string[]) => (
    <Button
      component={Link}
      to={path}
      size="md"
      radius="md"
      leftIcon={<Icon size={18} strokeWidth={1.5}/>}
      variant={(location.pathname === path || childPath?.includes(location.pathname)) ? 'light' : 'subtle'}
      styles={{ root: { width: '100%', padding: '0 12px' }, inner: { justifyContent: 'start' } }}
    >
      {name}
    </Button>
  );

  return (
    <Stack spacing={5}>
      {navButton('Tài khoản', '/user', User)}
      {navButton('Thiết đặt', '/user/setting', Settings,
        ['/user/setting/personal', '/user/setting/phone', '/user/setting/email', '/user/setting/password'])}
      {navButton('Thông báo', '/user/notification', Bell)}
      {navButton('Đánh giá sản phẩm', '/user/review', Star)}
      {navButton('Sản phẩm yêu thích', '/user/wishlist', Heart)}
      {navButton('Điểm thưởng', '/user/reward', Award)}
      {navButton('Đặt trước sản phẩm', '/user/preorder', Alarm)}
      {navButton('Chat hỏi đáp', '/user/chat', MessageCircle)}
    </Stack>
  );
}

export default ClientUserNavbar;
