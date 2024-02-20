import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SignalRComponent } from "./signal-r/signal-r.component";
import { NavComponent } from './nav/nav.component';
import { BroadcastService } from './broadcast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, SignalRComponent, NavComponent]
})
export class AppComponent {
  constructor(private broadcastService: BroadcastService, private router: Router) {
    this.broadcastService.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/login']);
      }
    });
  }
}
