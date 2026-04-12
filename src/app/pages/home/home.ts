import { Component } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { SkillsSection } from '../../components/skills-section/skills-section';
import { ProjectsSection } from '../../components/projects-section/projects-section';
import { DeepDivesSection } from '../../components/deep-dives-section/deep-dives-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, SkillsSection, ProjectsSection, DeepDivesSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}