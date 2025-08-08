import { ENV } from '../utils';

export class Auth {
  baseApi = ENV.BASE_API;

  async register(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      };

      const res = await fetch(url, params);
      const result = await res.json();

      if (res.status !== 200) throw result;

      return result;
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }
}
