/**
 * Share Operator
 */

const { Observable, timer } = Rx;
const { tap, share } = RxOperators;

let myObserver;
const observable = new Observable((observer) => {
  myObserver = observer;
}).pipe(
  tap((value) => console.log(value)),
  share()
);

setTimeout(() => {
  myObserver.next(10);
}, 1000);

observable.subscribe(() => {});
observable.subscribe(() => {});

new Observable(() => {});
