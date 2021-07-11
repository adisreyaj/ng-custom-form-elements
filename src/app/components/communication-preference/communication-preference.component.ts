import { Component, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface CommunicationPreference {
  label: string;
  modes: { name: string; enabled: boolean }[];
}

const COM_PREFERENCE_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CommunicationPreferenceComponent),
  multi: true,
};

@Component({
  selector: 'app-communication-preference',
  template: `<div class="mt-2">
    <ul class="grid grid-cols-2 gap-6">
      <ng-container *ngFor="let item of options; index as i">
        <li class="flex flex-col border shadow-md rounded-md px-4 py-3">
          <p class="mb-3 text-xs font-medium text-gray-700">{{ item?.label }}</p>
          <div class="flex items-center space-x-4">
            <ng-container *ngFor="let mode of item.modes; index as j">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  [id]="item.label + mode.name"
                  [(ngModel)]="mode.enabled"
                  (ngModelChange)="handleChange(i, j, $event)"
                />
                <label [for]="item.label + mode.name" class="ml-2 text-sm cursor-pointer">{{ mode.name }}</label>
              </div>
            </ng-container>
          </div>
        </li>
      </ng-container>
    </ul>
  </div>`,
  providers: [COM_PREFERENCE_CONTROL_VALUE_ACCESSOR],
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class CommunicationPreferenceComponent implements ControlValueAccessor {
  options: CommunicationPreference[] = [];
  private onTouched!: Function;
  private onChanged!: Function;
  handleChange(itemIndex: number, modeIndex: number, change: any) {
    this.options[itemIndex].modes[modeIndex].enabled = change;
    this.onChanged(this.options);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.options = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
