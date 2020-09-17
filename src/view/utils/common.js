export const sortCardsByDate = (a, b) => {
  return b.dateRelease - a.dateRelease;
};

export const sortCardsByRate = (a, b) => {
  return b.rate - a.rate;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};
