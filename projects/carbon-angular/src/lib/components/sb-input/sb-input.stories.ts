import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputComponent } from './sb-input';
import { FormsModule } from '@angular/forms';

const meta: Meta<InputComponent> = {
  title: 'Carbon/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [InputComponent, FormsModule],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    value: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
  },
};

export const WithEmail: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const ThemedInputs: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div data-carbon-theme="default">
          <carbon-input label="Default Theme" placeholder="Enter value"></carbon-input>
        </div>
        <div data-carbon-theme="light-rounded">
          <carbon-input label="Light Rounded Theme" placeholder="Enter value"></carbon-input>
        </div>
        <div data-carbon-theme="fully-curved">
          <carbon-input label="Fully Curved Theme" placeholder="Enter value"></carbon-input>
        </div>
      </div>
    `,
  }),
};
