import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatedDataComponent } from './aggregated-data.component';

describe('AggregatedDataComponent', () => {
  let component: AggregatedDataComponent;
  let fixture: ComponentFixture<AggregatedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatedDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggregatedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
