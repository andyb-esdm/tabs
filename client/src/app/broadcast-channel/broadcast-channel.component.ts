import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { BroadcastService } from '../broadcast.service';
import { CommonModule } from '@angular/common';
import { RecordNavLinkComponent } from '../record-nav-link/record-nav-link.component';

@Component({
  selector: 'app-broadcast-channel',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, RecordNavLinkComponent],
  templateUrl: './broadcast-channel.component.html',
  styleUrl: './broadcast-channel.component.css'
})
export class BroadcastChannelComponent {
  recordList$ = this.broadcastService.getRecordList();
  constructor(private broadcastService: BroadcastService) { }
}
