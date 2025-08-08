import { Routes } from "@angular/router";
import { ComicDetailComponent } from "./pages/comic-detail/comic-detail.component";


export const routes: Routes = [{

    path: ':id',
    component: ComicDetailComponent
}];
