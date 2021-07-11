import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTRY_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CountrySelectorComponent),
  multi: true,
};

@Component({
  selector: 'app-country-selector',
  template: `
    <div class="grid grid-cols-4 gap-4 mt-2">
      <ng-container *ngFor="let country of countries">
        <button
          [disabled]="disabled"
          [attr.tabindex]="selected === country.code ? -1 : 0"
          (click)="selectCountry(country.code)"
          class="flex flex-col items-center rounded-md border p-2 relative"
          [class.selected]="!disabled && selected === country.code"
        >
          <ng-container *ngIf="!disabled && selected === country.code">
            <svg
              @selected
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              class="absolute -top-2 -right-2"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="var(--primary)"
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
              />
              <path d="M11.003 16l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="#fff" />
            </svg>
          </ng-container>
          <img
            [src]="'https://raw.githubusercontent.com/Yummygum/flagpack-core/main/svg/l/' + country.code + '.svg'"
            [alt]="country.name"
          />
          <p class="text-xs text-gray-700 mt-1">{{ country?.name }}</p>
        </button>
      </ng-container>
    </div>
  `,
  providers: [COUNTRY_CONTROL_VALUE_ACCESSOR],
  styles: [
    `
      button {
        @apply outline-none transition-all duration-200;
        &:not(.selected) {
          @apply focus:ring focus:ring-primary focus:ring-2;
        }
        &:disabled {
          opacity: 0.7;
        }
      }
      .selected {
        @apply shadow-lg border-primary;
      }
    `,
  ],
  animations: [
    trigger('selected', [
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      state('void', style({ opacity: 0, transform: 'scale(0)' })),
      transition(':enter', animate('300ms ease-in-out')),
      transition(':leave', animate('300ms ease-in-out')),
    ]),
  ],
})
export class CountrySelectorComponent implements ControlValueAccessor {
  countries = [
    { code: 'IN', name: 'India' },
    { code: 'US', name: 'United States' },
    { code: 'GB-ENG', name: 'England' },
    { code: 'NL', name: 'Netherlands' },
  ];
  selected!: string;
  disabled = false;
  private onTouched!: Function;
  private onChanged!: Function;

  selectCountry(code: string) {
    this.onTouched();
    this.selected = code;
    this.onChanged(code);
  }

  writeValue(value: string): void {
    this.selected = value ?? 'IN';
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
