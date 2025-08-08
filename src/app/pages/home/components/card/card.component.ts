import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Comic } from '../../../../domain/models/comic.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  comic = input.required<Comic>();

}
