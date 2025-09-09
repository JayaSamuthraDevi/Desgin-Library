import { Component, signal, WritableSignal, Input, forwardRef, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-text-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-area.html',
  // styleUrls: ['./text-area.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaComponent),
    multi: true
  }]
})
export class TextAreaComponent implements ControlValueAccessor {
  /** Signals */
  value: WritableSignal<string> = signal('');
  label: WritableSignal<string> = signal('');
  helperText: WritableSignal<string> = signal('');
  placeholder: WritableSignal<string> = signal('');
  invalid: WritableSignal<boolean> = signal(false);
  warn: WritableSignal<boolean> = signal(false);
  disabled: WritableSignal<boolean> = signal(false);
  fluid: WritableSignal<boolean> = signal(false);
  lightTheme: WritableSignal<boolean> = signal(false);
  skeleton: WritableSignal<boolean> = signal(false);
  size: WritableSignal<'sm' | 'md' | 'lg'> = signal('md');

  /** Inputs */
  @Input() set _label(val: string) { this.label.set(val); }
  @Input() set _helperText(val: string) { this.helperText.set(val); }
  @Input() set _placeholder(val: string) { this.placeholder.set(val); }
  @Input() set _invalid(val: boolean) { this.invalid.set(val); }
  @Input() set _warn(val: boolean) { this.warn.set(val); }
  @Input() set _disabled(val: boolean) { this.disabled.set(val); }
  @Input() set _fluid(val: boolean) { this.fluid.set(val); }
  @Input() set _lightTheme(val: boolean) { this.lightTheme.set(val); }
  @Input() set _skeleton(val: boolean) { this.skeleton.set(val); }
  @Input() set _size(val: 'sm' | 'md' | 'lg') { this.size.set(val); }

  /** ControlValueAccessor */
  private onChange = (_: any) => { };
  private onTouched = () => { };

  setValue(val: string) {
    if (!this.disabled()) {
      this.value.set(val);
      this.onChange(val);
    }
  }

  markAsTouched() { this.onTouched(); }

  writeValue(obj: any) { this.value.set(obj ?? ''); }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }

  /** Host bindings for Carbon classes */
  @HostBinding('class.cds--form-item') hostFormItem = true;
  @HostBinding('class.cds--text-area-wrapper') hostWrapper = true;
  @HostBinding('class.cds--text-area--fluid') get fluidClass() { return this.fluid() && !this.skeleton(); }
  @HostBinding('class.cds--text-area--fluid__skeleton') get fluidSkeletonClass() { return this.fluid() && this.skeleton(); }
  @HostBinding('class.cds--text-area--light') get lightClass() { return this.lightTheme(); }
  @HostBinding('class.cds--text-area--disabled') get disabledClass() { return this.disabled(); }
}
