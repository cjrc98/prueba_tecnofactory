import { Routes } from '@angular/router';
import { LoginPageComponent } from './Auth/Pages/login-page/login-page.component';
import { RegisterPageComponent } from './Auth/Pages/register-page/register-page.component';

export const routes: Routes = [
    {
        path: 'login-page',
        component: LoginPageComponent
    },
    {
        path: 'register-page',
        component: RegisterPageComponent
    }
];
