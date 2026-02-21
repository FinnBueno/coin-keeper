export const toPercentage = (total: number, part: number) => {
  return `${Math.round((part / total) * 100)}%`;
};
