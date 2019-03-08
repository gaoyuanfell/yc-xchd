/*
 * @Author: moka === gaoyuanfell@sina.com
 * @Date: 2019-03-08 15:10:46
 * @Last Modified by:   moka
 * @Last Modified time: 2019-03-08 15:10:46
 */
import {
  style,
  query,
  group,
  animate,
  transition,
  trigger,
  state
} from "@angular/animations";

const animationContentClass = "moka-modal";

const _bounceInRightAnimation = [
  query(
    `:enter ${animationContentClass}`,
    [style({ transform: "translateX(-100%)", opacity: 0, })],
    {
      optional: true,
      limit: 1
    }
  ),
  group([
    query(
      `:enter ${animationContentClass}`,
      [animate("225ms cubic-bezier(0.4,0.0,0.2,1)", style({ transform: "translateX(0%)", opacity: 1, }))],
      { optional: true, limit: 1 }
    ),
    query(
      `:leave ${animationContentClass}`,
      [animate("225ms cubic-bezier(0.4,0.0,0.2,1)", style({ transform: "translateX(100%)", opacity: 0, }))],
      { optional: true, limit: 1 }
    )
  ])
];

const _bounceInRight = transition(`* <=> *`, _bounceInRightAnimation);

export const bounceInRight = trigger("bounceInRight", [_bounceInRight]);

const _bounceInLeftAnimation = [
  query(
    `:enter ${animationContentClass}`,
    [
      style({
        transform: "translateX(100%)",
        opacity: 0,
      })
    ],
    {
      optional: true,
      limit: 1
    }
  ),
  group([
    query(
      `:enter ${animationContentClass}`,
      [
        animate(
          "225ms cubic-bezier(0.4,0.0,0.2,1)",
          style({
            transform: "translateX(0%)",
            opacity: 1,
          })
        )
      ],
      { optional: true, limit: 1 }
    ),
    query(
      `:leave ${animationContentClass}`,
      [
        animate(
          "225ms cubic-bezier(0.4,0.0,0.2,1)",
          style({
            transform: "translateX(-100%)",
            opacity: 0,
          })
        )
      ],
      { optional: true, limit: 1 }
    )
  ])
];

const _bounceInLeft = transition(`* <=> *`, _bounceInLeftAnimation);

export const bounceInLeft = trigger("bounceInLeft", [
  _bounceInLeft
]);

const _fadeInOutAnimation = [
  query(
    `:enter ${animationContentClass}`,
    [
      style({
        opacity: 0,
      })
    ],
    {
      optional: true,
      limit: 1
    }
  ),
  group([
    query(
      `:enter ${animationContentClass}`,
      [
        animate(
          "225ms cubic-bezier(0.4,0.0,0.2,1)",
          style({
            opacity: 1,
          })
        )
      ],
      { optional: true, limit: 1 }
    ),
    query(
      `:leave ${animationContentClass}`,
      [
        animate(
          "225ms cubic-bezier(0.4,0.0,0.2,1)",
          style({
            opacity: 0,
          })
        )
      ],
      { optional: true, limit: 1 }
    )
  ])
];

const _fadeInOut = transition(`* <=> *`, _fadeInOutAnimation);

export const fadeInOut = trigger("fadeInOut", [
  _fadeInOut
]);
