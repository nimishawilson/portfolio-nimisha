import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DEEP_DIVES, DeepDive } from '../../data/deep-dives.data';

@Component({
  selector: 'app-deep-dive-detail',
  imports: [RouterLink],
  templateUrl: './deep-dive-detail.html',
  styleUrl: './deep-dive-detail.css',
})
export class DeepDiveDetail implements OnInit {
  article = signal<DeepDive | null>(null);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.article.set(DEEP_DIVES.find(d => d.slug === slug) ?? null);
  }
}