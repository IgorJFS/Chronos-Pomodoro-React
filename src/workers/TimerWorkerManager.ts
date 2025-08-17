import type { TaskStateModel } from '../models/TaskStateModel';

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
  private workers: Worker;

  private constructor() {
    this.workers = new Worker(new URL('./timerWorker.js', import.meta.url));
  }

  static getInstance(): TimerWorkerManager {
    if (!instance) {
      instance = new TimerWorkerManager();
    }
    return instance;
  }

  postMessage(message: TaskStateModel) {
    this.workers.postMessage(message);
  }

  onMessage(callback: (e: MessageEvent) => void) {
    this.workers.onmessage = callback;
  }

  terminate() {
    this.workers.terminate();
    instance = null;
  }
}
