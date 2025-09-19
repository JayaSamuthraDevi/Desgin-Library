import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS, IconName } from './icons';

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | number;

@Component({
  selector: 'sb-icon',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      *ngIf="svg()"
      xmlns="http://www.w3.org/2000/svg"
      [attr.class]="className()"
      [attr.viewBox]="viewBox()"
      [style.width.rem]="sizeInRem()"
      [style.height.rem]="sizeInRem()"
      [style.fill]="color()"
      [innerHTML]="svg()"
      [attr.aria-label]="isDecorative() ? null : effectiveAriaLabel()"
      [attr.aria-hidden]="isDecorative() ? 'true' : null"
      role="img"
      focusable="false"
    ></svg>
  `,
})
export class SbIcon {
  constructor(private sanitizer: DomSanitizer) {}

  // Required input
  readonly name = input.required<IconName>();

  // Optional inputs
  readonly size = input<IconSize>('md');
  readonly color = input<string>('currentColor');
  readonly ariaLabel = input<string | null>(null);
  readonly decorative = input<boolean>(false); // defaults to false

  /** class applied to the inner <svg> element */
  readonly svgClass = input<string | null>(null);

  private readonly sizeMap: Record<Exclude<IconSize, number>, number> = {
    sm: 1,
    md: 1.25,
    lg: 1.5,
    xl: 1.9,
  };

  // Computed size in rem
  readonly sizeInRem = computed(() => {
    const val = this.size();
    return typeof val === 'number' ? val : this.sizeMap[val] ?? this.sizeMap['md'];
  });

  // Computed viewBox (fallback if name is invalid)
  readonly viewBox = computed(() => {
    const iconDef = ICONS[this.name()];
    return iconDef?.viewBox ?? '0 0 16 16';
  });

  // Computed class string
  readonly className = computed(() => {
    const extra = this.svgClass();
    return ['cds--btn__icon', extra].filter(Boolean).join(' ');
  });

  // Human-friendly aria-label fallback
  readonly effectiveAriaLabel = computed(() => {
    if (this.ariaLabel()) return this.ariaLabel();
    return this.name()
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase()); // "arrow_left" → "Arrow Left"
  });

  readonly isDecorative = computed(() => this.decorative());

  // Sanitized SVG
  readonly svg = computed<SafeHtml | null>(() => {
    const iconDef = ICONS[this.name()];
    if (!iconDef) {
      console.warn(`[SbIcon] Icon "${this.name()}" not found in ICONS.`);
      return null;
    }
    return this.sanitizer.bypassSecurityTrustHtml(iconDef.svg);
  });
}
