import { Component } from '@angular/core';
import { ComicsListComponent } from "../components/comics-list/comics-list.component";

@Component({
  selector: 'app-home-page',
  imports: [ComicsListComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

}
