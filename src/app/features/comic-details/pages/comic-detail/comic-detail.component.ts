import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MarvelApiService } from '../../../../core/services/marvel.service';
import { FavoritesService } from '../../../favorite/services/favorites.service';
import { Comic } from '../../../../domain/models/comic.model';
import { LoaderComponent } from '@shared/components/loader/loader.component';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
})
export class ComicDetailComponent {
  comic = signal<Comic | null>(null);
  isLoading = signal(true);
  marvelService = inject(MarvelApiService);
  favoritesService = inject(FavoritesService);
  route = inject(ActivatedRoute);

  constructor() {
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
