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
  ORDER = 'ORDER'
}

export interface EventInitiationResponse {
  eventSourceUuid: string;
}
