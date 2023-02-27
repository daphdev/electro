export interface NotificationResponse {
  id: number;
  createdAt: string;
  type: NotificationType;
  message: string;
  anchor: string | null;
  status: number;
}

export interface NotificationRequest {
  userId: number; // From authenticated user
  type: NotificationType;
  message: string;
  anchor: string | null;
  status: number;
}

export enum NotificationType {
  GENERAL = 'GENERAL',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  PREORDER = 'PREORDER',
  REVIEW = 'REVIEW',
  ORDER = 'ORDER',
  CHECKOUT_PAYPAL_SUCCESS = 'CHECKOUT_PAYPAL_SUCCESS',
  CHECKOUT_PAYPAL_CANCEL = 'CHECKOUT_PAYPAL_CANCEL'
}

export interface EventInitiationResponse {
  eventSourceUuid: string;
}
