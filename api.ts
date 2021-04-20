const ACCOUNTS_PRIVATE_URL = '/accounts/private/v1';
const ACCOUNTS_PRIVATE_ADMIN_URL = '/accounts/private/v1/admin';
const FILES_PRIVATE_URL = '/files/private/v1';
const USERS_ADMIN_PRIVATE_URL = '/users/private/v1/admin';
const CURRENCIES_PUBLIC_URL = '/currencies/public/v1';
const CURRENCIES_ADMIN_PRIVATE_URL = '/currencies/private/v1/admin';
const CURRENCIES_PRIVATE_URL = '/currencies/private/v1';

export const API = {
  transactionsHistory: `${ACCOUNTS_PRIVATE_ADMIN_URL}/transactions/history`,
  getFile: (fileId: number) => `${FILES_PRIVATE_URL}/files/${fileId}`,
  getBinaryFile: (fileId: number) => `${FILES_PRIVATE_URL}/storage/bin/${fileId}`,
  userVerificationApprove: (id: number) => `${USERS_ADMIN_PRIVATE_URL}/verifications/approve/${id}`,
  userVerificationCancel: (id: number) => `${USERS_ADMIN_PRIVATE_URL}/verifications/cancel/${id}`,
  hotWallets: `${ACCOUNTS_PRIVATE_URL}/hot-wallets`,
  balance: `${ACCOUNTS_PRIVATE_ADMIN_URL }/accounts/crypto-summary`,
  currencyLogo: `${CURRENCIES_PUBLIC_URL}/currency-logo/`,
  rates: `${CURRENCIES_PRIVATE_URL}/rates`,
  ratesAdmin: `${CURRENCIES_ADMIN_PRIVATE_URL}/rates`,
  feesAdmin: `${ACCOUNTS_PRIVATE_URL}/admin/fee/transfer`,
  feeAdmin: (feeId: number) => `${ACCOUNTS_PRIVATE_URL}/admin/fee/transfer/parameters/${feeId}`,
  feeSendAdmin: (feeId: number) => `${ACCOUNTS_PRIVATE_URL}/admin/fee/transfer/id/${feeId}`,
};
