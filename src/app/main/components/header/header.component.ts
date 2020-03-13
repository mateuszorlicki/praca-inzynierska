import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = this.authService.user;

  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigate(['/login']);
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.authState$.subscribe(res => {
      console.log('auth', res);
      if(res) {
        this.user = this.authService.user;
      } else {
        this.user = null;
      }
    })
  }

}
