import { Component } from '@angular/core';
import { Slider } from '../slider/slider';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger("inOutPaneAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(-100%)" }), //apply default styles before animation starts
        animate(
          "750ms ease-in-out",
          style({ opacity: 1, transform: "translateX(0)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "translateX(0)" }), //apply default styles before animation starts
        animate(
          "600ms ease-in-out",
          style({ opacity: 0, transform: "translateX(-100%)" })
        )
      ])
    ])
  ]
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

  display= false
}
