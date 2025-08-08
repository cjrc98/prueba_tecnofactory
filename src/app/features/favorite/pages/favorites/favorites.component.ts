import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { Comic } from '../../../../domain/models/comic.model';
import { CardFavoriteComponent } from "@feature/favorite/components/card-favorite/card-favorite.component";

@Component({
  selector: 'app-favorites',
  imports: [CardFavoriteComponent],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  favoritesSrv = inject(FavoritesService);

  isLoading = signal(true);

  comics = computed(() => this.favoritesSrv.favorites());
  
  trackById = (_: number, comic: Comic) => comic.id;

  constructor(){
    this.loadData();
  }

  loadData(){
    this.isLoading.set(true);
    this.favoritesSrv.loadFavorites();
    this.isLoading.set(false);
  }

  toggleFavorite(comic: any){
    this.favoritesSrv.toggleFavorite(comic);
  }
}
