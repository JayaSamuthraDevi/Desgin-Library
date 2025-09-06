import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HeaderComponent } from './sb-header';

const meta: Meta<HeaderComponent> = {
  title: 'Carbon/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [HeaderComponent],
    }),
  ],
  argTypes: {
    appName: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    appName: 'Carbon POC',
  },
};

export const CustomName: Story = {
  args: {
    appName: 'Customer Portal',
  },
};

export const ThemedHeaders: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div data-carbon-theme="default">
          <carbon-header [appName]="'Default Theme'"></carbon-header>
        </div>
        <div data-carbon-theme="light-rounded">
          <carbon-header [appName]="'Light Rounded Theme'"></carbon-header>
        </div>
        <div data-carbon-theme="fully-curved">
          <carbon-header [appName]="'Fully Curved Theme'"></carbon-header>
        </div>
      </div>
    `,
  }),
};
