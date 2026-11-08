import { Component, input } from '@angular/core';
import { BookingStatusEnum } from '../../enums/booking-status.enum';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `<span class="badge" [class]="'badge--' + status()">{{ label() }}</span>`,
  styles: [`
    .badge { padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge--pendiente { background: #fff3cd; color: #856404; }
    .badge--confirmado { background: #d1e7dd; color: #0f5132; }
    .badge--rechazado { background: #f8d7da; color: #842029; }
    .badge--cancelado { background: #e2e3e5; color: #41464b; }
  `],
})
export class StatusBadgeComponent {
  readonly status = input.required<BookingStatusEnum>();
  protected readonly labels: Record<BookingStatusEnum, string> = {
    [BookingStatusEnum.PENDIENTE]: 'Pendiente',
    [BookingStatusEnum.CONFIRMADO]: 'Confirmada',
    [BookingStatusEnum.RECHAZADO]: 'Rechazada',
    [BookingStatusEnum.CANCELADO]: 'Cancelada',
  };
  protected readonly label = () => this.labels[this.status()];
}
