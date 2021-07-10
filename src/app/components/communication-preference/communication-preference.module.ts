import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommunicationPreferenceComponent } from './communication-preference.component';

@NgModule({
  declarations: [CommunicationPreferenceComponent],
  imports: [CommonModule, FormsModule],
  exports: [CommunicationPreferenceComponent],
})
export class CommunicationPreferenceModule {}
