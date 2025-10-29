import { Component } from '@angular/core';
import { TodoComponent } from '../todo/todo';
import { CountdownComponent } from '../countdown/countdown'
@Component({
  selector: 'app-home',
  imports: [TodoComponent, CountdownComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
