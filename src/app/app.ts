import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Projects } from './projects/projects';
import { Cv } from './cv/cv';

@Component({
  selector: 'app-root',
  imports: [Hero, Projects, Cv],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
