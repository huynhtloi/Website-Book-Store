import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyContentLComponent } from './buy-content-l.component';

describe('BuyContentLComponent', () => {
  let component: BuyContentLComponent;
  let fixture: ComponentFixture<BuyContentLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyContentLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyContentLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
