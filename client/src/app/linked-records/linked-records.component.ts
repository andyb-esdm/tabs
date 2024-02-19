import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { IRecord } from '../models/record.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadcastService } from '../broadcast.service';
import { RecordNavLinkComponent } from '../record-nav-link/record-nav-link.component';

@Component({
  selector: 'app-linked-records',
  standalone: true,
  imports: [CommonModule, RecordNavLinkComponent],
  templateUrl: './linked-records.component.html',
  styleUrl: './linked-records.component.css'
})
export class LinkedRecordsComponent implements OnDestroy {

  private subscription = new Subscription();
  recordId: number | null = null;
  records$: Observable<IRecord[]> | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private broadcastService: BroadcastService) {
    this.records$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.recordId = Number(params.get('id'));
        return this.broadcastService.getLinkedRecords(this.recordId);
      })
    );

    this.subscription.add(this.subscribeToRecordId());
  }

  private subscribeToRecordId(): Subscription {
    return this.broadcastService.recordId$.subscribe(recordId => {
      this.router.navigate(['linked-records', recordId])
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}