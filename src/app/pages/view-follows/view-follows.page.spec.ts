import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewFollowsPage } from './view-follows.page';

describe('ViewFollowsPage', () => {
  let component: ViewFollowsPage;
  let fixture: ComponentFixture<ViewFollowsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewFollowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
