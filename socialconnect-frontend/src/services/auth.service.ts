
import axios from 'axios';
import TokenService from './token.service';
///////////////// ajeitar /////////
const URL:string="http://localhost:8081"
class AuthService {
  // async login(username: string, password: string) {
  //   return axios
  //     .post(URL+'/auth/token', {
  //       username,
  //       password
  //     })
  //     .then((response) => {
  //       if (response.data.accessToken) {
  //         TokenService.setUser(response.data);
  //       }

  //       return response.data;
  //     });
  // }

  logout() {
    TokenService.removeUser();
  }

   async login (username:string, password:string) {
  return axios
    .post(URL + "/auth/token", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
  async register(name: string, email: string, password: string) {
    return axios
      .post(URL+'/auth/register', {
        name,
        email,
        password
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthService();