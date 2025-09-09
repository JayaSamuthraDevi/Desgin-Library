import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ColorThemeComponent } from './sb-color-theme';
import { SbInputComponent } from '../sb-input/sb-input';
import { SbButton } from '../sb-button/sb-button';
import { HeaderComponent } from '../sb-header/sb-header';

export default {
  title: 'Demo/ColorTheme',
  decorators: [
    moduleMetadata({
      imports: [ColorThemeComponent, HeaderComponent, SbInputComponent, SbButton],
    }),
  ],
} as Meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="padding: 2rem; font-family: sans-serif;">
        <!-- Theme picker -->
        <color-theme></color-theme>

        <!-- Header -->
        <sb-header appName="Carbon Themed App"></sb-header>

        <!-- Form -->
        <div style="margin-top: 1.5rem; max-width: 400px;">
          <sb-input label="Username" placeholder="Enter username"></sb-input>
          <sb-input label="Password" type="password" placeholder="Enter password"></sb-input>
        </div>

        <!-- Buttons -->
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
          <sb-button label="Primary" variant="primary"></sb-button>
          <sb-button label="Secondary" variant="secondary"></sb-button>
          <sb-button label="Tertiary" variant="tertiary"></sb-button>
          <sb-button label="Ghost" variant="ghost"></sb-button>
          <sb-button label="Danger" variant="danger"></sb-button>
          <sb-button label="Link" variant="link"></sb-button>
        </div>
      </div>
    `,
  }),
};
