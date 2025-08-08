import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Comic } from '../../../domain/models/comic.model';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {
  favoritesSrv = inject(FavoritesService);
  constructor() {
    // 👀 Para depuración: imprime cada vez que cambian los favoritos
    effect(() => {
      console.log('[FavoritesComponent] Favoritos actuales:', this.favoritesSrv.favorites());
    });
  }
  trackById = (_: number, comic: Comic) => comic.id;
}
