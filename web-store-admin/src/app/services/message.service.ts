import { Injectable } from '@angular/core';

declare var iziToast;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  getMessageError(description) {
    iziToast.show({
      title: 'ERROR', 
      titleColor: '#eb0000',
      class: 'text-danger',
      position: 'topRight',
      message: description,
      backgroundColor: '#ffbda9',
      messageColor: '#eb0000'
    })
  }

  getMessageSuccess(description) {
    iziToast.success({
      title: 'SUCCESS',
      message: description,
      position: 'topRight'
  })
  }

  getMessageData() {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: 'once',
      id: 'question',
      zindex: 999,
      title: 'Hey',
      message: 'Are you sure about that?',
      position: 'center',
      buttons: [
          ['<button><b>YES</b></button>', function (instance, toast) {
   
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
   
          }, true],
          ['<button>NO</button>', function (instance, toast) {
   
              instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
   
          }],
      ],
      onClosing: function(instance, toast, closedBy){
          console.info('Closing | closedBy: ' + closedBy);
      },
      onClosed: function(instance, toast, closedBy){
          console.info('Closed | closedBy: ' + closedBy);
      }
  });
  }
} 
