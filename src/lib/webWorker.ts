function setIntervalWorker(callback: () => void, interval: number) {
  const workerBlob = new Blob([`setInterval(() => { postMessage('') }, ${interval})`]);
  const workerURL = URL.createObjectURL(workerBlob);
  const worker = new Worker(workerURL);
  worker.onmessage = () => {
    callback();
  };
  return worker;
}

function setTimeoutWorker(callback: () => void, timeout: number) {
  const workerBlob = new Blob([`setTimeout(() => { postMessage('') }, ${timeout})`]);
  const workerURL = URL.createObjectURL(workerBlob);
  const worker = new Worker(workerURL);
  worker.onmessage = () => {
    callback();
    worker.terminate();
  };
  return worker;
}

export { setIntervalWorker, setTimeoutWorker };
