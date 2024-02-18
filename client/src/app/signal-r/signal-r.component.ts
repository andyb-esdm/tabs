import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SignalRService } from '../signal-r.service';
import { Subscription } from 'rxjs';
import { IMessage } from '../message.model';

@Component({
  selector: 'app-signal-r',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signal-r.component.html',
  styleUrl: './signal-r.component.css'
})
export class SignalRComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  messageToSend = '';
  messages: IMessage[] = [];

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.subscription.add(this.subscribeToSignalRService());
  }

  private subscribeToSignalRService(): Subscription {
    return this.signalRService.data$.subscribe(
      data => {
        const message: IMessage = {
          type: 'Received',
          message: data
        }
        this.messages.push(message);
      }
    )
  }

  sendMessage(): void {
    const sentMessage: IMessage = {
      type: 'Sent',
      message: this.messageToSend
    }
    this.messages.push(sentMessage);
    this.signalRService.sendMessage(this.messageToSend);
    this.messageToSend = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
