import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { IT } from './IT';
import { ITSearchService } from './IT-search.service';

@Component({
  selector: 'my-IT-search',
  templateUrl: './IT-search.component.html',
  styleUrls: ['./IT-search.component.css'],
  providers: [ITSearchService]
})
export class ITSearchComponent implements OnInit {
  IT390: Observable<IT[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private ITSearchService: ITSearchService,
    private router: Router
  ) {}

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.IT390 = this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(
        term =>
          term // switch to new observable each time
            ? // return the http search observable
              this.ITSearchService.search(term)
            : // or the observable of empty IT390 if no search term
              of<IT[]>([])
      ),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<IT[]>([]);
      })
    );
  }

  gotoDetail(IT: IT): void {
    const link = ['/detail', IT.id];
    this.router.navigate(link);
  }
}
