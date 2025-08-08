import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelApiService } from '../../../core/services/marvel.service';
import { Comic } from '../../../domain/models/comic.model';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class ComicDetailComponent {
  comic = signal<Comic | null>(null);
  isLoading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private marvelService: MarvelApiService,
    private favoritesService: FavoritesService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.marvelService.getComicById(id).subscribe({
      next: (data) => {
        this.comic.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  toggleFavorite() {
    if (this.comic()) {
      this.favoritesService.toggleFavorite(this.comic()!);
    }
  }

  isFavorite(): boolean {
    return this.comic()
      ? this.favoritesService.isFavorite(this.comic()!.id)
      : false;
  }
}
