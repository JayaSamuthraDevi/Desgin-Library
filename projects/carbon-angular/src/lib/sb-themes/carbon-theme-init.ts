import { CarbonTheme } from './carbon-theme.service';

/**
 * Sets the initial theme on the HTML element.
 * Call this once in your consuming app or Storybook preview.
 */
export function initCarbonTheme(theme: CarbonTheme = 'white') {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-carbon-theme', theme);
  }
}
