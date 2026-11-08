import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BffApiService } from '../../../core/services/bff-api.service';
import { AttendanceStatusEnum } from '../../../shared/enums/attendance-status.enum';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="attendance">
      <h2>Registrar asistencia</h2>
      <div class="form-group"><label>Booking ID</label><input [(ngModel)]="bookingId" name="bookingId" /></div>
      <div class="form-group"><label>Student ID</label><input [(ngModel)]="studentId" name="studentId" /></div>
      <div class="form-group">
        <label>Estado</label>
        <select [(ngModel)]="status" name="status">
          @for (s of statuses; track s) { <option [value]="s">{{ s }}</option> }
        </select>
      </div>
      @if (msg()) { <p [class]="success() ? 'success-msg' : 'error-msg'">{{ msg() }}</p> }
      <button (click)="submit()" [disabled]="loading()" class="btn-primary">Registrar</button>
    </div>
  `,
})
export class AttendanceComponent {
  private readonly api = inject(BffApiService);

  protected bookingId = '';
  protected studentId = '';
  protected status = AttendanceStatusEnum.ATTENDED;
  protected readonly statuses = Object.values(AttendanceStatusEnum);
  protected readonly loading = signal(false);
  protected readonly msg = signal('');
  protected readonly success = signal(false);

  protected submit(): void {
    this.loading.set(true);
    this.api.updateAttendance(this.bookingId, this.studentId, this.status).subscribe({
      next: () => { this.msg.set('Asistencia registrada ✅'); this.success.set(true); this.loading.set(false); },
      error: () => { this.msg.set('Error al registrar asistencia.'); this.success.set(false); this.loading.set(false); },
    });
  }
}
