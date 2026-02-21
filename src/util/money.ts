export const toEuro = (nmbr: number): string => {
  if (Number.isInteger(nmbr)) {
    return `€ ${nmbr},-`;
  } else {
    return `€ ${Math.round(nmbr * 100) / 100}`.replace(".", ",");
  }
};
