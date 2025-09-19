import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { SbIcon } from './sb-icon';

@Component({
  template: `
    <sb-icon
      [name]="iconName"
      [size]="iconSize"
      [color]="iconColor"
      [ariaLabel]="iconAriaLabel"
      [svgClass]="iconSvgClass"
      [decorative]="isDecorative"
      [class]="hostClass"
    ></sb-icon>
  `,
  standalone: true,
  imports: [SbIcon, CommonModule],
})
class TestHostComponent {
  iconName = 'add';
  iconSize: any = 'md';
  iconColor: string = 'currentColor';
  iconAriaLabel: string | null = null;
  iconSvgClass: string | null = null;
  hostClass: string | null = null;
  isDecorative = false;
}

describe('SbIcon', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  function detectChanges() {
    fixture.detectChanges();
  }

  it('renders an svg for a valid icon', () => {
    host.iconName = 'add';
    detectChanges();
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg).toBeTruthy();
    expect(svg.nativeElement.innerHTML).toContain('<path');
  });

  it('applies size and color styles', () => {
    host.iconName = 'add';
    host.iconSize = 'md';
    host.iconColor = 'red';
    detectChanges();
    const svg = fixture.debugElement.query(By.css('svg')).nativeElement;
    expect(svg.style.width).toBe('1.25rem');
    expect(svg.style.height).toBe('1.25rem');
    expect(svg.style.fill).toBe('red');
  });

  it('falls back to icon name as aria-label when none provided', () => {
    host.iconName = 'close';
    host.iconAriaLabel = null;
    detectChanges();
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg.attributes['aria-label']).toBe('Close'); // humanized name
    expect(svg.attributes['role']).toBe('img');
  });

  it('sets aria-label explicitly when provided', () => {
    host.iconAriaLabel = 'Custom label';
    detectChanges();
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg.attributes['aria-label']).toBe('Custom label');
    expect(svg.attributes['role']).toBe('img');
  });

  it('hides decorative icons from assistive tech', () => {
    host.isDecorative = true;
    detectChanges();
    const svg = fixture.debugElement.query(By.css('svg'));
    expect(svg.attributes['aria-hidden']).toBe('true');
    expect(svg.attributes['aria-label']).toBeUndefined();
  });

  it('applies custom svgClass alongside default class', () => {
    host.iconSvgClass = 'my-custom-class';
    detectChanges();
    const svg = fixture.debugElement.query(By.css('svg'));
    const classAttr = svg.attributes['class'] || svg.nativeElement.getAttribute('class');
    expect(classAttr).toContain('cds--btn__icon');
    expect(classAttr).toContain('my-custom-class');
  });

  it('applies host class for styling', () => {
    host.hostClass = 'host-class';
    detectChanges();
    const hostEl = fixture.debugElement.nativeElement.querySelector('sb-icon');
    expect(hostEl.classList).toContain('host-class');
  });

  it('logs a warning when icon is not found', () => {
    spyOn(console, 'warn');
    host.iconName = 'invalid' as any;
    detectChanges();
    expect(console.warn).toHaveBeenCalledWith('[SbIcon] Icon "invalid" not found in ICONS.');
  });
});
