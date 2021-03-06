import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IT } from './IT';

@Injectable()
export class ITService {
  private IT390Url = 'app/IT390'; // URL to web api

  constructor(private http: HttpClient) {}

  getIT390() {
    return this.http
      .get<IT[]>(this.IT390Url)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getIT(id: number): Observable<IT> {
    return this.getIT390().pipe(
      map(IT390 => IT390.find(IT => IT.id === id))
    );
  }

  save(IT: IT) {
    if (IT.id) {
      return this.put(IT);
    }
    return this.post(IT);
  }

  delete(IT: IT) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.IT390Url}/${IT.id}`;

    return this.http.delete<IT>(url).pipe(catchError(this.handleError));
  }

  // Add new IT
  private post(IT: IT) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<IT>(this.IT390Url, IT)
      .pipe(catchError(this.handleError));
  }

  // Update existing IT
  private put(IT: IT) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.IT390Url}/${IT.id}`;

    return this.http.put<IT>(url, IT).pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
