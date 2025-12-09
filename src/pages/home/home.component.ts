import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  images: string[] = [
    'assets/images/img1.jpeg',
    'assets/images/img2.jpeg',
    'assets/images/img3.jpeg',
    'assets/images/img4.jpeg'
  ];
}
