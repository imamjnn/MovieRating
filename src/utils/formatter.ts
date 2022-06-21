export const thousandSeparator = (x: number): string | number => {
  if (Number.isNaN(x)) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const toRupiah = (money: number): string | number => {
  return Number.isNaN(money) ? money : `Rp${thousandSeparator(money)}`;
};
