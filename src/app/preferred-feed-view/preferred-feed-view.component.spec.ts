import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredFeedViewComponent } from './preferred-feed-view.component';

describe('PreferredFeedViewComponent', () => {
  let component: PreferredFeedViewComponent;
  let fixture: ComponentFixture<PreferredFeedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredFeedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredFeedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
