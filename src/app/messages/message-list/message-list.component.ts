import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IMessage } from '../message';
import { MessageService } from '../message.service';
import { MessageCreationDialogComponent } from '../message-creation-dialog/message-creation-dialog.component';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  pageTitle: string = 'Message List Component ngFor';
  showIDColumn: boolean = true;
  showProgressBar: boolean = false;

  delaySecondsOnSlider: number = 0;
  callApiWithDelayWanted: boolean = false;

  messages: IMessage[] = [];

  constructor(private messageService: MessageService, private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  toggleIDColumn(): void {
    this.showIDColumn = !this.showIDColumn;
    console.log("Click Hide Button: " + this.showIDColumn);
  }

  formatSliderLabel(value: number) {
    return value + "s";
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }

  retrieveMessagesfromApi(): void {
    this.showProgressBar = true;

    if (!this.callApiWithDelayWanted) {
      this.delaySecondsOnSlider = 0;
    }
    console.log("Calling API with delay of: " + this.delaySecondsOnSlider);

    // Subscribe  to the Obeservable that is returned from messageService
    this.messageService.getMessages(this.delaySecondsOnSlider).subscribe({
      next: messages => this.messages = messages,
      complete: () => {
        this.openSnackBar("Retrieval of Messages done!", "Complete");
        this.showProgressBar = false;
      },
      error: err => {
        console.log("Error on Serv. call - says ERROR Lifecycle Hook: " + err);
      },
    });
    console.log("Number of Messages after calling messageService: " + this.messages.length);
  }

  deleteMessageviaApi(message: IMessage) {
    this.showProgressBar = true;

    console.log("Message that is currently in inputbox: " + message.id);

    this.messageService.deleteSingleMessage(message).subscribe({
      complete: () => {

        // relaod messages from API
        this.retrieveMessagesfromApi();

        this.showProgressBar = false;
      },
      error: err => {
        console.log("Error on Serv. call - says ERROR Lifecycle Hook: " + err);
      },
    });
  }


  addMessageviaApi() {

    let messageFromDialog: string | unknown;
    let ratingFromDialog: number | unknown;

    const dialogRef = this.dialog.open(MessageCreationDialogComponent, {
      width: '250px',
      data: { message: messageFromDialog, rating: ratingFromDialog},
    });

    dialogRef.afterClosed().subscribe(messageResultfromDialog => {
      messageFromDialog = messageResultfromDialog.message;
      ratingFromDialog = messageResultfromDialog.rating;

      console.log('The dialog was closed: ' + messageFromDialog + "Rating: " + ratingFromDialog);

      this.showProgressBar = true;

      let messageforPersist: IMessage = <IMessage>{ message: messageFromDialog, rating: ratingFromDialog  };

      console.log("Message for Perists: " + messageforPersist.message + " " + messageforPersist.rating);

      if (messageFromDialog) {
        console.log("Doing a POST call");
        this.messageService.peristSingleMessage(messageforPersist).subscribe({
          complete: () => {
            // relaod messages from API
            this.retrieveMessagesfromApi();

          },
          error: err => {
            console.log("Error on Serv. call - says ERROR Lifecycle Hook: " + err);
          },
        });
      } else {

        console.log("Wont do a POST call");
      }

      this.showProgressBar = false;

    });




  }

  ngOnInit(): void {
    console.log("Creating component: message-list-component");
    this.retrieveMessagesfromApi();
  }

}
