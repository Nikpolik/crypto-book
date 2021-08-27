export type Level = {
  size: number;
  price: number;
};

export interface GroupedLevel extends Level {
  total: number;
  cumulativeTotal: number;
}
