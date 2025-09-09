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
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password'],
    },
    value: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<SbInputComponent>;

/** Default text input */
export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
  },
};

/** Email input */
export const WithEmail: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

/** Two-way binding demo */
export const WithTwoWayBinding: Story = {
  render: (args) => ({
    props: {
      ...args,
      username: '',
    },
    template: `
      <sb-input
        label="Username"
        placeholder="Enter your username"
        [(value)]="username">
      </sb-input>
      <p>You typed: {{ username }}</p>
    `,
  }),
};

/** Password toggle demo */
export const WithPasswordToggle: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

/** Reactive Forms demo (avoid NG0200 circular dependency) */
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
