import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseListComponent } from './depense-list.component';

describe('DepenseListComponent', () => {
  let component: DepenseListComponent;
  let fixture: ComponentFixture<DepenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepenseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
