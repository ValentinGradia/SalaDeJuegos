import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'salajuegos-743e4',
        appId: '1:18275479696:web:a27e25904b5bf172c2e815',
        storageBucket: 'salajuegos-743e4.appspot.com',
        apiKey: 'AIzaSyAtPuoFhgUktA4MO8TX3cLvLg9zfUFcBLA',
        authDomain: 'salajuegos-743e4.firebaseapp.com',
        messagingSenderId: '18275479696',
        measurementId: 'G-VL2C40L6PR',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
