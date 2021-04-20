import { Component, ViewChild } from '@angular/core';
import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @ViewChild('dropdown', { static: false }) dropdown: DropdownComponent;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  public openMenu(): void {
    this.dropdown.onMenuOpen();
  }

  public openAccountSettings(): void {
    this.router.navigate(['admin', 'profile']);
    this.dropdown.closeMenu();
  }

  public logout(): void {
    this.authService.signOut();
  }
}
