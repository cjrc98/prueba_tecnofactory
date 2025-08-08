import { Component, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Comic } from '../../../../domain/models/comic.model';
import { MarvelApiService } from '../../../../core/services/marvel.service';


@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.css'],
  imports: [RouterModule],
})
export class ComicsListComponent {
  comics = signal<Comic[]>([]); 
  currentPage = signal(0);
  isLoading = signal(false);

  constructor(private marvelService: MarvelApiService) {
    this.loadComics();
  } 

  loadComics() {
    this.isLoading.set(true);
    this.marvelService.getComics(this.currentPage()).subscribe({
      next: (data) => {
        this.comics.set(data);
        this.isLoading.set(false);
      },
      error: (e) => {
        console.error('Error al cargar comics', e);
        this.isLoading.set(false);
      }
    });
  }

  nextPage() {
    this.currentPage.update(v => v + 1);
    this.loadComics();
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update(v => v - 1);
      this.loadComics();
    }
  }
}
