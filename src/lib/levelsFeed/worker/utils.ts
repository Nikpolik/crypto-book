import { GroupedLevel, Level } from "../models/level";

const updateLevelsMap = (
  levels: Map<number, Level>,
  deltas: [number, number][]
): Map<number, Level> => {
  deltas.forEach(([price, size]) => {
    if (size === 0) {
      levels.delete(price);
      return;
    }
    levels.set(price, {
      price,
      size,
    });
  });
  return levels;
};

const createLevelsMap = (levels: [number, number][]): Map<number, Level> => {
  const map = new Map<number, Level>();
  levels.forEach(([price, size]) => {
    map.set(price, {
      price,
      size,
    });
  });
  return map;
};

const sortByPrice = (a: Level, b: Level) => {
  return a.price - b.price;
};

const groupByPrice = (levels: Level[], tick = 2.5): GroupedLevel[] => {
  return levels.sort(sortByPrice).reduce((previousLevels, currentLevel) => {
    const price = currentLevel.price;
    const lastLevel = previousLevels[previousLevels.length - 1];
    const lastPrice = lastLevel?.price || -1;
    const lastCommulativeTotal = lastLevel?.cumulativeTotal || 0;

    const groupedPrice = Math.floor(price / tick) * tick;
    const roundedPrice = Math.round(groupedPrice * 100) / 100;

    if (roundedPrice === lastPrice) {
      lastLevel.total += lastLevel.size;
      lastLevel.cumulativeTotal += lastLevel.size;
    } else {
      previousLevels.push({
        ...currentLevel,
        price: roundedPrice,
        cumulativeTotal: lastCommulativeTotal + roundedPrice,
        total: currentLevel.size,
      });
    }
    return previousLevels;
  }, [] as GroupedLevel[]);
};

export { createLevelsMap, updateLevelsMap, sortByPrice, groupByPrice };
