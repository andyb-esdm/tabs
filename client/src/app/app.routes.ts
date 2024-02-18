import { Routes } from '@angular/router';
import { SignalRComponent } from './signal-r/signal-r.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'signal-r', pathMatch: 'full' },
    { path: 'signal-r', component: SignalRComponent },
    { path: '**', component: NotFoundComponent }
];
