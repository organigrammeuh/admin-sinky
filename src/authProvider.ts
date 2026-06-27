// authProvider.js
import Cookies from 'js-cookie';

const API_URL =  'http://localhost:3000/api';

export const authProvider = {

  login: async ({ username, password } : {username : string , password : string}) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email : username , password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const { acessToken, user } = await response.json();

    Cookies.set('auth_token', acessToken, { expires: 1, secure: true });
    Cookies.set('user', JSON.stringify(user), { expires: 1 });

    return Promise.resolve();
  },

  logout: () => {
    Cookies.remove('auth_token');
    Cookies.remove('user');
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = Cookies.get('auth_token');
    return token ? Promise.resolve() : Promise.reject({ message: 'Login required' });
  },

  checkError: ({ status } : {status : number}) => {
    if (status === 401 || status === 403) {
      Cookies.remove('auth_token');
      Cookies.remove('user');
      return Promise.reject(); // force logout + redirect to login
    }
    return Promise.resolve(); // keep the user logged in
  },
  
  getIdentity: () => {
    try {
      const user = JSON.parse(Cookies.get('user') || '{}');
      return Promise.resolve({
        id: user.id,
        fullName: user.name,
        avatar: user.avatar_url,
      });
    } catch {
      return Promise.reject();
    }
  },

  getPermissions: () => {
    try {
      const user = JSON.parse(Cookies.get('user') || '{}');
      return Promise.resolve(user.role); // e.g. 'admin', 'editor', 'viewer'
    } catch {
      return Promise.reject();
    }
  },
};

export default authProvider;