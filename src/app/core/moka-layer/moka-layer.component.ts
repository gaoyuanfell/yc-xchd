import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "moka-layer",
  templateUrl: "./moka-layer.component.html",
  styleUrls: ["./moka-layer.component.less"],
  encapsulation: ViewEncapsulation.None
})
export class MokaLayerComponent implements OnInit {
  test(data) {
    console.info(data);
    console.info(data.toggle);
  }

  menuList = [
    {
      leftIcon: "&#xe6d7;",
      name: "投放管理",
      href: "throw",
      children: [
        {
          name: "投放管理",
          url: "/throw/throw"
        },
        {
          name: "创意管理",
          url: "/throw/creative"
        },
        {
          name: "排期表",
          url: "/throw/schedule"
        }
      ]
    },
    {
      leftIcon: "&#xe62c;",
      name: "设置",
      href: "setting",
      children: [
        {
          name: "权限管理",
          url: "/setting/limit"
        },
        {
          name: "角色管理",
          url: "/setting/role"
        },
        {
          name: "菜单管理",
          url: "/setting/menu"
        },
        {
          name: "用户管理",
          url: "/setting/user"
        }
      ]
    },
    {
      leftIcon: "&#xe613;",
      name: "媒体管理",
      href: "media",
      children: [
        {
          name: "设备管理",
          url: "/media/device"
        },
        {
          name: "广告位管理",
          url: "/media/space"
        }
      ]
    },
    {
      leftIcon: "&#xe629;",
      name: "报表",
      href: "report",
      children: [
        {
          name: "投放报表",
          url: "/report/putin"
        },
        {
          name: "渠道报表",
          url: "/report/channel"
        },
        {
          name: "设备报表(媒体)",
          url: "/report/device"
        },
        {
          name: "时间报表",
          url: "/report/time"
        }
      ]
    },
    {
      leftIcon: "&#xe702;",
      name: "财务",
      href: "financial",
      children: [
        {
          name: "充值审核",
          url: "/financial/refill"
        },
        {
          name: "用户金额统计",
          url: "/financial/amount"
        },
        {
          name: "账户管理",
          url: "/financial/user"
        }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}
}
