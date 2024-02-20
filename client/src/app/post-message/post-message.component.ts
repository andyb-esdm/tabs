import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostMessageService } from '../post-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-message',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './post-message.component.html',
  styleUrl: './post-message.component.css'
})
export class PostMessageComponent {
  constructor(private postMessageService: PostMessageService) { }
  windowOpen = false;
  message = '';

  postMessage() {
    this.postMessageService.postMessage(this.message);
    this.message = '';
  }

  openWindow() {
    this.windowOpen = true;
    const origin = 'http://localhost:4201';
    // const origin = 'https://cmsi-ne-dev.esdm.co.uk';
    const targetWindow = window.open(origin);
    this.postMessageService.setTarget(targetWindow, origin);
  }
}
