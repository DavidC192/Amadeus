import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinosRecomendados } from './destinosRecomendados.component';

describe('DestinosRecomendados', () => {
  let component: DestinosRecomendados;
  let fixture: ComponentFixture<DestinosRecomendados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinosRecomendados]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestinosRecomendados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
