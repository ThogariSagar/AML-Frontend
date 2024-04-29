import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnsactionsComponent } from './trnsactions.component';

describe('TrnsactionsComponent', () => {
  let component: TrnsactionsComponent;
  let fixture: ComponentFixture<TrnsactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrnsactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrnsactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
