export interface RespuestaPosts {
  ok: boolean;
  posts: Post[];
  pagina: number;
}

export interface Post {
  img?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
  imgs?: any[];
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
  
}