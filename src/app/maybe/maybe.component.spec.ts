import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaybeComponent } from './maybe.component';

describe('MaybeComponent', () => {
  let component: MaybeComponent;
  let fixture: ComponentFixture<MaybeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaybeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaybeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
