import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BroadcastService } from '../broadcast.service';
import { Observable, switchMap } from 'rxjs';
import { IRecord } from '../models/record.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './record-details.component.html',
  styleUrl: './record-details.component.css'
})
export class RecordDetailsComponent {
  record$: Observable<IRecord | undefined>;
  recordId: number | undefined;
  constructor(private route: ActivatedRoute, private broadcastService: BroadcastService) {
    this.record$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.recordId = Number(params.get('id'));
        return this.broadcastService.getRecord(this.recordId)
      })
    );
  }


}
