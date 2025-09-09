import { Meta, StoryObj } from '@storybook/angular';
import { TextAreaComponent } from './text-area';

const meta: Meta<TextAreaComponent> = {
  title: 'UI/Inputs/TextArea',
  component: TextAreaComponent,
  argTypes: {
    _label: { control: 'text' },
    _helperText: { control: 'text' },
    _placeholder: { control: 'text' },
    _invalid: { control: 'boolean' },
    _warn: { control: 'boolean' },
    _disabled: { control: 'boolean' },
    _fluid: { control: 'boolean' },
    _skeleton: { control: 'boolean' },
    _size: { control: { type: 'select', options: ['sm', 'md', 'lg'] } }
  }
};
export default meta;

type Story = StoryObj<TextAreaComponent>;

export const Default: Story = {
  args: { _label: 'Description', _helperText: 'Enter your description', _placeholder: 'Type here...', _fluid: false, _invalid: false }
};

export const Fluid: Story = {
  args: { _label: 'Comments', _helperText: 'Write your comments', _placeholder: 'Type your comment...', _fluid: true }
};

export const Invalid: Story = {
  args: {
    _label: 'Notes', _helperText: 'Required', _placeholder: 'Enter notes...', _invalid: true
  }
};

export const Disabled: Story = {
  args: { _label: 'Disabled Area', _helperText: 'Cannot edit', _placeholder: 'Disabled...', _disabled: true }
};
