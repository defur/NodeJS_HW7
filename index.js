import {
  promiseAll,
  promiseAllSettled,
  chainPromises,
  promisify
} from './task.js';

// Task 1: Implement promiseAll Function
const promises1 = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

promiseAll(promises1)
  .then(results => {
    console.log("Task 1: promiseAll resolved:", results);
  })
  .catch(error => {
    console.error("Task 1: promiseAll rejected:", error);
  });

// Task 2: Implement promiseAllSettled Function
const promises2 = [
  Promise.resolve(1),
  Promise.reject("Error occurred"),
  Promise.resolve(3)
];

promiseAllSettled(promises2)
  .then(results => {
    console.log("Task 2: promiseAllSettled results:", results);
  });

// Task 3: Implement Chaining of Promises as a Separate Function
function asyncFunc1() {
  return Promise.resolve("Result from asyncFunc1");
}
function asyncFunc2(data) {
  return Promise.resolve(data + " -> Result from asyncFunc2");
}
function asyncFunc3(data) {
  return Promise.resolve(data + " -> Result from asyncFunc3");
}

chainPromises([asyncFunc1, asyncFunc2, asyncFunc3])
  .then(result => {
    console.log("Task 3: chainPromises result:", result);
  })
  .catch(error => {
    console.error("Task 3: chainPromises error:", error);
  });

// Task 4: Implement promisify Function
function callbackStyleFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback("Invalid value", null);
    }
  }, 1000);
}

const promisedFunc = promisify(callbackStyleFunction);

promisedFunc(3)
  .then(result => {
    console.log("Task 4: promisified function result:", result);
  })
  .catch(error => {
    console.error("Task 4: promisified function error:", error);
  });
