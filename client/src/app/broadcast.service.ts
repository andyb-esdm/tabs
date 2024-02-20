import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { IRecordListItem } from './models/record-list-item.model';
import { IRecord } from './models/record.model';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService implements OnDestroy {
  private recordIdChannel = new BroadcastChannel('record-id');
  private recordIdSubject = new Subject<number>();
  readonly recordId$ = this.recordIdSubject.asObservable();

  private loggedInChannel = new BroadcastChannel('logged-in');
  private loggedInSubject = new BehaviorSubject<boolean>(true);
  readonly loggedIn$ = this.loggedInSubject.asObservable();

  private readonly records: IRecord[] = [
    { id: 1, name: 'buzzard', date: '26/04/2023', description: 'observed flying over the river at dusk', recordId: null },
    { id: 2, name: 'sparrowhawk', date: '15/01/2023', description: 'noticed gliding across the forest canopy', recordId: 4 },
    { id: 3, name: 'buzzard', date: '24/05/2023', description: 'observed flying over the river at dusk', recordId: 19 },
    { id: 4, name: 'buzzard', date: '07/07/2023', description: 'observed teaching its young to fly in the early morning', recordId: null },
    { id: 5, name: 'kestrel', date: '09/05/2023', description: 'spotted during a sudden, breathtaking display of aerial acrobatics', recordId: 14 },
    { id: 6, name: 'sparrowhawk', date: '15/10/2023', description: 'noticed gliding across the forest canopy', recordId: null },
    { id: 7, name: 'sparrowhawk', date: '15/11/2023', description: 'witnessed perched atop a tall tree, scanning the area', recordId: null },
    { id: 8, name: 'buzzard', date: '30/07/2023', description: 'observed flying over the river at dusk', recordId: null },
    { id: 9, name: 'red kite', date: '23/03/2023', description: 'seen nesting on a cliff face, well-hidden from predators', recordId: 14 },
    { id: 10, name: 'red kite', date: '06/11/2023', description: 'seen soaring high above the mountains', recordId: 2 },
    { id: 11, name: 'peregrine', date: '29/06/2023', description: 'observed flying over the river at dusk', recordId: null },
    { id: 12, name: 'red kite', date: '10/09/2023', description: 'detected making a sharp turn in mid-air chasing an insect', recordId: 10 },
    { id: 13, name: 'sparrowhawk', date: '20/07/2023', description: 'spotted during a sudden, breathtaking display of aerial acrobatics', recordId: 16 },
    { id: 14, name: 'sparrowhawk', date: '03/08/2023', description: 'detected making a sharp turn in mid-air chasing an insect', recordId: 6 },
    { id: 15, name: 'sparrowhawk', date: '15/11/2023', description: 'detected making a sharp turn in mid-air chasing an insect', recordId: null },
    { id: 16, name: 'kestrel', date: '22/08/2023', description: 'observed flying over the river at dusk', recordId: null },
    { id: 17, name: 'kestrel', date: '07/05/2023', description: 'observed flying over the river at dusk', recordId: 6 },
    { id: 18, name: 'kestrel', date: '26/06/2023', description: 'spotted hovering over a field looking for prey', recordId: 10 },
    { id: 19, name: 'red kite', date: '11/12/2023', description: 'spotted hovering over a field looking for prey', recordId: null },
    { id: 20, name: 'buzzard', date: '06/08/2023', description: 'detected making a sharp turn in mid-air chasing an insect', recordId: null }
  ]

  constructor(private zone: NgZone) {
    this.recordIdChannel.onmessage = (event) => this.zone.run(() => this.recordIdSubject.next(Number(event.data)));
    this.loggedInChannel.onmessage = (event) => this.zone.run(() => {
      console.log(event)
      this.loggedInSubject.next(Boolean(event.data))
    });
  }

  getRecordList(): Observable<IRecordListItem[]> {
    const recordList = this.records.map(record => ({
      id: record.id,
      date: record.date,
      name: record.name
    }));
    return of(recordList);
  }

  getRecord(id: number): Observable<IRecord | undefined> {
    this.recordIdChannel.postMessage(id);
    const foundRecord = this.records.find(record => record.id === id);
    if (foundRecord) {
      foundRecord.hasLinks = this.records.some(record => record.recordId === foundRecord.id);
    }
    return of(foundRecord);
  }

  getLinkedRecords(id: number): Observable<IRecord[]> {
    return of(this.records.filter(record => record.recordId === id));
  }

  logout(): void {
    this.loggedInChannel.postMessage(false);
    // this.loggedInSubject.next(false);
  }

  ngOnDestroy(): void {
    this.recordIdChannel.close();
    this.loggedInChannel.close();
  }
}
