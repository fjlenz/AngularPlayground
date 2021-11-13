import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IMessage } from './message';
import { MessageService } from './message.service';


//const ELEMENT_DATA: PeriodicElement[] = [
const ELEMENT_DATA: IMessage[] = [

  {id:1,message:"Message number 1"},
  {id:2,message:"Message number 2"},
  /*
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},*/
];


@Component({
  selector: 'message-list-component',
  templateUrl: './message-list-component.component.html',
  styleUrls: ['./message-list-component.component.css']
})
export class MessageListComponentComponent implements OnInit {
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['id', 'message'];
  //dataSource = ELEMENT_DATA;

  pageTitle: string = 'Message List Component';
  showIDColumn: boolean = true;
  showProgressBar: boolean = false;

  messages: IMessage[] = [];

  constructor(private messageService: MessageService, private snackBar: MatSnackBar) { }

  toggleIDColumn(): void {
    this.showIDColumn = !this.showIDColumn;
    console.log("Click Hide Button: " + this.showIDColumn);
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

    // Subscribe  to the Obeservable that is returned from messageService
    this.messageService.getMessages().subscribe({
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
