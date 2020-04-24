import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPass from '../../../store/pass';
import { Pass } from 'src/app/shared/models/pass.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  allPasses$: Observable<Array<Pass>> = this.store$.pipe(select(fromPass.selectAllPasses));

  constructor(
    private store$: Store<fromPass.State>
  ) { }

  ngOnInit(): void {
  }

}
