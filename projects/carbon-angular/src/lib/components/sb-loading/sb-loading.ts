import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'sb-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="cds--loading"
      role="status"
      aria-live="assertive"
      aria-atomic="true"
      [attr.aria-label]="label()"
      [ngClass]="{ 'cds--loading--small': size() === 'sm' }"
    >
      <svg
        class="cds--loading__svg"
        viewBox="0 0 100 100"
        [style.width.em]="resolvedSize()"
        [style.height.em]="resolvedSize()"
      >
        <title>{{ label() }}</title>
        <circle class="cds--loading__stroke" cx="50%" cy="50%" r="44"></circle>
      </svg>
    </div>
  `,
})
export class SbLoading {
  // Accessibility label
  label = input<string>('Loading');

  // Preset sizes
  size = input<'sm' | 'md'>('sm');

  // Map sizes to em values
  private sizeMap: Record<'sm' | 'md', number> = {
    sm: 1, 
    md: 2, 
  };

  resolvedSize() {
    return this.sizeMap[this.size()];
  }
}
