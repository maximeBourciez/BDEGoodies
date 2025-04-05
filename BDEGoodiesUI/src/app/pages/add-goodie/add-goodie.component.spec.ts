import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoodieComponent } from './add-goodie.component';

describe('AddGoodieComponent', () => {
  let component: AddGoodieComponent;
  let fixture: ComponentFixture<AddGoodieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddGoodieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGoodieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
