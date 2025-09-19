import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SbInputComponent } from './sb-input';
import { SbIcon } from '../sb-icons/sb-icon';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SbInputComponent', () => {
  let component: SbInputComponent;
  let fixture: ComponentFixture<SbInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbInputComponent, FormsModule, SbIcon],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SbInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Carbon input with default classes', () => {
    const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl).toBeTruthy();
    expect(inputEl.classList).toContain('cds--text-input');
    expect(inputEl.type).toBe('text');
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Username');
    fixture.detectChanges();
    const labelEl: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelEl.textContent).toContain('Username');
    expect(labelEl.classList).toContain('cds--label');
  });

  it('should render helper, hint, and error messages', () => {
    fixture.componentRef.setInput('helperText', 'Help!');
    fixture.componentRef.setInput('hint', 'Hint!');
    (component as any).ngControl = { invalid: true, touched: true, errors: { required: true } } as any;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.cds--form__helper-text')).nativeElement.textContent).toContain('Help!');
    expect(fixture.debugElement.query(By.css('.cds--form__hint-text')).nativeElement.textContent).toContain('Hint!');
    expect(fixture.debugElement.query(By.css('.cds--form-requirement')).nativeElement.textContent).toContain('This field is required');
  });

  it('should bind value via two-way binding', () => {
    component.value.set('Hello');
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.value).toBe('Hello');
    inputEl.value = 'World';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.value()).toBe('World');
  });

  it('should toggle password visibility with SbIcon', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.type).toBe('password');
    const toggleBtn = fixture.debugElement.query(By.css('.cds--text-input__visibility')).nativeElement;
    toggleBtn.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input')).nativeElement.type).toBe('text');
    toggleBtn.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input')).nativeElement.type).toBe('password');
  });

  it('should render left and right icons', () => {
    fixture.componentRef.setInput('iconName', 'search');
    fixture.componentRef.setInput('iconRightName', 'close');
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.cds--text-input__icon--left'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.cds--text-input__icon--right'))).toBeTruthy();
  });

  it('should support disabled and readonly states', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.disabled).toBeTrue();
    expect(inputEl.readOnly).toBeTrue();
  });

  it('should compute effectiveType correctly', () => {
    fixture.componentRef.setInput('type', 'password');
    component.showPassword.set(false);
    fixture.detectChanges();
    expect(component.effectiveType()).toBe('password');
    component.showPassword.set(true);
    fixture.detectChanges();
    expect(component.effectiveType()).toBe('text');
  });

  it('should set ARIA attributes correctly', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('helperText', 'Helper');
    fixture.componentRef.setInput('hint', 'Hint');
    (component as any).ngControl = { invalid: true, touched: true, errors: { required: true } } as any;
    fixture.detectChanges();
    const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.getAttribute('aria-required')).toBe('false'); // required() default false
    expect(inputEl.getAttribute('aria-invalid')).toBe('true');
    expect(inputEl.getAttribute('aria-describedby')).toContain('sb-input-helper');
    expect(inputEl.getAttribute('aria-describedby')).toContain('sb-input-hint');
    expect(inputEl.getAttribute('aria-describedby')).toContain('sb-input-error');
  });
});
