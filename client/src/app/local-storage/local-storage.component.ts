import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-local-storage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './local-storage.component.html',
  styleUrl: './local-storage.component.css'
})
export class LocalStorageComponent {
  helpText: string | null = null;

  helpText$ = this.localStorageService.helpText$;

  constructor(private localStorageService: LocalStorageService) {
    this.helpText = this.localStorageService.getHelpText();
  }

  save() {
    this.localStorageService.save(this.helpText);
    this.helpText = '';
  }
}
