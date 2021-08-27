declare global {
  type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
  };
}

export {};
