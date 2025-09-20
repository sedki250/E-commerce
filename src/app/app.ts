import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/component/navbar/navbar";
import { Footer } from './shared/component/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar,RouterOutlet,Footer ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
