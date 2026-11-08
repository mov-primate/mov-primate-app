import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BffApiService } from '../../../core/services/bff-api.service';
import { RoleEnum } from '../../../shared/enums/role.enum';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './role-management.component.html',
})
export class RoleManagementComponent {
  private readonly api = inject(BffApiService);

  protected userId = '';
  protected availableClasses = 0;
  protected newRole = RoleEnum.ALUMNO;
  protected reason = '';
  protected readonly roles = Object.values(RoleEnum);
  protected readonly loading = signal(false);
  protected readonly msg = signal('');
  protected readonly success = signal(false);

  protected changeRole(): void {
    if (!this.userId) return;
    this.loading.set(true);
    this.api.changeRole(this.userId, this.newRole, this.reason).subscribe({
      next: () => { this.msg.set(`Rol cambiado a ${this.newRole} ✅`); this.success.set(true); this.loading.set(false); },
      error: () => { this.msg.set('Error al cambiar rol.'); this.success.set(false); this.loading.set(false); },
    });
  }

  protected updateClasses(): void {
    if (!this.userId) return;
    this.loading.set(true);
    this.api.updateAvailableClasses(this.userId, this.availableClasses).subscribe({
      next: () => { this.msg.set(`Clases disponibles actualizadas a ${this.availableClasses} ✅`); this.success.set(true); this.loading.set(false); },
      error: () => { this.msg.set('Error al actualizar clases.'); this.success.set(false); this.loading.set(false); },
    });
  }

  protected deactivate(): void {
    if (!this.userId || !confirm('¿Desactivar este usuario?')) return;
    this.loading.set(true);
    this.api.deactivateUser(this.userId).subscribe({
      next: () => { this.msg.set('Usuario desactivado ✅'); this.success.set(true); this.loading.set(false); },
      error: () => { this.msg.set('Error al desactivar.'); this.success.set(false); this.loading.set(false); },
    });
  }
}
