import { Component, OnInit } from "@angular/core";
import { PostsService } from "../../services/posts.service";
import { Post } from "src/interfaces/interfaces";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  posts: Post[] = [];
  habilitado = false;

  constructor(private servicio: PostsService) {}

  ngOnInit(): void {
    this.siguiente();

    /* me voy a suscribir al emit del postservice ara saber cuando se crea un post nuevo */
    this.servicio.nuevoPost.subscribe(post => {
      this.posts.unshift(post);
    });
  }

  siguiente(evento?, pull: boolean = false) {
    //si recibi pull true vacio el arreglo de posts
    if (pull) {
      this.posts = [];
      this.habilitado = false;
    }

    this.servicio.getPosts(pull).subscribe(resp => {
      this.posts.push(...resp.posts);

      if (evento) {
        evento.target.complete();

        /* si n hay ,as posts lo deshabilito */
        if (resp.posts.length === 0) {
          this.habilitado = true;
        }
      }
    });
  }

  refrescar(evento) {
    this.siguiente(evento, true);
  }
}
