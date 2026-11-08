import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { RoleEnum } from '../../../shared/enums/role.enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected email = '';
  protected role = RoleEnum.ALUMNO;
  protected readonly RoleEnum = RoleEnum;
  protected readonly roles = Object.values(RoleEnum);
  protected readonly loading = signal(false);
  protected readonly error = signal('');

  // Simulated login: in production this calls the auth endpoint
  protected submit(): void {
    if (!this.email) { this.error.set('El email es requerido'); return; }
    this.loading.set(true);
    this.error.set('');
    // Simulate session (replace with real auth call in production)
    this.auth.login({ userId: crypto.randomUUID(), email: this.email, role: this.role });
    this.loading.set(false);
    this.navigateByRole();
  }

  private navigateByRole(): void {
    const r = this.auth.role();
    if (r === RoleEnum.SUPERADMIN) this.router.navigate(['/superadmin']);
    else if (r === RoleEnum.ADMIN) this.router.navigate(['/admin']);
    else this.router.navigate(['/bookings']);
  }
}
