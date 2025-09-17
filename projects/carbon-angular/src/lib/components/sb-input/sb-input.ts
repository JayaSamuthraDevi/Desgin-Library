import {
  ChangeDetectionStrategy,
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
import {IconName} from '../sb-icons/icons';
@Component({
  selector: 'sb-input',
  standalone: true,
  imports: [SbIcon, FormsModule],
  templateUrl: './sb-input.html',
  styleUrls: ['./sb-input.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()', // replaces @HostBinding
  },
})
export class SbInputComponent implements ControlValueAccessor {
  // Inputs
  label = input<string>('');
  placeholder = input<string>('');
  type = input<'text' | 'email' | 'password' | 'number'>('text');
  value = model<string>('');
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  size = input<'sm' | 'md' | 'lg'>('md');
  className = input<string>('');

  warn = input<boolean>(false);
  warnText = input<string>('This is a warning!');
  helperText = input<string>('Optional helper text');
  fluid = input<boolean>(false);
  skeleton = input<boolean>(false);
  ariaLabel = input<string>('');

  // Icons
 iconName = input<IconName | undefined>(undefined);
iconRightName = input<IconName | undefined>(undefined);

  hint = input<string>('');

  // Password toggle
  showPassword = signal(false);
  effectiveType = computed(() =>
    this.type() === 'password' && this.showPassword() ? 'text' : this.type()
  );

  // Unique ID
  private static nextId = 0;
  readonly inputId = `sb-input-${SbInputComponent.nextId++}`;

  // CVA
  private onChangeFn: (val: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (ngControl) ngControl.valueAccessor = this;
  }

  // Validation
  get invalid(): boolean {
    return !!this.ngControl?.invalid && !!this.ngControl?.touched;
  }

  get errorMessage(): string | null {
    if (!this.invalid) return null;
    const errors = this.ngControl?.errors ?? {};
    const messages: Record<string, string> = {
      required: 'This field is required',
      email: 'Please enter a valid email',
      minlength: `Minimum length is ${errors['minlength']?.requiredLength}`,
      maxlength: `Maximum length is ${errors['maxlength']?.requiredLength}`,
      pattern: 'Invalid format',
    };
    return Object.entries(errors).map(([k]) => messages[k]).find(Boolean) ?? 'Invalid value';
  }

  get describedBy(): string {
    const ids: string[] = [];
    if (this.helperText()) ids.push(`${this.inputId}-helper`);
    if (this.errorMessage) ids.push(`${this.inputId}-error`);
    if (this.hint()) ids.push(`${this.inputId}-hint`);
    return ids.join(' ');
  }

  // Input event
  onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChangeFn(val);
    this.onTouchedFn();
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  // CVA impl
  writeValue(val: string): void {
    this.value.set(val ?? '');
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.bind(isDisabled);
  }

  // Host classes (Angular v20 host binding replacement)
  hostClasses() {
    return [
      'cds--form-item',
      `cds--text-input--${this.size()} cds--layout--size-${this.size()}`,
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  }
}
