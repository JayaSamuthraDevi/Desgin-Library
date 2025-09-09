import { applicationConfig, type Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { provideZonelessChangeDetection } from '@angular/core';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import {initCarbonTheme} from '../projects/carbon-angular/src/lib/sb-themes/carbon-theme-init';

setCompodocJson(docJson);

initCarbonTheme('white');

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: { autodocs: true },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideZonelessChangeDetection(), // zoneless mode
      ],
    }),
    withThemeByDataAttribute({
      themes: {
        White: 'white',
        G10: 'g10',
        G90: 'g90',
        G100: 'g100',
        Custom1: 'custom-1',
        Custom2: 'custom-2',
        Custom3: 'custom-3'
      },
      defaultTheme: 'White',
      attributeName: 'data-carbon-theme',
      parentSelector: 'html',
    }),
  ]
};

export default preview;
