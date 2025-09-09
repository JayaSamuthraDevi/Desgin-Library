import { Meta, StoryFn } from '@storybook/angular';
import { ColorThemeComponent } from './sb-color-theme';

export default {
  title: 'Components/ColorTheme',
  component: ColorThemeComponent,
  parameters: { layout: 'centered' },
} as Meta;

const Template: StoryFn<ColorThemeComponent> = (args) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
