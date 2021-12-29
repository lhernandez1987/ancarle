import {Directive, ElementRef, Input} from '@angular/core';
import * as Inputmask from 'inputmask';

@Directive({
  selector: '[app-restrict-input]'
})
export class RestrictInputDirective {

  private regexMap = {
    integer: '^[0-9]*$',
    float: '^[+-]?([0-9]*[.])?[0-9]+$',
    words: '([A-z]*\\s)*',
    point25: '^\-?[0-9]*(?:\\.25|\\.50|\\.75|)$'
  };

  constructor(private el: ElementRef) {}

  //@Input('app-restrict-input')
  /*public set defineInputType(type: string) {
    console.log('++++++++++++ ' + type);
    
    Inputmask({regex: this.regexMap[type], placeholder: ''})
      .mask(this.el.nativeElement);
  }*/
  @Input('app-restrict-input')
  restrictNumeric(e) {
    return new RegExp('[0-9]').test(String.fromCharCode(e.which));
  }

}
