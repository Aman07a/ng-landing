/**
 * SwitchMap vs MergeMap
 */

const { Observable, timer } = Rx;
const { mergeMap, tap, switchMap } = RxOperators;

new Observable((observer) => {
  observer.next(10);
  observer.next(20);
  observer.next(30);
}).pipe(
  mergeMap((value) => timer(value * 100)),
  tap((value) => console.log(value))
);

new Observable((observer) => {
  observer.next(10);
  observer.next(20);
  observer.next(30);
}).pipe(
  switchMap((value) => timer(value * 100)),
  tap((value) => console.log(value))
);