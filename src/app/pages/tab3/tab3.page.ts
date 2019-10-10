import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiserviceService } from 'src/app/services/uiservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
 


usuario: Usuario ={}

  constructor(private servicioUsuario: UsuarioService, private uiservice: UiserviceService ) {}


  logout(){

  }


  ngOnInit(): void {
    this.usuario = this.servicioUsuario.getUsuario();
    console.log('me llega el usuario', this.usuario);
  }

  async actualizar(FActualizar: NgForm){

    if (FActualizar.invalid) {return;};

    const actualizado = await this.servicioUsuario.actualizarUsuario(this.usuario);
    console.log('la actualizacion dio ', actualizado);

    if (actualizado){
      this.uiservice.mostrarAlerta('Usuario actualizo con exito');
    } else {
      this.uiservice.mostrarAlerta('Error en la actualizacion');
    }
  }

}
