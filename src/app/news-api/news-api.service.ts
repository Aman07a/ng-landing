import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

interface NewsApiResponse {
  totalResults: number;
  articles: {
    title: string;
    url: string;
  }[];
}

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

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject();

    this.pagesInput = new Subject();
    this.pagesOutput = this.pagesInput.pipe(
      map((page) => {
        return new HttpParams()
          .set('apiKey', this.apiKey)
          .set('country', this.country)
          .set('pageSize', String(this.pageSize))
          .set('page', String(page));
      }),
      switchMap((params) => {
        return this.http.get<NewsApiResponse>(this.url, { params });
      }),
      tap((response) => {
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.numberOfPages.next(totalPages);
      })
    );
  }
}
