// src/lib/components/theme-switcher/theme-switcher.component.ts
import { Component } from '@angular/core';
import { CarbonThemeService, CarbonTheme } from '../../services/carbon-theme.service';

// theme-switcher.component.ts
@Component({
  selector: 'theme-switcher',
  template: `
    <select [value]="currentTheme" (change)="changeTheme($event)">
      <option *ngFor="let t of themes" [value]="t">{{ t }}</option>
    </select>
  `,
})
export class ThemeSwitcherComponent {
  themes: CarbonTheme[] = ['white', 'g10', 'g90', 'g100', 'custom-1', 'custom-2', 'custom-3'];
  currentTheme: CarbonTheme;

  constructor(private themeService: CarbonThemeService) {
    this.currentTheme = this.themeService.getTheme();
  }

  changeTheme(event: Event) {
    const select = event.target as HTMLSelectElement; // cast to HTMLSelectElement
    if (!select) return;
    const theme = select.value as CarbonTheme;
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
  }
}

