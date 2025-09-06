import { Component, EventEmitter, Input as NgInput, Output, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'carbon-input',
  templateUrl: './sb-input.html',
  styleUrls: ['./sb-input.scss'],
  standalone: true,
})
export class InputComponent {
  @NgInput()
  set label(value: string | WritableSignal<string>) {
    this._label.set(typeof value === 'string' ? value : value());
  }
  get label() { return this._label; }
  private _label: WritableSignal<string> = signal('');

  @NgInput()
  set placeholder(value: string | WritableSignal<string>) {
    this._placeholder.set(typeof value === 'string' ? value : value());
  }
  get placeholder() { return this._placeholder; }
  private _placeholder: WritableSignal<string> = signal('');

  @NgInput()
  set type(value: string | WritableSignal<string>) {
    this._type.set(typeof value === 'string' ? value : value());
  }
  get type() { return this._type; }
  private _type: WritableSignal<string> = signal('text');

  @NgInput()
  set value(value: string | WritableSignal<string>) {
    this._value.set(typeof value === 'string' ? value : value());
  }
  get value() { return this._value; }
  private _value: WritableSignal<string> = signal('');

  @Output() valueChange = new EventEmitter<string>();

  onChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this._value.set(val);
    this.valueChange.emit(val);
  }
}
