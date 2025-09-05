import type { Meta, StoryObj } from '@storybook/angular';
import { SbIcon } from './sb-icon';
import { IconName } from './icons';

const meta: Meta<SbIcon> = {
  title: 'Components/Icon',
  component: SbIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys((await import('./icons')).ICONS) as IconName[],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 2, 3, 4], // string presets + numeric
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<SbIcon>;

export const Default: Story = {
  args: {
    name: 'add' as IconName,
    size: 'md',
    color: 'currentColor',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <sb-icon name="add" size="sm"></sb-icon>
        <sb-icon name="add" size="md"></sb-icon>
        <sb-icon name="add" size="lg"></sb-icon>
        <sb-icon name="add" size="xl"></sb-icon>
        <sb-icon name="add" [size]="2"></sb-icon>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <sb-icon name="add" size="lg" color="red"></sb-icon>
        <sb-icon name="add" size="lg" color="green"></sb-icon>
        <sb-icon name="add" size="lg" color="blue"></sb-icon>
        <sb-icon name="add" size="lg" color="#ff9900"></sb-icon>
      </div>
    `,
  }),
};
