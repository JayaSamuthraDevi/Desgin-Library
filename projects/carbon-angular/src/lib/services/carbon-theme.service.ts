import { Injectable } from '@angular/core';
import { initCarbonTheme } from '../sb-themes/carbon-theme-init';

export type CarbonTheme = 'white' | 'g10' | 'g90' | 'g100' | 'custom-1' | 'custom-2' | 'custom-3';

@Injectable({ providedIn: 'root' })
export class CarbonThemeService {
  private theme: CarbonTheme;

  constructor() {
    const saved = sessionStorage.getItem('carbon-theme') as CarbonTheme;
    this.theme = saved || 'white';
    initCarbonTheme(this.theme); // set global attribute immediately
  }

  setTheme(theme: CarbonTheme) {
    this.theme = theme;
    sessionStorage.setItem('carbon-theme', theme);
    initCarbonTheme(theme);
  }

  getTheme() {
    return this.theme;
  }
}

