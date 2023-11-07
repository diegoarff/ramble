import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTweetPage } from './create-tweet.page';

describe('CreateTweetPage', () => {
  let component: CreateTweetPage;
  let fixture: ComponentFixture<CreateTweetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateTweetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
