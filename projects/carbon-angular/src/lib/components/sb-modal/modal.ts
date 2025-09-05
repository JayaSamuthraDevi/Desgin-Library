import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { SbIcon } from '../sb-icons/sb-icon';
import { SbButton } from '../sb-button/sb-button';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrls: ['./modal.scss'],
  imports: [NgClass, SbIcon,SbButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.cds--modal]': 'true',
    '[class.is-visible]': 'isOpen()',
    'role': 'dialog',
    'aria-modal': 'true',
    '[attr.aria-labelledby]': 'modalTitleId',
    '[attr.aria-describedby]': 'modalContentId',
    '[tabindex]': '-1'
  }
})
export class ModalComponent {
  // Signals as Inputs
  isOpen = input(false);
  title = input('');
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  cancelLabel = input('Cancel');
  confirmLabel = input('Confirm');

  cancelDisabled = input(false);
  confirmDisabled = input(false);

  showFooter = input(true);
  showDefaultFooter = input(true);

  // Carbon-specific attributes
  closeButtonLabel = input('Close'); // aria-label for close
  preventCloseOnClickOutside = input(false);
  preventCloseOnEscape = input(false);
  danger = input(false); // adds cds--modal--danger styling
  passiveModal = input(false); // no footer buttons

  // Outputs
  close = output<void>();
  cancel = output<void>();
  confirm = output<void>();

  // Accessibility IDs
  readonly modalTitleId = `modal-title-${crypto.randomUUID()}`;
  readonly modalContentId = `modal-content-${crypto.randomUUID()}`;

  // ESC key support
  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOpen() && !this.preventCloseOnEscape()) {
      event.stopPropagation();
      this.closeModal();
    }
  }

  // Backdrop click support
  onBackdropClick(event: MouseEvent) {
    if (!this.preventCloseOnClickOutside() && (event.target as HTMLElement).classList.contains('cds--modal')) {
      this.closeModal();
    }
  }

  closeModal() {
    this.isOpen.bind(false); // update internal state
    this.close.emit();
  }
}
