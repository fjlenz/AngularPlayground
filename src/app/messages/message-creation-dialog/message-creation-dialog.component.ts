import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IMessage } from '../message';

@Component({
  selector: 'app-message-creation-dialog',
  templateUrl: './message-creation-dialog.component.html',
  styleUrls: ['./message-creation-dialog.component.css']
})
export class MessageCreationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MessageCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: IMessage) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
