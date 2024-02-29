/**
 * Subjects
 */

const { Subject } = Rx;
const { tap } = RxOperators;

const subject = new Subject();

const observable = subject.pipe(tap((value) => console.log(value)));

subject.subscribe((value) => {
  console.log(value);
});

subject.subscribe((value) => {
  console.log(value);
});

setTimeout(() => {
  subject.next(10);
}, 100);

// ONLY HERE TO GET THIS TOOL TO WORK
subject;
