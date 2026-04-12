import { Component } from '@angular/core';
import { EXPERIENCES } from '../../data/experience.data';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.css',
})
export class ExperienceSection {
  readonly experiences = EXPERIENCES;
}
