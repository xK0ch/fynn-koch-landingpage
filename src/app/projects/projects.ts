import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faGlobe,
  faCode,
  faGear,
  faPlane,
  faMusic,
  faGraduationCap,
  faPuzzlePiece
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-projects',
  imports: [FaIconComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  faMusic = faMusic;
  faPlane = faPlane;
  faGraduationCap = faGraduationCap;
  faPuzzlePiece = faPuzzlePiece;
  faGlobe = faGlobe;
  faGear = faGear;
  faCode = faCode;
  faGithub = faGithub;
}
