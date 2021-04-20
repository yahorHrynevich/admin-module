const USERS_PRIVATE_URL = '/users/private/v1/admin';

export const API = {
  verifications: (id?: string) => `${USERS_PRIVATE_URL}/verifications${id ? '/' + id : ''}`,
};
