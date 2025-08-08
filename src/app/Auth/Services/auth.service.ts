import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  register(
    email: string,
    username: string,
    cedula: string,
    password: string
  ): Observable<string> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(async (response: UserCredential) => {
      // Actualizar el nombre en Auth
      await updateProfile(response.user, { displayName: username });

      // Guardar datos del usuario en Firestore
      const uid = response.user.uid;
      const userData: UserInterface = {
        email,
        username,
        cedula,
      };
      await setDoc(doc(this.firestore, 'users', uid), userData);

      // 👉 Retornar el UID para que lo reciba el componente
      return uid;
    });

    return from(promise);
  }

  login(email: string, password: string): Observable<string> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password)
    ).pipe(
      map((cred: UserCredential) => {
        const uid = cred.user?.uid;
        if (!uid) throw new Error('No se pudo obtener el UID del usuario');
        
        return uid;
      })
    );
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('uid');
  }
}
