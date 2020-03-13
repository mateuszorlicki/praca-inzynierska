import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-required',
  templateUrl: './login-required.component.html',
  styleUrls: ['./login-required.component.scss']
})
export class LoginRequiredComponent implements OnInit {

  login() {
    this.router.navigate(['/login']);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
