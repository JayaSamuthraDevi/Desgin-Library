import { Meta, StoryObj } from '@storybook/angular';
import { TextInputComponent } from './text-input';

const meta: Meta<TextInputComponent> = {
  title: 'UI/Inputs/TextInput',
  component: TextInputComponent,
  argTypes: {
    _label: {
      control: 'text', name: 'Label'
    },
    _placeholder: { control: 'text', name: 'Placeholder' },
    _helperText: { control: 'text', name: 'Helper Text' },
    _size: { control: { type: 'select', options: ['sm', 'md', 'lg'] }, name: 'Size' },
    _fluid: { control: 'boolean', name: 'Fluid' },
    _lightTheme: { control: 'boolean', name: 'Light Theme' },
    _skeleton: { control: 'boolean', name: 'Skeleton' },
    _invalid: { control: 'boolean', name: 'Invalid' },
    _disabled: { control: 'boolean', name: 'Disabled' },
  },
};
export default meta;

type Story = StoryObj<TextInputComponent>;

// Default
export const Default: Story = {
  args: {
    _label: 'Name',
    _placeholder: 'John Doe',
    _helperText: 'Enter your full name',
    _size: 'md',
    _fluid: false,
    _lightTheme: false,
    _skeleton: false,
    _invalid: false,
    _disabled: false,
  },
};

// Fluid input
export const Fluid: Story = {
  args: {
    _label: 'Email',
    _placeholder: 'example@gmail.com',
    _helperText: 'Enter email address',
    _fluid: true,
  },
};

// Invalid state
export const Invalid: Story = {
  args: {
    _label: 'Password',
    _placeholder: '********',
    _helperText: 'Required',
    _invalid: true,
    _invalidText:'invalid input'
  },
};

// Skeleton state
export const Skeleton: Story = {
  args: {
    _label: 'Loading input',
    _skeleton: true,
  },
};

// Disabled input
export const Disabled: Story = {
  args: {
    _label: 'Username',
    _placeholder: 'John Doe',
    _helperText: 'Cannot edit',
    _disabled: true,
  },
};
