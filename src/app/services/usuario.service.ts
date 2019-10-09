import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioGuard } from '../guards/usuario.guard';
import { NavController } from '@ionic/angular';

const URL= environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


token: string = null;
usuario: Usuario;

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }


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


  async validaToken(): Promise<boolean>{

    /*primero cargo el token */
    await this.cargarToken();

    /* si n hay token ni sigo, mando un false */
    if (!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
   



    /* voy a llamar al metodo del servicio que me trae el usuario a partir del tokem, el token se lo mando
    por los headers */
    const headers = new HttpHeaders({
      'x-token': this.token,
    });

    return new Promise<boolean>( resolve => {

      this.http.get(`${URL}/user`, {headers}).subscribe( resp => {

        if(resp['ok']){
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }

      });

    });
  }


  async cargarToken(){
    this.token =await  this.storage.get('token') || null;
  }

}
