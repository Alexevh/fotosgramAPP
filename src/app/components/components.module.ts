import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';

/* los componentes cuando se generan en las carpetas ueden no configurarse, si eo pasa da error, tienen que estar en las
declarations y en los exports, siempre hay que importar IOnicmodule */

@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    
  ],
  exports:[
    PostComponent,
    PostsComponent,
   

  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
