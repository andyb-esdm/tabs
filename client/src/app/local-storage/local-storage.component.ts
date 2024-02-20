import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-local-storage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './local-storage.component.html',
  styleUrl: './local-storage.component.css'
})
export class LocalStorageComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  helpText: string | null = null;

  colour = '#FFFFFF';

  helpText$ = this.localStorageService.helpText$;


  constructor(private localStorageService: LocalStorageService) {
    this.helpText = this.localStorageService.getHelpText();

  }

  ngOnInit(): void {
    this.subscription.add(
      this.localStorageService.colour$.subscribe(colour => this.colour = colour)
    )
  }

  saveHelpText() {
    this.localStorageService.saveHelpText(this.helpText);
    this.helpText = '';
  }

  saveColour() {
    this.localStorageService.saveColour(this.colour);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
