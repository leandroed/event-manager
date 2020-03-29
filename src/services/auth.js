export const TOKEN_KEY = 'passInfo';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userInfo');
  localStorage.removeItem(TOKEN_KEY);
};
