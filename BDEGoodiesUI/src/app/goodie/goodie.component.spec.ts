import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodieComponent } from './goodie.component';

describe('GoodieComponent', () => {
  let component: GoodieComponent;
  let fixture: ComponentFixture<GoodieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
