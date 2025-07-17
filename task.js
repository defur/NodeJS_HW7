export function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          results[i] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

export function promiseAllSettled(promises) {
  return new Promise(resolve => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          results[i] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[i] = { status: 'rejected', reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

export function chainPromises(functionsArray) {
  return functionsArray.reduce((prev, curr) => prev.then(curr), Promise.resolve());
}

export function promisify(callbackStyleFunc) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackStyleFunc(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
}
