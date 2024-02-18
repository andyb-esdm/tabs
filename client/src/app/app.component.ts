import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherForecastService } from './weather-forecast.service';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weatherForecast$ = this.weatherForecastService.getForecast();
  private hubConnection: HubConnection | undefined;
  private apiBaseUrl = 'https://localhost:7283';
  message = '';
  messages: string[] = [];

  constructor(private weatherForecastService: WeatherForecastService) {
    this.init();
  }

  private init() {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.apiBaseUrl}/testHub`)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.start().catch((err) => console.error(err.toString()));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.hubConnection.on('Send', (data: any) => {
      const received = `Received: ${data}`;
      this.messages.push(received);
    });
  }

  sendMessage(): void {
    if (this.hubConnection) {
      this.hubConnection.invoke('Send', this.message);
    }
    this.messages.push(`Sent: ${this.message}`);
    this.message = '';
  }
}
