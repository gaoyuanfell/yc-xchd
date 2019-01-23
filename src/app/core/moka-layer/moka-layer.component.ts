import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'moka-layer',
  templateUrl: './moka-layer.component.html',
  styleUrls: ['./moka-layer.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class MokaLayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  test(data){
    console.info(data);
    console.info(data.toggle);
  }

}
