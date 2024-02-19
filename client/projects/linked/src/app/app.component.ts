import { Component, OnDestroy } from '@angular/core';
import { PostMessageService } from './post-message.service';
import { Subscription } from 'rxjs';
import { IPostMessage } from './post-message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy {
  private subscription = new Subscription();
  messages: IPostMessage[] = [];

  constructor(private postMessageService: PostMessageService) {
    this.subscription.add(this.subscribeToPostMessage());
  }

  private subscribeToPostMessage(): Subscription {
    return this.postMessageService.postMessage$.subscribe(postMessage => {
      this.messages.push(postMessage);
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
