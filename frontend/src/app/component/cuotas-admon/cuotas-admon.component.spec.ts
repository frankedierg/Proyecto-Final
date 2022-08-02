import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuotasAdmonComponent } from './cuotas-admon.component';

describe('CuotasAdmonComponent', () => {
  let component: CuotasAdmonComponent;
  let fixture: ComponentFixture<CuotasAdmonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuotasAdmonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuotasAdmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
