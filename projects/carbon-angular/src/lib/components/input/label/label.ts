import { Component, signal, WritableSignal, Input } from '@angular/core';

@Component({
  selector: 'ui-label',
  standalone: true,
  templateUrl: './label.html',
  // styleUrls: ['./label.scss']
})
export class LabelComponent {
  label: WritableSignal<string> = signal('');
  helperText: WritableSignal<string> = signal('');
  invalid: WritableSignal<boolean> = signal(false);

  @Input() set _label(val: string) { this.label.set(val); }
  @Input() set _helperText(val: string) { this.helperText.set(val); }
  @Input() set _invalid(val: boolean) { this.invalid.set(val); }

  get labelClass() { return this.invalid() ? 'cds--label-invalid' : 'cds--label'; }
}
