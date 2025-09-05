// src/lib/components/theme-switcher/theme-switcher.component.ts
import { Component } from '@angular/core';
import { CarbonThemeService, CarbonTheme } from '../../sb-themes/carbon-theme.service';

@Component({
  selector: 'theme-switcher',
  template: `
    <select [value]="currentTheme" (change)="changeTheme($event.target.value)">
      <option *ngFor="let t of themes" [value]="t">{{ t }}</option>
    </select>
  `,
})
export class ThemeSwitcherComponent {
  themes: CarbonTheme[] = ['white', 'g10', 'g90', 'g100', 'custom-1' ,'custom-2'];
  currentTheme: CarbonTheme;

  constructor(private themeService: CarbonThemeService) {
    this.currentTheme = this.themeService.getTheme();
  }

  changeTheme(theme: CarbonTheme) {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
  }
}
