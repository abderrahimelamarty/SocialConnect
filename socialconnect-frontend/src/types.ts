
    export interface User {
      token: string;
      email:string,
      name:string
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
export type Post ={
   id: number;
   
   userId: number;
   text: string;
   image: string;
   timestamp: Date;
   likes: number;
   comments: number;

}