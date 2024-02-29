/**
 * Share Operator
 */

const { Observable, timer } = Rx;
const { tap, share } = RxOperators;

const observable = new Observable((observer) => {
  observer.next(1);
}).pipe(
  tap((value) => console.log(value)),
  share()
);

observable.subscribe(() => {});
observable.subscribe(() => {});

new Observable(() => {});
