import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "moka-layer",
  templateUrl: "./moka-layer.component.html",
  styleUrls: ["./moka-layer.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    "[attr.class]": '"moka-layer"',
  },
})
export class MokaLayerComponent implements OnInit {
  menuList = [
    {
      leftIcon: "&#xe601;",
      name: "首页",
      children: [
        {
          name: "首页1",
          href: "index"
        },
        {
          name: "首页2",
          href: "home"
        },
        {
          name: "表格",
          href: "table"
        }
      ]
    },
    {
      leftIcon: "&#xe601;",
      name: "首页2",
      children: [
        {
          name: "首页11",
          href: "index2"
        },
        {
          name: "首页22",
          href: "home2"
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
