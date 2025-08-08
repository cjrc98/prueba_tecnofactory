import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Comic } from '@domain/models/comic.model';

@Component({
  selector: 'app-card-favorite',
  standalone: true,
  imports: [],
  templateUrl: './card-favorite.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardFavoriteComponent {
  comic = input.required<Comic>();
  toggle = output<Comic>();        

  onToggle() {
    const value = this.comic();
    this.toggle.emit(value);
  }
}
