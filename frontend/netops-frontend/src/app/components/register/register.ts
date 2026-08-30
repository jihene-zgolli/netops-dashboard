import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  role = 'technicien';
  team = '';
  error = '';
  success = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register({ username: this.username, password: this.password, role: this.role, team: this.team }).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.error || 'Erreur lors de l\'inscription';
      }
    });
  }
}