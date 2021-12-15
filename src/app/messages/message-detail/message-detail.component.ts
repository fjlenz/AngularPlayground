import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IMessage } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})

export class MessageDetailComponent implements OnInit {

  showProgressBar: boolean = false;
  message: IMessage = <IMessage>{};

  constructor(private messageService: MessageService, private snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router) {
  }

  updateMessageviaApi() {
    console.log("Message that is currently in inputbox: " + this.message?.message + " Rating: " + this.message?.rating);

    this.messageService.updateSingleMessage(this.message).subscribe({
      next: message => this.message = message,
      complete: () => {
        this.router.navigate(["/message-list"]);
      },
      error: err => {
        console.log("Error on Serv. call - says ERROR Lifecycle Hook: " + err);
      },
    });

  }

  onGoingBack(): void {
    this.router.navigate(["/message-list"]);
  }

  retrieveSingleMessagesfromApi(): void {
    this.showProgressBar = true;

    // read ID that is handed over via Route
    const messageIdWanted = Number(this.route.snapshot.paramMap.get("id"));

    // Subscribe  to the Obeservable that is returned from messageService
    this.messageService.getSingleMessage(messageIdWanted).subscribe({
      next: message => this.message = message,
      complete: () => {
        this.showProgressBar = false;
        console.log("Completed retrieval of Message ID: " + messageIdWanted, "Complete");
      },
      error: err => {
        console.log("Error on Serv. call - says ERROR Lifecycle Hook: " + err);
      },
    });
  }

  ngOnInit(): void {
    console.log("Creating component: message-detail");
    this.retrieveSingleMessagesfromApi();
  }

}
