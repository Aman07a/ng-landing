/**
 * Scan Operator
 */

const { Subject } = Rx;
const { scan } = RxOperators;

const subject = new Subject().pipe(
  scan((acc, value) => {
    if (value.type === "success" || value.type === "error") {
      return [...acc, value];
    } else if (value.type === "clear") {
      return acc.filter((command) => command.id !== value.id);
    }
  }, [])
);

setTimeout(() => {
  subject.next({
    type: "success",
    id: 1,
    text: "Fetched stuff",
  });
}, 1000);

setTimeout(() => {
  subject.next({
    type: "error",
    id: 2,
    text: "Failed to get weather",
  });
}, 2000);

setTimeout(() => {
  subject.next({
    type: "clear",
    id: 1,
  });
}, 3000);

subject;
