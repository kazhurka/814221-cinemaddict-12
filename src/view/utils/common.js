export const sortCardsByDate = (a, b) => {
  return b.dateRelease - a.dateRelease;
};

export const sortCardsByRate = (a, b) => {
  return b.rate - a.rate;
};
