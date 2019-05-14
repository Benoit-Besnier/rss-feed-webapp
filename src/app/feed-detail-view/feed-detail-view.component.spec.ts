import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedDetailViewComponent } from './feed-detail-view.component';

describe('FeedDetailViewComponent', () => {
  let component: FeedDetailViewComponent;
  let fixture: ComponentFixture<FeedDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
