import type { Meta, StoryObj } from '@storybook/angular';
import { SbIcon } from './sb-icon';
import { ICONS, IconName } from './icons';

const meta: Meta<SbIcon> = {
  title: 'Carbon/Icon',
  component: SbIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(ICONS) as IconName[],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 2, 3, 4], // presets + numbers
    },
    color: { control: 'color' },
    ariaLabel: { control: 'text' },
    decorative: { control: 'boolean' },
    svgClass: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SbIcon>;

export const Default: Story = {
  args: {
    name: 'add',
    size: 'md',
    color: 'currentColor',
    ariaLabel: 'Add',
  },
};

export const Sizes: Story = {
  render: () => ({
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
  render: () => ({
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

export const Decorative: Story = {
  args: {
    name: 'close',
    size: 'lg',
    decorative: true,
  },
};

export const WithCustomClass: Story = {
  args: {
    name: 'edit',
    svgClass: 'custom-class',
  },
};
