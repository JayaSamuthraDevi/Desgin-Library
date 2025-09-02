import { Meta, StoryObj } from '@storybook/angular';
import { CdsButton } from './button';

const meta: Meta<CdsButton> = {
  title: 'Components/Button',
  component: CdsButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
};

export default meta;

type Story = StoryObj<CdsButton>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', label: 'Primary' },
};
export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', label: 'Secondary' },
};
export const Tertiary: Story = {
  args: { variant: 'tertiary', size: 'md', label: 'Tertiary' },
};
export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', label: 'Ghost' },
};
export const Danger: Story = {
  args: { variant: 'danger', size: 'md', label: 'Danger' },
};
export const Link: Story = {
  args: { variant: 'link', size: 'md', label: 'Link' },
};
export const Loading: Story = {
  args: { variant: 'primary', loading: true, label: 'Loading…' },
};
