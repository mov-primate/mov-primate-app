import { BookingStatusEnum } from '../enums/booking-status.enum';

export interface BookingModel {
  id: string;
  studentId: string;
  professorId: string;
  slotStart: string;
  slotEnd: string;
  status: BookingStatusEnum;
}

export interface BookingHistoryModel {
  count: number;
  bookings: BookingModel[];
  nextCursor?: string;
}
