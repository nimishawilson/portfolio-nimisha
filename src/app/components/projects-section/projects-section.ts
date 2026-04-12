import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-projects-section',
  imports: [RouterLink],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.css',
})
export class ProjectsSection {
  readonly projects = PROJECTS;
}