import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneContentRComponent } from './one-content-r.component';

describe('OneContentRComponent', () => {
  let component: OneContentRComponent;
  let fixture: ComponentFixture<OneContentRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneContentRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneContentRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
