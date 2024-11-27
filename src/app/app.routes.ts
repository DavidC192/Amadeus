import { Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { DestinosRecomendadosComponent } from './pages/destinosRecomendados/destinosRecomendados.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { TarjetasComponent } from './pages/tarjetas/tarjetas.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'destino', component: DestinosRecomendadosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'planes/:destino', component: PlanesComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'tarjetas', component: TarjetasComponent },
  { path: 'planes', component: PlanesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
];
