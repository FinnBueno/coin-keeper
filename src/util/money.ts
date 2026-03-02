export const toEuro = (nmbr: number): string => {
  if (Number.isInteger(nmbr)) {
    return `€ ${nmbr},-`;
  } else {
    let result = `€ ${Math.round(nmbr * 100) / 100}`.replace(".", ",");
    if (Math.round(nmbr * 100) % 10 === 0) {
      result += "0";
    }
    return result;
  }
};
