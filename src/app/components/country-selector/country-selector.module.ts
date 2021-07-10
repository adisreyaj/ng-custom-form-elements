import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountrySelectorComponent } from './country-selector.component';

@NgModule({
  declarations: [CountrySelectorComponent],
  imports: [CommonModule],
  exports: [CountrySelectorComponent],
})
export class CountrySelectorModule {}
