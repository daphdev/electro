import { showNotification } from '@mantine/notifications';
import { Check, X } from 'tabler-icons-react';
import React from 'react';

export default class NotifyUtils {
  static error = (...params: any[]) => console.log(params);

  static simpleSuccess = (message: string) => {
    showNotification({
      title: 'Thông báo',
      message: message,
      autoClose: 5000,
      icon: <Check size={18}/>,
      color: 'teal',
    });
  };

  static simpleFailed = (message: string) => {
    showNotification({
      title: 'Thông báo',
      message: message,
      autoClose: 5000,
      icon: <X size={18}/>,
      color: 'red',
    });
  };
}
