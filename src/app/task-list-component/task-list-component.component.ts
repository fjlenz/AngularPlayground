import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-list-component',
  templateUrl: './task-list-component.component.html',
  styleUrls: ['./task-list-component.component.css']
})
export class TaskListComponentComponent implements OnInit {

  pageTitle: string = 'This is the pageTitle from task-list-component.';
  
  constructor() { }

  ngOnInit(): void {
  }

}
