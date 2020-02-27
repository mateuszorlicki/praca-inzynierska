import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';

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
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
