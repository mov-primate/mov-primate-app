import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { RoleEnum } from '../../enums/role.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected readonly auth = inject(AuthService);
  protected readonly RoleEnum = RoleEnum;

  protected readonly isAdmin = computed(() => this.auth.hasRole(RoleEnum.ADMIN, RoleEnum.SUPERADMIN));
  protected readonly isSuperadmin = computed(() => this.auth.hasRole(RoleEnum.SUPERADMIN));
  protected readonly isAlumno = computed(() => this.auth.hasRole(RoleEnum.ALUMNO));

  logout(): void {
    this.auth.logout();
  }
}
