import { Component, Input } from '@angular/core';
import { Slider } from './slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  @Input()
  slider!: Slider[];

  currentSlide = 0;

  constructor() { }

  ngOnInit() {
  }

  onSlideClick(index: number) {
    if (this.currentSlide !== index) {
      this.currentSlide = index;
    }
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1
    this.currentSlide = previous < 0 ? this.slider.length - 1 : previous;
    console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1
    this.currentSlide = next === this.slider.length ? 0 : next;
    console.log('next clicked, new current slide is: ', this.currentSlide);
  }

}
