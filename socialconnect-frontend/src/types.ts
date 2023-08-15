
    export interface User {
      id:number;
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
   timestamp: string;
   likes: number[];
   comments: Comment[];
}
export type Comment ={
  id:string,
  postId:string;
  username:string,
   content:string,
   timestamp: string;
  
}
export type Like ={
  postId:number,
  userId:number,
}
export type PostRequest ={
  userId: number;
  text: string;
  image:string;
}
export type CommentRequest ={
  postId: number;
  content: string;
  username:string;
  
}
export type CommentResponse ={
  id:string;
  postId: number;
  content: string;
  username:string;
  timestamp: string;
}
export type IFile ={
  url: string,
  name: string,
}