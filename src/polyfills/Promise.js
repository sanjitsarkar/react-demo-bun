class Promise {
  rejectedValue;
  resolvedValue;
  rejectChain = [];
  resolveChain = [];
  isResolved;
  isRejected;
  resolve;
  reject;
  static resolve = (value) => new Promise((resolve) => resolve(value));

  static reject = (value) => new Promise((resolve, reject) => reject(value));

  static all(promises) {
    return new Promise((resolve, reject) => {
      let resolvedPromises = 0;
      let resolvedValues = [];
      promises.forEach((promise, index) => {
        promise
          .then((value) => {
            resolvedValues[index] = value;

            if (resolvedPromises === promises.length) {
              resolve(resolvedValues);
            }
          })
          .catch(reject);
      });
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise
          .then((value) => {
            resolve(value);
          })
          .catch(reject);
      });
    });
  }
  constructor(executor) {
    const resolve = (value) => {
      this.resolvedValue = value;
      this.isResolved = true;
      if (this.resolveChain.length > 0) {
        this.resolveChain.reduce(
          (acc, callback) => callback(acc),
          this.resolvedValue
        );
      }
    };
    const reject = (value) => {
      this.rejectedValue = value;
      this.isRejected = true;
      if (this.rejectChain.length > 0) {
        this.rejectChain.reduce(
          (acc, callback) => callback(acc),
          this.rejectedValue
        );
      }
    };

    executor(resolve, reject);
  }

  then(callback) {
    this.resolveChain.push(callback);
    if (this.isResolved) {
      this.resolveChain.reduce(
        (acc, callback) => callback(acc),
        this.resolvedValue
      );
    }
    return this;
  }

  catch(callback) {
    this.rejectChain.push(callback);
    if (this.isRejected) {
      this.rejectChain.reduce(
        (acc, callback) => callback(acc),
        this.rejectedValue
      );
    }
    return this;
  }
  finally(callback) {
    this.resolveChain.push(callback);
    this.rejectChain.push(callback);
    if (this.isResolved) {
      this.resolveChain.reduce(
        (acc, callback) => callback(acc),
        this.resolvedValue
      );
    }
    if (this.isRejected) {
      this.rejectChain.reduce(
        (acc, callback) => callback(acc),
        this.rejectedValue
      );
    }
  }
}

export default Promise;
