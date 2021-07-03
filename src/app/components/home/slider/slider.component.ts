import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }
  images = ['../../../../assets/5dd942e4-a2d4-4aa3-a65c-881519163281maxresdefault (1).jpg',
            '../../../../assets/7d476b03-68fd-4e18-b547-c0985a56744da89c106af5d3fd005e94c7e249bcd226.jpg',
            '../../../../assets/d9c1e08f-3aa9-44e0-9613-81bd84ae1c5a163655.jpg'];
  x =screen.height;
  ngOnInit(): void {
    this.x-=200;
  }

}
