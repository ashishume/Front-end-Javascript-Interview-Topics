/**
 * Batch Utility — Create a JS utility to send data in batches with a timeout: send immediately
 * when the batch size is reached, then restart the timeout.
 */
class BatchSender {
  constructor(batchSize, timeout, sendFn) {
    this.batchSize = batchSize;
    this.timeout = timeout;
    this.sendFn = sendFn;

    this.queue = [];
    this.timer = null;
  }

  // add new request to the queue when it arrives
  add(request) {
    this.queue.push(request);

    //if batch full then flush the immediately
    if (this.queue.length >= this.batchSize) {
      this.flush();
      return;
    }

    // start timer only if not already running
    if (!this.timer) {
      this.startTimer();
    }
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.flush();
    }, this.timeout);
  }

  async flush() {
    if (this.queue.length === 0) return;
    const batch = this.queue;
    this.queue = [];

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    try {
      await this.sendFn(batch);
    } catch (e) {
      console.error(err);
    }
  }
}

const sender = new BatchSender(3, 3000, async (batch) => {
  console.log('batch sending...', batch);
});

sender.add(1);
sender.add(2);
sender.add(3);

//these 2 will be sent in different batches
sender.add(4);
sender.add(5);
