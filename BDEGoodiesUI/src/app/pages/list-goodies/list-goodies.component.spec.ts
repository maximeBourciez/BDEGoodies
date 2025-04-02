import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGoodiesComponent } from './list-goodies.component';

describe('ListGoodiesComponent', () => {
  let component: ListGoodiesComponent;
  let fixture: ComponentFixture<ListGoodiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListGoodiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGoodiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
