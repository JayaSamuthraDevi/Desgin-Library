import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'carbon-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      [attr.aria-busy]="loading || null"
      [disabled]="disabled || loading"
      [class]="classes">
      {{ label }}
    </button>
  `,
})
export class CdsButton {
  @Input() label = '';
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'link' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;

  get classes(): string {
    const variantMap: Record<string, string> = {
      primary: 'cds--btn--primary',
      secondary: 'cds--btn--secondary',
      tertiary: 'cds--btn--tertiary',
      ghost: 'cds--btn--ghost',
      danger: 'cds--btn--danger',
      link: 'cds--btn--link',
    };
    const sizeMap: Record<string, string> = {
      sm: 'cds--btn--sm',
      md: 'cds--btn--md',
      lg: 'cds--btn--lg',
    };

    return [
      'cds--btn',
      variantMap[this.variant],
      sizeMap[this.size],
      this.loading ? 'cds--btn--loading' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
