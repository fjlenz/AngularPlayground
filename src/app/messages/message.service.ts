import { Injectable } from '@angular/core';
import { IMessage } from './message';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  constructor(private httpClient: HttpClient) { }

}

@Injectable({ providedIn: 'root' })
export class MessageService {

  private messagesServiceURL = "/messages";
  private messageServiceURL = "/message";

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getMessages(delaySeconds: number): Observable<IMessage[]> {
    //return this.http.get<IMessage[]>(this.messageServiceURL).pipe(
    return this.http.get<IMessage[]>(this.messagesServiceURL, { params: new HttpParams().set("delaySeconds", delaySeconds.toString()) }).pipe(
      tap(data => console.log("Tap: All response data without modify", JSON.stringify(data))),
      catchError(some_error => {
        console.log('Error in MessageService Call: ', some_error);
        this.openSnackBar("MessageService returns Error", "API Call Error");
        throw new Error('Error in Service Call');
      })
    );
  }

  getSingleMessage(messageIdNeeded: number): Observable<IMessage> {
    let urlForSingleMessageRetrieval = this.messageServiceURL + `/${messageIdNeeded}`;

    return this.http.get<IMessage>(urlForSingleMessageRetrieval).pipe(
      tap(data => console.log("Tap: All response data without modify", JSON.stringify(data))),
      catchError(some_error => {
        console.log('Error in MessageService Call: ', some_error);
        this.openSnackBar("MessageService returns Error", "API Call Error");
        throw new Error('Error in Service Call');
      })
    );
  }

  updateSingleMessage(messageForUpdate: IMessage): Observable<IMessage> {
    let urlForSingleMessageUpdate = this.messageServiceURL + `/${messageForUpdate.id}`;

    return this.http.put<IMessage>(urlForSingleMessageUpdate, messageForUpdate).pipe(
      tap(data => console.log("Tap: All response data without modify", JSON.stringify(data))),
      catchError(some_error => {
        console.log('Error in MessageService Call: ', some_error);
        this.openSnackBar("MessageService returns Error", "API Call Error");
        throw new Error('Error in Service Call');
      })
    );
  }

  deleteSingleMessage(messageForDelete: IMessage): Observable<IMessage> {
    let urlForSingleMessageDelete = this.messageServiceURL + `/${messageForDelete.id}`;

    return this.http.delete<IMessage>(urlForSingleMessageDelete).pipe(
      tap(data => console.log("Tap: All response data without modify", JSON.stringify(data))),
      catchError(some_error => {
        console.log('Error in MessageService Call: ', some_error);
        this.openSnackBar("MessageService returns Error", "API Call Error");
        throw new Error('Error in Service Call');
      })
    );
  }

  peristSingleMessage(messageForPersist: IMessage): Observable<IMessage> {
    return this.http.post<IMessage>(this.messageServiceURL, messageForPersist).pipe(
      tap(data => console.log("Tap: All response data without modify", JSON.stringify(data))),
      catchError(some_error => {
        console.log('Error in MessageService Call: ', some_error);
        this.openSnackBar("MessageService returns Error", "API Call Error");
        throw new Error('Error in Service Call');
      })
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}