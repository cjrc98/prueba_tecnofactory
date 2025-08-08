import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router } from 'express';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent  {
  alert = signal<boolean>(false);
  alertmsg= signal<string>('');


  stateAlert(value: boolean) {
    this.alert.set(value);
  }
}
