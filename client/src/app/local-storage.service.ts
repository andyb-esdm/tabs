import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private helpTextSubject = new Subject<string | null>();
  helpText$ = this.helpTextSubject.asObservable();

  constructor(private ngZone: NgZone) {
    window.onstorage = (event: StorageEvent) => this.ngZone.run(() => {
      if (event.key === 'helpText') {
        console.log('old value', event.oldValue, 'new value', event.newValue);
        this.helpTextSubject.next(event.newValue);
      }
    });
    // window.addEventListener('storage', (event) => console.log(event));
  }

  save(helpText: string | null) {
    if (helpText) {
      localStorage.setItem('helpText', helpText);
    } else {
      localStorage.removeItem('helpText');
    }
  }

  getHelpText(): string | null {
    return localStorage.getItem('helpText');
  }
}
