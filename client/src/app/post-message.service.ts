import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostMessageService {

  private window: Window | null = null;
  private origin: string | null = null;

  constructor() { }

  postMessage(message: string) {
    console.log(message)
    if (this.window && this.origin) {
      this.window.postMessage(message, this.origin);
    }
  }

  setTarget(window: Window | null, origin: string) {
    this.window = window;
    this.origin = origin;
  }
}
