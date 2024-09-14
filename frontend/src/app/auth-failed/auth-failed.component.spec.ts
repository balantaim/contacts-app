import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFailedComponent } from './auth-failed.component';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthFailedComponent', () => {
  let component: AuthFailedComponent;
  let fixture: ComponentFixture<AuthFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthFailedComponent],
      // imports: [HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
