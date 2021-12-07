import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageListMatComponent } from './messages/message-list-mat/message-list-mat.component';
import { MessageDetailComponent } from './messages/message-detail/message-detail.component';
import { MessageCreationDialogComponent } from './messages/message-creation-dialog/message-creation-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { StarComponent } from './shared/star/star.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageListComponent,
    MessageDetailComponent,
    MessageListMatComponent,
    MessageCreationDialogComponent,
    StarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSliderModule,
    FormsModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatSidenavModule,
    RouterModule.forRoot([
      {path: "message-list", component: MessageListComponent},
      {path: "message-list-mat", component: MessageListMatComponent},
      {path: "message-detail/:id", component: MessageDetailComponent},
      {path: "", component: MessageListComponent},
      {path: "**", component: MessageListComponent}
    ], {useHash : true } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
