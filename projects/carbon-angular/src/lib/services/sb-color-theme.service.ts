// color-theme.service.ts
import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ColorThemeService {
  primaryColor = signal('#0f62fe');   // interactive-01
  secondaryColor = signal('#24a148'); // support-01
  baseTheme = signal<'g10' | 'g90' | 'g100'>('g10');

  constructor() {
    effect(() => this.applyTheme());
  }

  updatePrimary(hex: string) { this.primaryColor.set(hex); }
  updateSecondary(hex: string) { this.secondaryColor.set(hex); }
  setBaseTheme(theme: 'g10' | 'g90' | 'g100') { this.baseTheme.set(theme); }

  resetOverrides() {
    // Removes inline CSS properties we set (restore to Carbon defaults)
    const host = this.getThemeHost();
    const keys = [
      '--cds-interactive-01', '--cds-interactive-02', '--cds-interactive-03', '--cds-interactive-04',
      '--cds-support-01', '--cds-support-02', '--cds-support-03', '--cds-support-04',
      '--cds-ui-background', '--cds-ui-01', '--cds-ui-02', '--cds-ui-03', '--cds-ui-04', '--cds-ui-05',
      '--cds-text-primary', '--cds-text-secondary', '--cds-text-placeholder', '--cds-text-on-color',
      '--cds-link-01', '--cds-border-subtle-00', '--cds-border-subtle-01', '--cds-border-subtle-02',
      '--cds-border-strong-01', '--cds-focus', '--cds-highlight', '--cds-overlay'
    ];
    keys.forEach(k => host.style.removeProperty(k));
  }

  private applyTheme() {
    const primary = this.primaryColor();
    const secondary = this.secondaryColor();
    const theme = this.baseTheme();

    // Ensure the correct base theme attribute (so Carbon base CSS variables still exist)
    document.documentElement.setAttribute('data-carbon-theme', theme);

    // pick the element to set inline styles on (prefer the themed element if present)
    const host = this.getThemeHost();

    const background = this.getCssValue('--cds-ui-background', host)
      || (theme === 'g10' ? '#ffffff' : theme === 'g90' ? '#161616' : '#0b0b0b');

    // Text on background
    const primaryText = this.contrastText(background);

    // Text on primary (buttons etc.)
    const onPrimaryText = this.contrastText(primary, background);

    const map: Record<string, string> = {
      // Interactive tokens
      '--cds-interactive-01': primary,
      '--cds-interactive-02': this.shade(primary, 18),
      '--cds-interactive-03': this.shade(primary, -18),
      '--cds-interactive-04': this.shade(primary, 40),

      // Support tokens
      '--cds-support-01': secondary,
      '--cds-support-02': this.shade(secondary, 18),
      '--cds-support-03': this.shade(secondary, -18),
      '--cds-support-04': '#da1e28',

      // UI tokens
      '--cds-ui-background': background,
      '--cds-ui-01': this.shade(primary, 95),
      '--cds-ui-02': this.shade(primary, 90),
      '--cds-ui-03': this.shade(primary, 80),
      '--cds-ui-04': this.shade(primary, 70),
      '--cds-ui-05': this.shade(primary, 60),

      // Link
      '--cds-link-01': primary,

      // Borders
      '--cds-border-subtle-00': this.shade(primary, 95),
      '--cds-border-subtle-01': this.shade(primary, 80),
      '--cds-border-subtle-02': this.shade(primary, 70),
      '--cds-border-strong-01': this.shade(primary, -30),

      // Misc
      '--cds-focus': this.shade(primary, -10),
      '--cds-highlight': this.shade(primary, 85),
      '--cds-overlay': 'rgba(0,0,0,0.5)',

      // Primary button
      '--cds-button-primary': primary,
      '--cds-button-primary-hover': this.accessibleShade(primary, -15, background),
      '--cds-button-primary-active': this.accessibleShade(primary, -25, background),

      // Secondary button
      '--cds-button-secondary': secondary,
      '--cds-button-secondary-hover': this.accessibleShade(secondary, -10, background),
      '--cds-button-secondary-active': this.accessibleShade(secondary, -20, background),

      // Danger button (keeping Carbon’s baseline red but still adaptive)
      '--cds-button-danger-primary': '#da1e28',
      '--cds-button-danger-hover': this.accessibleShade('#da1e28', -15, background),
      '--cds-button-danger-active': this.accessibleShade('#da1e28', -25, background),

      // Text tokens
      '--cds-text-primary': primaryText,
      '--cds-text-secondary': this.shade(primaryText, -35),
      '--cds-text-placeholder': this.shade(primaryText, -55),
      '--cds-text-on-color': onPrimaryText,

    };
    // Apply all overrides inline on the host element (inline styles trump stylesheet declarations)
    Object.entries(map).forEach(([k, v]) => {
      if (v != null) host.style.setProperty(k, v);
    });
  }

  // Helper: choose the element to attach overrides to
  private getThemeHost(): HTMLElement {
    // Prefer the actual themed element (if Carbon attaches theme to some element)
    const byAttr = document.querySelector('[data-carbon-theme]') as HTMLElement | null;
    return byAttr || document.documentElement;
  }

  // Basic hex shade toward white (positive %) or black (negative %)
  private shade(hex: string, percent: number) {
    const f = parseInt(hex.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = Math.abs(percent) / 100,
      R = f >> 16,
      G = (f >> 8) & 0x00FF,
      B = f & 0x0000FF;
    return "#" + (0x1000000 +
      (Math.round((t - R) * p) + R) * 0x10000 +
      (Math.round((t - G) * p) + G) * 0x100 +
      (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }

  // Contrast chooser with WCAG ratio check
  private contrastText(hex: string, bg: string = '#ffffff') {
    const { r: r1, g: g1, b: b1 } = this.hexToRgb(hex);
    const { r: r2, g: g2, b: b2 } = this.hexToRgb(bg);

    const luminance = (r: number, g: number, b: number) => {
      const srgb = (c: number) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
    };

    const L1 = luminance(r1, g1, b1);
    const L2 = luminance(r2, g2, b2);

    const contrast = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

    // Return whichever gives better contrast against bg
    const whiteContrast = this.getContrastRatio('#ffffff', hex);
    const blackContrast = this.getContrastRatio('#161616', hex);

    return whiteContrast >= blackContrast ? '#ffffff' : '#161616';
  }

  // Utility for ratio
  private getContrastRatio(fg: string, bg: string) {
    const { r: r1, g: g1, b: b1 } = this.hexToRgb(fg);
    const { r: r2, g: g2, b: b2 } = this.hexToRgb(bg);

    const luminance = (r: number, g: number, b: number) => {
      const srgb = (c: number) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
    };

    const L1 = luminance(r1, g1, b1);
    const L2 = luminance(r2, g2, b2);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }

  private accessibleShade(hex: string, percent: number, bg: string = '#ffffff') {
    const shaded = this.shade(hex, percent);
    const contrastWhite = this.getContrastRatio('#ffffff', shaded);
    const contrastBlack = this.getContrastRatio('#161616', shaded);

    // Guarantee at least 4.5 contrast
    if (contrastWhite >= 4.5) return shaded;
    if (contrastBlack >= 4.5) return shaded;

    // If not enough contrast, fallback to slightly more intense shade
    return this.shade(hex, percent < 0 ? percent - 10 : percent + 10);
  }


  private hexToRgb(hex: string) {
    const v = parseInt(hex.slice(1), 16);
    return { r: v >> 16, g: (v >> 8) & 255, b: v & 255 };
  }

  private getCssValue(varName: string, host: HTMLElement) {
    try {
      return getComputedStyle(host).getPropertyValue(varName)?.trim() || '';
    } catch {
      return '';
    }
  }
}


export interface ThemeOverrides {
  interactive?: Partial<Record<'01' | '02' | '03' | '04', string>>;
  support?: Partial<Record<'01' | '02' | '03' | '04', string>>;
  ui?: Partial<Record<'01' | '02' | '03' | '04' | '05' | 'background', string>>;
  text?: Partial<Record<'primary' | 'secondary' | 'placeholder' | 'onColor', string>>;
  button?: Partial<Record<'primary' | 'primaryHover' | 'primaryActive' | 'secondary' | 'secondaryHover' | 'secondaryActive' | 'danger' | 'dangerHover' | 'dangerActive', string>>;
  border?: Partial<Record<'subtle00' | 'subtle01' | 'subtle02' | 'strong01', string>>;
  misc?: Partial<Record<'focus' | 'highlight' | 'overlay', string>>;
}

export interface Theme {
  name: string;
  base: 'g10' | 'g90' | 'g100';
  overrides?: ThemeOverrides;
}
