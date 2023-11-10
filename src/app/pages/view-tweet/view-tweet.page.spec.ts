import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTweetPage } from './view-tweet.page';

describe('ViewTweetPage', () => {
  let component: ViewTweetPage;
  let fixture: ComponentFixture<ViewTweetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewTweetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
