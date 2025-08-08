import { Injectable, computed, signal } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDocs, deleteDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Comic } from '../../domain/models/comic.model';
import { collectionData } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private currentUser = toSignal(user(this.auth));

  // Signal reactiva con los favoritos del usuario actual
  favorites = signal<Comic[]>([]);

  constructor() {
    this.loadFavorites();
  }

  private async loadFavorites() {
    const uid = this.currentUser()?.uid;
    if (!uid) return;

    const favCollection = collection(this.firestore, `users/${uid}/favorites`);
    const snapshot = await getDocs(favCollection);
    const data = snapshot.docs.map(doc => doc.data() as Comic);
    this.favorites.set(data);
  }

  async toggleFavorite(comic: Comic) {
    const uid = this.currentUser()?.uid;
    if (!uid) return;

    const favDoc = doc(this.firestore, `users/${uid}/favorites/${comic.id}`);
    const current = this.favorites();
    const exists = current.some(c => c.id === comic.id);

    if (exists) {
      await deleteDoc(favDoc);
      this.favorites.set(current.filter(c => c.id !== comic.id));
    } else {
      await setDoc(favDoc, comic);
      this.favorites.set([...current, comic]);
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites().some(c => c.id === id);
  }
}
