import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RambleViewsPage } from './ramble-views.page';

describe('RambleViewsPage', () => {
  let component: RambleViewsPage;
  let fixture: ComponentFixture<RambleViewsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RambleViewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
