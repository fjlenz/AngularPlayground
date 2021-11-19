import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMessage } from './message';
import { MessageService } from './message.service';

@Component({
  selector: 'message-list-component',
  templateUrl: './message-list-component.component.html',
  styleUrls: ['./message-list-component.component.css']
})
export class MessageListComponentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'message'];

  pageTitle: string = 'Message List Component';
  showIDColumn: boolean = true;
  showProgressBar: boolean = false;

  delaySecondsOnSlider: number = 0;
  callApiWithDelayWanted: boolean = false;

  messages: IMessage[] = [];

  constructor(private messageService: MessageService, private snackBar: MatSnackBar) { }

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
      verticalPosition: "top"
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
        this.openSnackBar("Lifecycle Hook", "Complete");
        this.showProgressBar = false;
      },
      error: err => {
        console.log("Error on Serv. call - says ERROR Lifecycle Hook: " + err);
      },
    });
    console.log("Number of Messages after calling messageService: " + this.messages.length);
  }

  ngOnInit(): void {
    console.log("Creating component: message-list-component");
    this.retrieveMessagesfromApi();
  }

}
