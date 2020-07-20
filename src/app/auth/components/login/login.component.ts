import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/gym-firebase/services/user.service';
import { Store } from '@ngrx/store';
import * as fromUser from '../../../store/user';
import { UserProfile, Roles } from 'src/app/shared/models/user.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFocusClass: boolean = false;
  passwordFocusClass: boolean = false;

  registerForm: boolean = false;

  public loginForm: FormGroup = this.fb.group({
    login: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  }, { updateOn: 'change' });

  loginWithEmailAndPassword() {
    if(this.loginForm.valid) {
      this.store$.dispatch(fromUser.userLogInWithEmail({
        credentials: {
          email: this.loginForm.controls.login.value,
          password: this.loginForm.controls.password.value
        }, 
        newUser: null
      }))
    }
  }

  registerWithEmailAndPassword() {
    if(this.loginForm.valid) {
      this.store$.dispatch(fromUser.userRegisterWithEmail({
        credentials: {
          email: this.loginForm.controls.login.value,
          password: this.loginForm.controls.password.value
        },
        displayName: this.loginForm.controls.fullname.value,
      }))
    }
  }

  loginWithGoogle() {
    this.store$.dispatch(fromUser.userLogInWithGoogle());
  }

  toggleRegisterForm() {
    this.registerForm = !this.registerForm;
    this.loginForm.reset();

    if (this.registerForm) {
      this.loginForm.addControl('fullname', new FormControl('', [Validators.required]));
    } else {
      this.loginForm.removeControl('fullname');
    }
  }

  getUsers() {
    this.userService.getAllUsers();
  }

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private store$: Store<fromUser.State>,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
