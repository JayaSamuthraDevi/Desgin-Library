import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/angular',
    options: {
      disableWebpackDefaults: true,
      enableNgOnInitSideEffects: true,
    },
  },
  stories: [
    '../projects/carbon-angular/src/lib/**/*.stories.@(ts|tsx|js|jsx|mjs|cjs|mdx)',
  ],
  addons: ['@storybook/addon-docs'],
};

export default config;
