import { Meta, StoryObj } from '@storybook/angular';
import { PasswordInputComponent } from './password-input';

const meta: Meta<PasswordInputComponent> = {
  title: 'UI/Inputs/PasswordInput',
  component: PasswordInputComponent,
  argTypes: {
    _label: { control: 'text', name: 'Label' },
    _helperText: { control: 'text', name: 'Helper Text' },
    _placeholder: { control: 'text', name: 'Placeholder' },
    _invalidText: { control: 'text', name: 'Invalid Text' },
    _warnText: { control: 'text', name: 'Warn Text' },
    _invalid: { control: 'boolean', name: 'Invalid' },
    _warn: { control: 'boolean', name: 'Warning' },
    _disabled: { control: 'boolean', name: 'Disabled' },
    _fluid: { control: 'boolean', name: 'Fluid' },
    _skeleton: { control: 'boolean', name: 'Skeleton' },
    _size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      name: 'Size'
    }
  }

};
export default meta;

type Story = StoryObj<PasswordInputComponent>;

export const Default: Story = {
  args: { _label: 'Password', _helperText: 'Enter your password', _placeholder: '••••••••' }
};

export const Fluid: Story = {
  args: { _label: 'Password', _helperText: 'Enter your password', _placeholder: 'Type here...', _fluid: true }
};

export const Invalid: Story = {
  args: { _label: 'Password', _helperText: 'Required', _placeholder: 'Enter password...', _invalid: true, _invalidText: 'Password is required' }
};

export const Warning: Story = {
  args: { _label: 'Password', _helperText: 'Be careful', _placeholder: 'Enter password...', _warn: true, _warnText: 'Weak password' }
};

export const Disabled: Story = {
  args: { _label: 'Password', _helperText: 'Cannot edit', _placeholder: 'Disabled...', _disabled: true }
};
