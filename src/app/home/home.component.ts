import { Component } from '@angular/core';
import { Slider } from '../slider/slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slider: Slider[] = [
    {
      index: 0,
      headline: 'Candy world',
      
      src: '/assets/home-slider1.jpg'
    },
    {
      index: 1,
      headline: 'Sweet life',
      
      src: '/assets/home-slider2\ copy.jpg'
    },
    {
      index: 2,
      headline: 'chocolade dream',
      
      src: '/assets/home-slider3.jpg'
    },
    {
      index: 3,
      headline: 'famouse cake',
      
      src: '/assets/home-slider4.jpg'
    },
    {
      index: 4,
      headline: 'cup cake',
      
      src: '/assets/home-slider5.jpg'
    }
  ]
}
