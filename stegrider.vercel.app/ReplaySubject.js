/**
 * Replay Subject
 */
const { Subject, ReplaySubject } = Rx;
const { scan } = RxOperators;

const subject = new ReplaySubject();

const getNumbers = () => {
  return subject.pipe(scan((acc, val) => acc + val, 0));
};

getNumbers().subscribe((val) => {
  console.log("#11111 val is ", val);
});

setTimeout(() => {
  getNumbers().subscribe((val) => {
    console.log("#22222 val is ", val);
  });
}, 10000);

setInterval(() => {
  subject.next(1);
}, 3000);

getNumbers();
