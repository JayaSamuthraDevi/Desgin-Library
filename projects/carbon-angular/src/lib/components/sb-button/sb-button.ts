import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { SbIcon } from '../sb-icons/sb-icon';
import { IconName } from '../sb-icons/icons';

@Component({
  selector: 'sb-button',
  standalone: true,
  imports: [CommonModule, SbIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'sb-button.html',
  styleUrls: ['sb-button.scss'],
  host: {
    'role': 'button',
    '[class.disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled()'
  }
})
export class SbButton {
  label = input('');
  variant = input<'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'link'>('primary');
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  width = input<'full' | 'auto'>('full');
  disabled = input(false);
  expressive = input(false);
  className = input('');

  // Accessibility
  ariaLabel = input<string | undefined>(undefined);
  ariaExpanded = input<boolean | undefined>(undefined);

  // Icons
  iconName = input<IconName | undefined>();
  iconOnly = input(false);
  iconPosition = input<'left' | 'right' | ''>('');

  // computed signals for classes
  classes = computed(() => {
    const variantMap: Record<string, string> = {
      primary: 'cds--btn--primary',
      secondary: 'cds--btn--secondary',
      tertiary: 'cds--btn--tertiary',
      ghost: 'cds--btn--ghost',
      danger: 'cds--btn--danger',
      link: 'cds--btn--link',
    };

    const sizeMap: Record<string, string> = {
      xs: 'cds--btn--xs cds--layout--size-xs',
      sm: 'cds--btn--sm cds--layout--size-sm',
      md: 'cds--btn--md cds--layout--size-md',
      lg: 'cds--btn--lg cds--layout--size-lg',
      xl: 'cds--btn--xl cds--layout--size-xl',
    };

    return [
      'cds--btn sb--btn',
      variantMap[this.variant()],
      sizeMap[this.size()],
      this.expressive() ? 'cds--btn--expressive' : '',
      this.iconOnly() ? 'cds--btn--icon-only' : '',
      this.iconPosition() === 'left' ? 'sb--btn--icon-left' : '',
      this.className(),
    ].filter(Boolean).join(' ');
  });
}
