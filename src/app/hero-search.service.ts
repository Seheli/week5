import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IT } from './IT';

@Injectable()
export class ITSearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<IT[]> {
    return this.http
      .get<IT[]>(`app/IT390/?name=${term}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return observableThrowError(res.error || 'Server error');
  }
}
