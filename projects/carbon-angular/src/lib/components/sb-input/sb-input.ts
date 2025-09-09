import {
  Component,
  input,
  model,
  signal,
  computed,
  Optional,
  Self,
} from '@angular/core';
import { NgControl, ControlValueAccessor, FormsModule } from '@angular/forms';
import { SbIcon } from '../sb-icons/sb-icon';

@Component({
  selector: 'sb-input',
  standalone: true,
  imports: [SbIcon, FormsModule],
  templateUrl: './sb-input.html',
  styleUrls: ['./sb-input.scss'],
})
export class SbInputComponent implements ControlValueAccessor {
  /** Inputs */
  label = input<string>('');
  placeholder = input<string>('');
  type = input<'text' | 'email' | 'password'>('text');

  /** Model for two-way binding */
  value = model<string>('');

  /** Password toggle state */
  showPassword = signal(false);

  /** Computed type for password visibility */
  effectiveType = computed(() =>
    this.type() === 'password' && this.showPassword() ? 'text' : this.type()
  );

  /** CVA handlers */
  private onChangeFn: (val: string) => void = () => { };
  private onTouchedFn: () => void = () => { };

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl) ngControl.valueAccessor = this;
  }

  /** Input change handler */
  onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChangeFn(val);
    this.onTouchedFn();
  }

  /** Toggle password visibility */
  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  /** ControlValueAccessor implementations */
  writeValue(val: string): void {
    if (val !== undefined) this.value.set(val ?? '');
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // Implement if needed
  }

  /** Validation helpers */
  get invalid(): boolean {
    return !!this.ngControl?.invalid && !!this.ngControl?.touched;
  }

  get errorMessage(): string | null {
    if (!this.invalid) return null;
    const errors = this.ngControl?.errors ?? {};
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Please enter a valid email';
    if (errors['minlength'])
      return `Minimum length is ${errors['minlength'].requiredLength}`;
    return 'Invalid value';
  }
}
