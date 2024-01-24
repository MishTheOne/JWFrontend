import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDeliveriesComponent } from './show-deliveries.component';

describe('ShowDeliveriesComponent', () => {
  let component: ShowDeliveriesComponent;
  let fixture: ComponentFixture<ShowDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDeliveriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
