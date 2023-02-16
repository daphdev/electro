import React from 'react';
import { showNotification } from '@mantine/notifications';
import { Check, X } from 'tabler-icons-react';

class NotifyUtils {
  static simple = (message: React.ReactNode) => {
    showNotification({
      title: 'Thông báo',
      message: message,
      autoClose: 5000,
    });
  };

  static simpleSuccess = (message: React.ReactNode) => {
    showNotification({
      title: 'Thông báo',
      message: message,
      autoClose: 5000,
      icon: <Check size={18}/>,
      color: 'teal',
    });
  };

  static simpleFailed = (message: React.ReactNode) => {
    showNotification({
      title: 'Thông báo',
      message: message,
      autoClose: 5000,
      icon: <X size={18}/>,
      color: 'red',
    });
  };
}

export default NotifyUtils;
