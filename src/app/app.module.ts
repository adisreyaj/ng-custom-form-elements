import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommunicationPreferenceModule } from './components/communication-preference/communication-preference.module';
import { CountrySelectorModule } from './components/country-selector/country-selector.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CountrySelectorModule,
    CommunicationPreferenceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
