
    export interface User {
      token: string;
      refreshToken: string;
    }
  
    export type AuthState = {
      isLoggedIn: boolean;
      user: User;
      error: string;
    };
  
    export type UserCredentials = {
      username: string;
      password: string;
    };
  
    export type UserRegister = {
      email: string;
      name: string;
      password: string;

    };
