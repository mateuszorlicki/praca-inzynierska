import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from 'src/app/shared/models/user.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-trainer',
  templateUrl: './single-trainer.component.html',
  styleUrls: ['./single-trainer.component.scss']
})
export class SingleTrainerComponent implements OnInit {

  @Input() trainer: UserProfile;

  goToTrainerPage() {
    this.router.navigate(['trainer-team/' + this.trainer.uid]);
  }
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
