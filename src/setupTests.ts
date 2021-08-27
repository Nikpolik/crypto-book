import "@testing-library/jest-dom";

const mockedPostMessage = jest.fn();

afterEach(() => {
  mockedPostMessage.mockReset();
});

const triggerMessage = (msg: any) => {
  workers.forEach((w) => w.onmessage({ data: msg }));
};

const workers: Worker[] = [];

class Worker {
  url: string;
  onmessage: (msg: any) => void;
  id: number;

  constructor(stringUrl: string) {
    this.url = stringUrl;
    this.onmessage = (msg) => msg;
    this.id = workers.length;
    workers.push(this);
  }

  postMessage(msg: any) {
    mockedPostMessage(msg);
  }

  terminate() {}
}

global.Worker = Worker as any;

export { triggerMessage, mockedPostMessage };
