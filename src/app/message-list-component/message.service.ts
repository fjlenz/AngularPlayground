import { Injectable } from '@angular/core';
import { IMessage } from './message';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
    constructor(private httpClient: HttpClient) { }
    
}

@Injectable({providedIn: 'root'})
export class MessageService {

    private messageServiceURL = "/messages";

    constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
    
    getMessages(delaySeconds : number): Observable<IMessage[]>{
        //return this.http.get<IMessage[]>(this.messageServiceURL).pipe(
          return this.http.get<IMessage[]>(this.messageServiceURL, {params : new HttpParams().set("delaySeconds", delaySeconds.toString())}).pipe(
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