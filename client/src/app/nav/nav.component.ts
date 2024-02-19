import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BroadcastService } from '../broadcast.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private broadcastService: BroadcastService, private router: Router) { }

  logout() {
    this.broadcastService.logout();
    this.router.navigate(['/login']);
  }
}
