import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { SKILL_GROUPS } from '../../data/skills.data';

@Component({
  selector: 'app-skills-section',
  imports: [TitleCasePipe],
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.css',
})
export class SkillsSection {
  readonly skillGroups = SKILL_GROUPS;
}