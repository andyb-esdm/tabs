import { Component, Input } from '@angular/core';
import { IRecordListItem } from '../models/record-list-item.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-record-nav-link',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './record-nav-link.component.html',
  styleUrl: './record-nav-link.component.css'
})
export class RecordNavLinkComponent {
  @Input({ required: true }) record!: IRecordListItem
}
