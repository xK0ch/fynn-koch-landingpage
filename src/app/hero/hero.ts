import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-hero',
  imports: [FaIconComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
}
