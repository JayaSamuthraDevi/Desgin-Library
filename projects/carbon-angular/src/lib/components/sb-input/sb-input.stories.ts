import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SbInputComponent } from './sb-input';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SbIcon } from '../sb-icons/sb-icon';

const meta: Meta<SbInputComponent> = {
  title: 'Carbon/Input',
  component: SbInputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SbInputComponent, SbIcon, FormsModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
   label: { control: 'text' },
   value: { control: 'text' },
   type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    warn: { control: 'boolean' },
    warnText: { control: 'text' },
    helperText: { control: 'text' },
    fluid: { control: 'boolean' },
    skeleton: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SbInputComponent>;

//
// 📖 Stories
//

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <sb-input label="Small" size="sm" placeholder="Small input"></sb-input>
      <sb-input label="Medium" size="md" placeholder="Medium input"></sb-input>
      <sb-input label="Large" size="lg" placeholder="Large input"></sb-input>
    `,
  }),
};

export const WithPasswordToggle: Story = {
  args: {
    ...Default.args,
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

export const WithReactiveForms: Story = {
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }),
  ],
  render: () => {
    const fb = new FormBuilder();
    const form = fb.group({
      email: ['', { nonNullable: true, validators: [Validators.required, Validators.email] }],
    });
    return {
      props: { form },
      template: `
        <form [formGroup]="form" novalidate>
          <sb-input
            label="Email"
            placeholder="Enter your email"
            type="email"
            formControlName="email">
          </sb-input>
        </form>
        <p>Form value: {{ form.value | json }}</p>
        <p>Form valid: {{ form.valid }}</p>
      `,
    };
  },
};
