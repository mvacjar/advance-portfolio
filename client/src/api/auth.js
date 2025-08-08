import { ENV } from '../utils';

export class Auth {
  baseApi = ENV.BASE_API;
  url = `http://${this.baseApi}`;

  async register(data) {
    try {
      const url = await fetch(`${this.url}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const res = await fetch(this.url, params);
      const result = await res.json();

      if (res.status !== 201) throw result;

      return result;
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }
}
