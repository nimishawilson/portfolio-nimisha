import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'portfolio-theme';

  readonly isDark = signal(true);

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    // Default to dark; only switch to light if explicitly saved
    const dark = saved !== 'light';
    this.isDark.set(dark);
    this.apply(dark);
  }

  toggle(): void {
    const dark = !this.isDark();
    this.isDark.set(dark);
    this.apply(dark);
    localStorage.setItem(this.STORAGE_KEY, dark ? 'dark' : 'light');
  }

  private apply(dark: boolean): void {
    document.documentElement.classList.toggle('light', !dark);
  }
}