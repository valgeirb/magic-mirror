import {inject, customAttribute} from 'aurelia-framework';
import {CssAnimator}             from 'aurelia-animator-css';

/**
  Custom attribute that animates the element when it's updated.

  Example: <span animateonchange="variable">${variable}</span>
**/
@customAttribute('animateonchange')
@inject(Element, CssAnimator)
export class AnimateOnChangeCustomAttribute {
  constructor(element, animator) {
    this.element = element;
    this.animator = animator;
    this.initialValueSet = false;
  }

  valueChanged(newValue) {
    if( this.initialValueSet ) {
      this.animator.addClass(this.element, 'fade-text-animation').then(() => {
        this.animator.removeClass(this.element, 'fade-text-animation');
    });
    }
    this.initialValueSet = true;
  }
}
