import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDataComponent } from './multi-data.component';

describe('MultiDataComponent', () => {
  let component: MultiDataComponent;
  let fixture: ComponentFixture<MultiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
