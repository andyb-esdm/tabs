import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private helpTextSubject = new Subject<string | null>();
  helpText$ = this.helpTextSubject.asObservable();

  private colourSubject = new BehaviorSubject<string>(this.getColour());
  colour$ = this.colourSubject.asObservable();

  constructor(private ngZone: NgZone) {
    // window.addEventListener('storage', (event) => console.log(event));

    window.onstorage = (event: StorageEvent) => this.ngZone.run(() => {
      if (event.key === 'colour') {
        let colour = event.newValue;
        if (!colour) {
          colour = '#FFFFFF';
        }
        this.colourSubject.next(colour);
      } else if (event.key === 'helpText') {
        console.log('old value', event.oldValue, 'new value', event.newValue);
        this.helpTextSubject.next(event.newValue);
      }
    });
  }

  saveHelpText(helpText: string | null) {
    if (helpText) {
      localStorage.setItem('helpText', helpText);
    } else {
      localStorage.removeItem('helpText');
    }
  }

  getHelpText(): string | null {
    return localStorage.getItem('helpText');
  }

  saveColour(colour: string) {
    localStorage.setItem('colour', colour);
  }

  getColour(): string {
    let colour = localStorage.getItem('colour');
    if (!colour) {
      colour = '#FFFFFF';
    }
    return colour;
  }
}
