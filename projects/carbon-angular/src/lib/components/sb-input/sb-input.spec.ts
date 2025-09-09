import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SbInputComponent } from './sb-input';
import { SbIcon } from '../sb-icons/sb-icon';

describe('SbInputComponent', () => {
  let component: SbInputComponent;
  let fixture: ComponentFixture<SbInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbInputComponent, FormsModule, SbIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(SbInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Carbon input with default classes', () => {
    const inputEl: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;

    expect(inputEl).toBeTruthy();
    expect(inputEl.classList).toContain('cds--text-input');
    expect(inputEl.type).toBe('text'); // default type
  });

  it('should render label when provided', () => {
    fixture.componentRef.setInput('label', 'Username');
    fixture.detectChanges();

    const labelEl: HTMLLabelElement = fixture.debugElement.query(
      By.css('label')
    ).nativeElement;

    expect(labelEl.textContent).toContain('Username');
    expect(labelEl.classList).toContain('cds--label');
  });

  it('should bind value via two-way binding', () => {
    // Set value programmatically
    component.value.set('Hello');
    fixture.detectChanges();

    const inputEl: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    expect(inputEl.value).toBe('Hello');

    // Update via input event
    inputEl.value = 'World';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value()).toBe('World');
  });

  it('should toggle password visibility with SbIcon', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    const inputEl: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    expect(inputEl.type).toBe('password');

    const toggleBtn = fixture.debugElement.query(
      By.css('.cds--text-input__visibility')
    ).nativeElement;

    // First toggle: show password
    toggleBtn.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input')).nativeElement.type).toBe('text');

    // Second toggle: hide password
    toggleBtn.click();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input')).nativeElement.type).toBe('password');
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
});
