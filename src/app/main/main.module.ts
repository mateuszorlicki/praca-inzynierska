import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [
    CommonModule
  ],
})
export class MainModule { }
