import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoContentRComponent } from './two-content-r.component';

describe('TwoContentRComponent', () => {
  let component: TwoContentRComponent;
  let fixture: ComponentFixture<TwoContentRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoContentRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoContentRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
