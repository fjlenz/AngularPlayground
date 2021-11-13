import { Injectable } from '@angular/core';
import { IMessage } from './message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
    constructor(private httpClient: HttpClient) { }
    
}

@Injectable({providedIn: 'root'})
export class MessageService {

    private messageServiceURL = "/messages";     // "https://angular-playground-app-v102-jolguo2gba-uc.a.run.app/messages";
    
    constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
    
    getMessages(): Observable<IMessage[]>{
        return this.http.get<IMessage[]>(this.messageServiceURL).pipe(
            tap(data => console.log("Tap: All response data without modify", JSON.stringify(data))),
            catchError(some_error => {
                console.log('Error in MessageService Call: ', some_error);
                this.openSnackBar("MessageService returns Error", "API Call Error");
                throw new Error('Error in Service Call');
              })
            );
        /*
        return(
        [
            {"id":1,"message":"Message number 1"},
            {"id":2,"message":"Message number 2"},
            {"id":3,"message":"Message number 3"},
            {"id":4,"message":"Message number 4"},
            {"id":5,"message":"Message number 5"},
            {"id":6,"message":"Message number 6"},
            {"id":7,"message":"Message number 7"},
          ]);
        */
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 4000,
        });
      }

}