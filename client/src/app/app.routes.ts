import { Routes } from '@angular/router';
import { SignalRComponent } from './signal-r/signal-r.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocalStorageComponent } from './local-storage/local-storage.component';
import { BroadcastChannelComponent } from './broadcast-channel/broadcast-channel.component';

export const routes: Routes = [
    { path: '', redirectTo: 'broadcast-channel', pathMatch: 'full' },
    { path: 'broadcast-channel', component: BroadcastChannelComponent },
    { path: 'local-storage', component: LocalStorageComponent },
    { path: 'post-message', component: SignalRComponent },
    { path: 'signal-r', component: SignalRComponent },
    { path: '**', component: NotFoundComponent }
];
