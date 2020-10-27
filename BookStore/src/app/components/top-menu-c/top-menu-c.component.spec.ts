import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuCComponent } from './top-menu-c.component';

describe('TopMenuCComponent', () => {
  let component: TopMenuCComponent;
  let fixture: ComponentFixture<TopMenuCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMenuCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenuCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
