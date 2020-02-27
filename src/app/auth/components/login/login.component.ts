import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/gym-firebase/services/user.service';

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
    password: new FormControl(null, [Validators.required])
  });

  loginWithEmailAndPassword() {
    if(this.loginForm.valid) {
      this.authService.loginWithEmailAndPassword({
        email: this.loginForm.controls.login.value,
        password: this.loginForm.controls.password.value
      })
    }
  }

  registerWithEmailAndPassword() {
    if(this.loginForm.valid) {
      this.authService.reqisterWithEmailAndPassword({
        email: this.loginForm.controls.login.value,
        password: this.loginForm.controls.password.value
      }).then(user => {
        this.authService.loginWithEmailAndPassword({
          email: this.loginForm.controls.login.value,
          password: this.loginForm.controls.password.value
        }).then(() => {
          this.authService.user.updateProfile({
            displayName: this.loginForm.controls.fullname.value,
          });
        })
      })
    }
  }

  toggleRegisterForm() {
    this.registerForm = !this.registerForm;
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
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
