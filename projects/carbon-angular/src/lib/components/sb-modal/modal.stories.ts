import { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal';

const meta: Meta<ModalComponent> = {
  title: 'Components/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    cancelLabel: { control: 'text' },
    confirmLabel: { control: 'text' },
    cancelDisabled: { control: 'boolean' },
    confirmDisabled: { control: 'boolean' },
    showFooter: { control: 'boolean' },
    showDefaultFooter: { control: 'boolean' },
    close: { action: 'close' },
    cancel: { action: 'cancel' },
    confirm: { action: 'confirm' },
  },
  args: {
    isOpen: true,
    title: 'Example Modal',
    size: 'md',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    cancelDisabled: false,
    confirmDisabled: false,
    showFooter: true,
    showDefaultFooter: true,
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [cancelLabel]="cancelLabel"
        [confirmLabel]="confirmLabel"
        [cancelDisabled]="cancelDisabled"
        [confirmDisabled]="confirmDisabled"
        [showFooter]="showFooter"
        [showDefaultFooter]="showDefaultFooter"
        (close)="close($event)"
        (cancel)="cancel($event)"
        (confirm)="confirm($event)"
      >
        <p>This is the body of the modal.</p>
        <p>You can project <strong>any content</strong> here.</p>
      </app-modal>
    `,
  }),
};

export const WithCustomFooter: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-modal
        [isOpen]="isOpen"
        [title]="title"
        [size]="size"
        [showFooter]="true"
        [showDefaultFooter]="false"
        (close)="close($event)"
        (cancel)="cancel($event)"
        (confirm)="confirm($event)"
      >
        <p>This is the modal body with custom footer.</p>

        <div footer>
          <button class="cds--btn cds--btn--secondary" (click)="cancel($event)">Custom Cancel</button>
          <button class="cds--btn cds--btn--primary" (click)="confirm($event)">Custom Confirm</button>
        </div>
      </app-modal>
    `,
  }),
};
