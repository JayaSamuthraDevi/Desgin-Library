import { CommonModule } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS, IconName } from './icons';

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | number;

@Component({
  selector: 'sb-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="cds--btn__icon"
      [style.width.em]="resolvedSize()"
      [style.height.em]="resolvedSize()"
      [style.fill]="color()"
      viewBox="0 0 32 32"
      [innerHTML]="svg()">
    </svg>
  `,
})
export class SbIcon {
  constructor(private sanitizer: DomSanitizer) { }

  name = input.required<IconName>();
  size = input<IconSize>('md');
  color = input<string>('currentColor');

  private readonly sizeMap = {
    sm: 1,
    md: 1.25,
    lg: 1.5,
    xl: 1.9,
  };

  resolvedSize = computed(() => {
    const val = this.size();
    return typeof val === 'number' ? val : this.sizeMap[val];
  });

  svg = computed<SafeHtml>(() =>

    this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()] ?? '')
  );
}
