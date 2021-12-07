import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'star-viewer',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() starRating: number = 0;
  cropWidth: number = 65;

  constructor() { }

  ngOnChanges(): void {
    this.cropWidth = this.starRating * 65 / 5;
  }

}
