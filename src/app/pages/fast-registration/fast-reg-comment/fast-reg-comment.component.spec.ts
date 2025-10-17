import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastRegCommentComponent } from './fast-reg-comment.component';

describe('FastRegCommentComponent', () => {
  let component: FastRegCommentComponent;
  let fixture: ComponentFixture<FastRegCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastRegCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastRegCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
