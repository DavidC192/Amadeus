import { DestinoService } from '@services/destino.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css'
})
export class PlanesComponent implements OnInit {
  destinoSeleccionado: string | null = null;
  destino = '';
  imgDestino = '';

  constructor(private route: ActivatedRoute, private destinoService: DestinoService){}

  ngOnInit() {
    this.destinoSeleccionado = this.route.snapshot.paramMap.get('destino');

    if (this.destinoSeleccionado === "destinoAmerica") {
      this.destino = JSON.parse(sessionStorage.getItem('destinoAmerica') || '{}').site
      this.imgDestino = this.destinoService.srcA
    }else{
      this.destino = JSON.parse(sessionStorage.getItem('destinoEuropa') || '{}').site
      this.imgDestino = this.destinoService.srcE
    }
  }



}
