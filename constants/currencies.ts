import { Currency } from '@modules/admin/models/currency';

export const CURRENCY_COLORS = [
  window.getComputedStyle(document.body).getPropertyValue('--color-currency-euro'),
  window.getComputedStyle(document.body).getPropertyValue('--color-currency-bitcoin'),
  window.getComputedStyle(document.body).getPropertyValue('--color-currency-ethereum'),
  window.getComputedStyle(document.body).getPropertyValue('--color-currency-bitcoin-cash'),
  window.getComputedStyle(document.body).getPropertyValue('--color-currency-litecoin'),
  window.getComputedStyle(document.body).getPropertyValue('--color-currency-cordano'),
];

export const CURRENCY_SIGNS = {
  USD: '$',
  EUR: '€',
};

export const FAKE_CURRENCIES = {
  dollar: new Currency({
    sign: '$',
    code: 'USD',
  }),
  euro: new Currency({
    sign: '€',
    code: 'EUR',
  }),
  bitcoin: new Currency({
    code: 'BTC',
  }),
  bitcoinCash: new Currency({
    code: 'BTH',
  }),
  ethereum: new Currency({
    code: 'ETH',
  }),
  cardano: new Currency({
    code: 'ADA',
  }),
  litecoin: new Currency({
    code: 'LTC',
  }),
  xmatk: new Currency({
    code: 'XMATK',
  }),
};
