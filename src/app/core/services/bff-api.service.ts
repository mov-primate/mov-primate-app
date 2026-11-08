import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BookingModel, BookingHistoryModel } from '../../shared/models/booking.model';
import { SlotModel } from '../../shared/models/slot.model';
import { UserModel } from '../../shared/models/user.model';
import { RoleEnum } from '../../shared/enums/role.enum';
import { AttendanceStatusEnum } from '../../shared/enums/attendance-status.enum';

@Injectable({ providedIn: 'root' })
export class BffApiService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.bffUrl;

  // --- Slots ---
  getSlots(date: string, professorId: string): Observable<SlotModel[]> {
    return this.http.get<SlotModel[]>(`${this.base}/bff/slots`, { params: { date, professorId } });
  }

  // --- Bookings ---
  createBooking(professorId: string, slotStart: string, slotEnd: string): Observable<BookingModel> {
    return this.http.post<BookingModel>(`${this.base}/bff/bookings`, { professorId, slotStart, slotEnd });
  }

  getBookingHistory(cursor?: string): Observable<BookingHistoryModel> {
    const params: Record<string, string> = {};
    if (cursor) params['cursor'] = cursor;
    return this.http.get<BookingHistoryModel>(`${this.base}/bff/bookings/history`, { params });
  }

  cancelBooking(bookingId: string): Observable<BookingModel> {
    return this.http.put<BookingModel>(`${this.base}/bff/bookings/${bookingId}/cancel`, {});
  }

  // --- Admin ---
  getPendingBookings(): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(`${this.base}/bff/admin/bookings/pending`);
  }

  approveBooking(bookingId: string): Observable<BookingModel> {
    return this.http.put<BookingModel>(`${this.base}/bff/admin/bookings/${bookingId}/approve`, {});
  }

  rejectBooking(bookingId: string, reason?: string): Observable<BookingModel> {
    return this.http.put<BookingModel>(`${this.base}/bff/admin/bookings/${bookingId}/reject`, { reason });
  }

  updateAttendance(bookingId: string, studentId: string, status: AttendanceStatusEnum): Observable<any> {
    return this.http.put(`${this.base}/bff/admin/bookings/${bookingId}/attendance`, { studentId, status });
  }

  // --- Superadmin ---
  getDashboard(): Observable<{ users: UserModel[]; bookings: BookingModel[]; userCount: number; bookingCount: number }> {
    return this.http.get<any>(`${this.base}/bff/superadmin/dashboard`);
  }

  changeRole(userId: string, newRole: RoleEnum, reason?: string): Observable<any> {
    return this.http.put(`${this.base}/bff/superadmin/users/${userId}/role`, { newRole, reason });
  }

  deactivateUser(userId: string): Observable<any> {
    return this.http.put(`${this.base}/bff/superadmin/users/${userId}/deactivate`, {});
  }

  updateAvailableClasses(userId: string, availableClasses: number): Observable<any> {
    return this.http.put(`${this.base}/bff/superadmin/users/${userId}/available-classes`, { availableClasses });
  }

  getAttendedCount(studentId: string): Observable<{ studentId: string; attendedCount: number }> {
    return this.http.get<any>(`${this.base}/bff/superadmin/attendance/count`, { params: { studentId } });
  }

  // --- Profiles ---
  getMyProfile(): Observable<any> {
    return this.http.get(`${this.base}/bff/profiles/me`);
  }
}
