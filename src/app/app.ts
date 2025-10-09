import { Component, signal } from '@angular/core';
import { Navbar } from "../components/navbar/navbar";
import { TodoComponent } from "../components/todo/todo";

@Component({
  selector: 'app-root',
  imports: [Navbar, TodoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
