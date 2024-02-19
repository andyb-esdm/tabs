import { Routes } from '@angular/router';
import { SignalRComponent } from './signal-r/signal-r.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocalStorageComponent } from './local-storage/local-storage.component';
import { BroadcastChannelComponent } from './broadcast-channel/broadcast-channel.component';
import { RecordDetailsComponent } from './record-details/record-details.component';
import { LinkedRecordsComponent } from './linked-records/linked-records.component';
import { PostMessageComponent } from './post-message/post-message.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'broadcast-channel', pathMatch: 'full' },
    {
        path: 'broadcast-channel', component: BroadcastChannelComponent,
        children: [
            { path: 'record-details/:id', component: RecordDetailsComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'linked-records/:id', component: LinkedRecordsComponent },
    { path: 'local-storage', component: LocalStorageComponent },
    { path: 'post-message', component: PostMessageComponent },
    { path: 'signal-r', component: SignalRComponent },
    { path: '**', component: NotFoundComponent }
];
