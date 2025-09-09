import { Meta, StoryObj } from '@storybook/angular';
import { LabelComponent } from './label';

const meta: Meta<LabelComponent> = {
  title: 'UI/Labels/Label',
  component: LabelComponent,
  argTypes: {
    label: { control: 'text' },
    helperText: { control: 'text' },
    invalid: { control: 'boolean' },
    // skeleton: { control: 'boolean' }
  }
};
export default meta;

type Story = StoryObj<LabelComponent>;

export const Default: Story = { args: { _label: 'First Name', _helperText: 'Enter first name' } };
export const Invalid: Story = { args: { _label: 'Last Name', _helperText: 'Required', _invalid: true } };
