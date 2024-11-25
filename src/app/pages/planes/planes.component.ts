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

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.destinoSeleccionado = this.route.snapshot.paramMap.get('destino');

    if (this.destinoSeleccionado === "destinoAmerica") {
      this.destino = JSON.parse(sessionStorage.getItem('destinoAmerica') || '{}').site
    }else{
      this.destino = JSON.parse(sessionStorage.getItem('destinoEuropa') || '{}').site
    }
  }



}
