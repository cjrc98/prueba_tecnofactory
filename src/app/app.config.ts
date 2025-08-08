import {
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideHttpClient } from '@angular/common/http';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

const firebaseConfig = {
  apiKey: 'AIzaSyDtjEK0dSbeWTcdAYHwcQYJ1-2vxkmi06k',
  authDomain: 'pruebatecnofactory.firebaseapp.com',
  databaseURL: 'https://pruebatecnofactory-default-rtdb.firebaseio.com',
  projectId: 'pruebatecnofactory',
  storageBucket: 'pruebatecnofactory.firebasestorage.app',
  messagingSenderId: '110497913540',
  appId: '1:110497913540:web:b2736c8baa48727b62c791',
  measurementId: 'G-JLD23VZF46',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ], 
};
