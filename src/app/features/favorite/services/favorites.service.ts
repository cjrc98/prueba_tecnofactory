import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, doc, getDocs, setDoc, deleteDoc } from '@angular/fire/firestore';
import type { Comic } from '../../../domain/models/comic.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private firestore = inject(Firestore);

  // State privado + selector readonly
  #favorites$ = signal<Comic[]>([]);
  favorites = this.#favorites$.asReadonly();

  /**
   * Carga favoritos desde Firestore y los deja en la signal.
   * @param uid Opcional: si no lo pasas, toma localStorage('uid')
   * @returns Array de favoritos cargados
   */
  async loadFavorites(uid?: string): Promise<Comic[]> {
    const _uid = uid ?? this.#getUid();
    if (!_uid) return [];

    const favRef = collection(this.firestore, `users/${_uid}/favorites`);
    const snap = await getDocs(favRef);
    const data = snap.docs.map(d => d.data() as Comic);
    this.#favorites$.set(data);
    return data;
  }

  /**
   * Agrega o elimina un favorito.
   * @param comic Comic a agregar o eliminar
   * @param uid Opcional: si no lo pasas, toma localStorage('uid')
   * @returns True si se agrego, false si se elimino
   */
  async toggleFavorite(comic: Comic, uid?: string): Promise<boolean> {
    const _uid = uid ?? this.#getUid();
    if (!_uid) return false;

    const path = doc(this.firestore, `users/${_uid}/favorites/${comic.id}`);
    const current = this.#favorites$();
    const exists = current.some(c => c.id === comic.id);

    if (exists) {
      await deleteDoc(path);
      this.#favorites$.set(current.filter(c => c.id !== comic.id));
      return false;
    } else {
      await setDoc(path, comic);
      this.#favorites$.set([...current, comic]);
      return true;
    }
  }

  /** True si el id ya está en favoritos (según el estado en memoria). */
  isFavorite(id: number): boolean {
    return this.#favorites$().some(c => c.id === id);
  }

  /** Limpia la lista en memoria (no toca Firestore). */
  clear(): void {
    this.#favorites$.set([]);
  }

  // ---- helpers ----
  #getUid(): string | null {
    try { return typeof window !== 'undefined' ? localStorage.getItem('uid') : null; }
    catch { return null; }
  }
}
