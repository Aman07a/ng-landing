import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = environment.api_key;
  private country = 'nl';

  pagesInput: Subject<number>;
  pagesOutput: Observable<any>;
  numberOfPages: Subject<number>;

  constructor() {
    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe();
  }
}
