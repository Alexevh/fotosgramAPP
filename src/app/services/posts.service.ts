import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RespuestaPosts } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

paginaPosts =0;

  constructor(private http: HttpClient) { }


  /* normalmente no necesito parametros pero como estams haciendo dos metodos en uno le metemos el boolean para
  diferenciar uno de otro */
  getPosts(pull: boolean = false){

    if (pull)
    {
      this.paginaPosts =0;
    }

    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${environment.url}/post/?pagina=${this.paginaPosts}`);
  }

}
