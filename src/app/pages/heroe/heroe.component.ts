import { Component } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';

import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {
  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute ){

  }

  ngOnInit(){
    //lectura del argumento por el url
    const id = this.route.snapshot.paramMap.get('id');
    //validamos si viene "nuevo", o un ID
    if( id !== 'nuevo'){
      this.heroesService.getHeroe(id)
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        })
    }
  }

  guardar(form: NgForm){

    if(form.invalid){
      console.log('Formulario no valido')
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Sea actualizo correctamente',
        icon: 'success',
      })
    })


  }

}
