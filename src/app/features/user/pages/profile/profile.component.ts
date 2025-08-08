import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { AuthService } from '../../../../Auth/Services/auth.service';

type UserProfile = {
  username?: string;
  email?: string;
  cedula?: string;
  // agrega otros campos si los tienes
};

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  user = signal<UserProfile | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  constructor() {
    this.loadData();
  }

  loadData(){
    this.loading.set(true);
    this.auth.getUserByUid(localStorage.getItem('uid')!)
    .then((res: any) => this.user.set(res))
    .catch((e) => this.error.set('No se pudo cargar el perfil'))
    .finally(() => this.loading.set(false));
  }

  get initials(): string {
    const u = this.user();
    const name = (u?.username || u?.email || 'U S').trim();
    return name.split(/\s+/).slice(0, 2).map(p => p[0]?.toUpperCase() ?? '').join('');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  goFavorites() {
    this.router.navigate(['/favorites']);
  }

  goEdit() {
    // navega a tu página/diálogo de edición si la tienes
    // this.router.navigate(['/profile/edit']);
  }
}
