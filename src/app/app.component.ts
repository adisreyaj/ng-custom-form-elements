import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  form = this.fb.group({
    name: ['Adithya', [Validators.required]],
    github: ['https://github.com/AdiSreyaj', [Validators.required]],
    website: ['https://adi.so', [Validators.required]],
    server: ['IN', Validators.required],
    communications: [
      [
        {
          label: 'Marketing',
          modes: [
            {
              name: 'Email',
              enabled: true,
            },
            {
              name: 'SMS',
              enabled: false,
            },
          ],
        },
        {
          label: 'Product Updates',
          modes: [
            {
              name: 'Email',
              enabled: true,
            },
            {
              name: 'SMS',
              enabled: true,
            },
          ],
        },
      ],
    ],
  });

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe(console.info);
  }

  toggleServerDisable() {
    const server = this.form.get('server');
    server?.disabled ? server.enable() : server?.disable();
  }
}
