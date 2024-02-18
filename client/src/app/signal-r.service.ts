import { Injectable } from '@angular/core';

import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection | undefined;
  private apiBaseUrl = 'https://localhost:7283';

  private dataSubject = new Subject<string>();
  readonly data$ = this.dataSubject.asObservable();

  constructor() {
    this.init();
  }

  private init() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.apiBaseUrl}/testHub`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.start().catch((err) => console.error(err.toString()));

    this.hubConnection.on('Send', (data: string) => {
      this.dataSubject.next(data);
    });
  }

  sendMessage(data: string): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('Send', data);
    }
  }
}
