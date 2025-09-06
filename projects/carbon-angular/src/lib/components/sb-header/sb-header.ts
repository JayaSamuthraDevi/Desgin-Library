import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'sb-header',
  templateUrl: './sb-header.html',
  styleUrls: ['./sb-header.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {
  appName = input('My App');
}
