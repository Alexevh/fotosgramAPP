import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../interfaces/interfaces';

const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


token: string = null;

  constructor(private http: HttpClient, private storage: Storage) { }


  /* el login devuelve una promesa y guarda el token */
  login(email: string, password: string){

    return new Promise ( resolve => {

      /* el post requiere datos en el body, le podria poner {email: email, passsword: password} pero no es necesario
      en ECS6 */
      const data ={email, password};

      /* hacemos la llamada post y nos suscribimos */
      this.http.post(`${URL}/user/login`, data).subscribe(resp => {
        
        /* si ok viene en true */
        if (resp['ok']){
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token=null;
          this.storage.clear();
          resolve(false);
        } 
      });

    });
  }


  registro( usuario: Usuario ) {

    return new Promise( resolve => {

      this.http.post(`${ URL }/user/create`, usuario )
          .subscribe( async resp => {
            console.log(resp);

            if ( resp['ok']==='true' ) {
              await this.guardarToken( resp['token'] );
              resolve(true);
            } else {
              this.token = null;
              this.storage.clear();
              resolve(false);
            }

          });


    });


  }


 /* como el token es muy largo puede demorar y por eso es preferible hacerlo async el guardado */
  async guardarToken(token: string){

    this.token = token;
    await this.storage.set('token', token);

  }

}
