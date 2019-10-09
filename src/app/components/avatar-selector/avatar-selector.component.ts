import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  /* esto lo usamos cuando queremos mandarle desde el componente alguna informacion a quien nos embebe para poder usar este componente
  tenemos que importarlo tanto en app.components como en el components.module del componente donde lo vamos a usar, en este caso login.module */
@Output() avatarSeleccionado = new EventEmitter<string>();

  avatarSlide = {
    slidesPerView: 3.5
  };

  avatars = [
    {
      img: "av-1.png",
      seleccionado: true
    },
    {
      img: "av-2.png",
      seleccionado: false
    },
    {
      img: "av-3.png",
      seleccionado: false
    },
    {
      img: "av-4.png",
      seleccionado: false
    },
    {
      img: "av-5.png",
      seleccionado: false
    },
    {
      img: "av-6.png",
      seleccionado: false
    },
    {
      img: "av-7.png",
      seleccionado: false
    },
    {
      img: "av-8.png",
      seleccionado: false
    }
  ];
  constructor() { }

  ngOnInit() {}


  seleccionarAvatar(avatar) {
    this.avatars.forEach(avatar => {
      avatar.seleccionado = false;
    });

    avatar.seleccionado = true;
    this.avatarSeleccionado.emit(avatar.img);
  }

}
