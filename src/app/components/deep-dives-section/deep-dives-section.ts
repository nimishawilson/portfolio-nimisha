import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DEEP_DIVES } from '../../data/deep-dives.data';

@Component({
  selector: 'app-deep-dives-section',
  imports: [RouterLink],
  templateUrl: './deep-dives-section.html',
  styleUrl: './deep-dives-section.css',
})
export class DeepDivesSection {
  readonly deepDives = DEEP_DIVES;
}