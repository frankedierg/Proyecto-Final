import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelresidentesComponent } from './panelresidentes.component';

describe('PanelresidentesComponent', () => {
  let component: PanelresidentesComponent;
  let fixture: ComponentFixture<PanelresidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelresidentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelresidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
