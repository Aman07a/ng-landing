/**
 * Subject Variations
 */

const { Subject, AsyncSubject, ReplaySubject } = Rx;
const { tap } = RxOperators;

// const subject = new AsyncSubject();

// subject.subscribe((value) => {
//   console.log(value);
// });

// subject.next(10);
// subject.next(20);
// subject.next(30);
// subject.complete();

// subject;

const subject = new ReplaySubject();

subject.next(10);
subject.next(20);
subject.next(30);

subject.subscribe((value) => {
  console.log(value);
});

subject;
