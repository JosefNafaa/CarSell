import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

   text='Wach a l3chran!';
   displayText =false;

  onClickButton():void{
    this.displayText = this.displayText ? false :true ;

  }

}
