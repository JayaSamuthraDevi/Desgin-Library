import { Component } from '@angular/core';
import { ColorThemeService } from '../../services/sb-color-theme.service';

@Component({
  selector: 'color-theme',
  templateUrl: './sb-color-theme.html',
  styleUrls: ['./sb-color-theme.scss'],
})
export class ColorThemeComponent {
  constructor(public colorThemeService: ColorThemeService) { }
}
