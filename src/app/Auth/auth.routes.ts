import { Routes } from "@angular/router";
import { LoginPageComponent } from "./Pages/login-page/login-page.component";
import { RegisterPageComponent } from "./Pages/register-page/register-page.component";




export const routes: Routes = [

    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'register',
        component: RegisterPageComponent
    }
]