import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { HomePage } from 'src/app/pages/home/home.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'planets', component: HomePage }
   ]),],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj(
    'authService',
    ['login']
  );

  let router: Router;


  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form with username and password inputs', () => {
    const element = fixture.nativeElement;

    expect(element.querySelector('form')).toBeTruthy();
    expect(element.querySelector('#username')).toBeTruthy();
    expect(element.querySelector('#password')).toBeTruthy();
    expect(element.querySelector('button')).toBeTruthy();
  });

  it('should return model invalid when form is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate username input as required', () => {
    const username = component.loginForm.controls.username;

    expect(username.valid).toBeFalsy();
    expect(username.errors.required).toBeTruthy();
  });

  it('should validate password input as required', () => {
    const password = component.loginForm.controls.password;

    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });

  it('should render password validation message when formControl is submitted and invalid', () => {
    const elements: HTMLElement = fixture.nativeElement;
    expect(elements.querySelector('#password-error')).toBeFalsy();

    elements.querySelector('button').click();

    fixture.detectChanges();
    expect(elements.querySelector('#password-error')).toBeTruthy();
    expect(elements.querySelector('#password-error').textContent).toContain(
      'Password is required'
    );
  });

  it('should invoke auth service when form is valid', () => {
    const username = component.loginForm.controls.username;
    username.setValue('luke');
    const password = component.loginForm.controls.password;
    password.setValue('luke');
    authServiceStub.login.and.returnValue(true);

    fixture.nativeElement.querySelector('button').click();

    expect(authServiceStub.login.calls.any()).toBeTruthy();
    expect(authServiceStub.login).toHaveBeenCalledWith(
      username.value,
      password.value
    );
  });
});
