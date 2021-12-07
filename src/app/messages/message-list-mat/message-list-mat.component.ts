import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMessage } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'message-list-mat',
  templateUrl: './message-list-mat.component.html',
  styleUrls: ['./message-list-mat.component.css']
})
export class MessageListMatComponent implements OnInit {
  displayedColumns: string[] = ['id', 'message'];

  pageTitle: string = 'Message List Component matTable';
  showProgressBar: boolean = false;

  messages: IMessage[] = [];

  constructor(private messageService: MessageService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log("Creating component: message-list-component-mat");
    this.retrieveMessagesfromApi();
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

    // Subscribe  to the Obeservable that is returned from messageService
    this.messageService.getMessages(0).subscribe({
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


}
