import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoContentLComponent } from './two-content-l.component';

describe('TwoContentLComponent', () => {
  let component: TwoContentLComponent;
  let fixture: ComponentFixture<TwoContentLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoContentLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoContentLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
