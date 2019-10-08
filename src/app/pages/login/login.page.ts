import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


@ViewChild('Slideprincipal', {static: true}) slide : IonSlides;


  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];


/* elemto que voy a usar para mandar la data a los servicios , me sirve por que cada uno de estos variables internas las ato a un 
elemento del formulario*/
loginUser = {
  email: 'gsgsg2s@gsgg.com',
  password: '123456'
};


avatarSlide = {
  slidesPerView: 3.5,

}

  constructor(private uservice: UsuarioService, private navCtrl: NavController) { }

  ngOnInit() {

    this.slide.lockSwipes(true);
  }


  async login(flogin: NgForm){

    /* en usuario.service el metodo login devuelve una promesa con el resolve que puede venir true o false
     */
    const valido = await this.uservice.login(this.loginUser.email, this.loginUser.password);

    /* si el resolve me dio true navego a las tabs */
    if (valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }
  }

  registro(fregistro: NgForm){

    console.log(fregistro.valid);
  }

  seleccionarAvatar(avatar){

    this.avatars.forEach(avatar => {
      avatar.seleccionado = false;
    });

    avatar.seleccionado=true;
  }

  mostrarLogin(){

 this.slide.lockSwipes(false);
 this.slide.slideTo(0);
 this.slide.lockSwipes(true);

  }

  mostrarRegistro(){
    this.slide.lockSwipes(false);
    this.slide.slideTo(1);
    this.slide.lockSwipes(true);
  }
}
