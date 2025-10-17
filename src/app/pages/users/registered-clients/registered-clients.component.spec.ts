import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredClientsComponent } from './registered-clients.component';

describe('RegisteredClientsComponent', () => {
  let component: RegisteredClientsComponent;
  let fixture: ComponentFixture<RegisteredClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
