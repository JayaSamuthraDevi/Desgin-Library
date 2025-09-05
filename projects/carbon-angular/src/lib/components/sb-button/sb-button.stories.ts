import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { SbButton } from './sb-button';
import { SbIcon } from '../sb-icons/sb-icon';
import { ICONS, IconName } from '../sb-icons/icons';

const meta: Meta<SbButton> = {
  title: 'Carbon/Button',
  component: SbButton,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SbButton, SbIcon],
    }),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    iconName: {
      control: { type: 'select' },
      options: Object.keys(ICONS) as IconName[],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['right', 'left']
    },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    expressive: { control: 'boolean' },
    width: {
      control: { type: 'select' },
      options: ['full', 'auto'],
    },
  },
};
export default meta;

type Story = StoryObj<SbButton>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Add Item',
    variant: 'primary',
    iconName: 'add',
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    variant: 'primary',
    iconName: 'add',
  },
};

export const IconPosition: Story = {
  args: {
    label: 'Add Item',
    variant: 'primary',
    iconName: 'add',
    iconPosition: 'left'
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    variant: 'primary',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 1rem;">
        <sb-button label="Small" size="sm" variant="primary"></sb-button>
        <sb-button label="Medium" size="md" variant="primary"></sb-button>
        <sb-button label="Large" size="lg" variant="primary"></sb-button>
      </div>
    `,
  }),
};

export const CenteredText: Story = {
  args: {
    label: "custom-btn",
    className: 'sb--btn'
  }
}

export const ThemedButtons: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 1rem;">
      <div data-carbon-theme="white">
          <sb-button label="Carbon Default" variant="primary"></sb-button>
        </div>
        <div data-carbon-theme="custom-1">
          <sb-button label="Fully Curved" variant="primary"></sb-button>
        </div>
        <div data-carbon-theme="custom-2">
          <sb-button label="Light Curves" variant="primary"></sb-button>
        </div>
        <div data-carbon-theme="custom-3">
          <sb-button label="Text Centered with Light Curved" variant="primary"></sb-button>
        </div>
      </div>
    `,
  }),
};
