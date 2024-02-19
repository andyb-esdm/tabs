import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPostMessage } from './post-message.model';

@Injectable({
  providedIn: 'root'
})
export class PostMessageService {
  private postMessageSubject = new Subject<IPostMessage>();
  readonly postMessage$ = this.postMessageSubject.asObservable();

  constructor() {
    window.addEventListener('message', (event: MessageEvent) => {
      console.log(event)
      if (event.origin !== 'http://localhost:4200') {
        console.warn('Message not received from allowed origin');
        return;
      } else {
        console.log(event.data);
        const postMessage: IPostMessage = {
          origin: event.origin,
          message: event.data
        };
        this.postMessageSubject.next(postMessage);
      }
    });
  }
}
