import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneContentLComponent } from './one-content-l.component';

describe('OneContentLComponent', () => {
  let component: OneContentLComponent;
  let fixture: ComponentFixture<OneContentLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneContentLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneContentLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
