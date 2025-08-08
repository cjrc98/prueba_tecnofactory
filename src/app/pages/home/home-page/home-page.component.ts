import { Component } from '@angular/core';
import { ComicsListComponent } from "../components/comics-list/comics-list.component";

@Component({
  selector: 'app-home-page',
  imports: [ComicsListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
