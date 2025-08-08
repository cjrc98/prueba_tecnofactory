import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Comic } from '../../domain/models/comic.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MarvelApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.marvelApi.baseUrl;
  private apiKey = environment.marvelApi.publicKey;
  private hash = environment.marvelApi.hash;
  private ts = environment.marvelApi.ts;

  getComics(page = 0, limit = 20): Observable<Comic[]> {
    const offset = page * limit;

    const url = `${this.baseUrl}/comics?apikey=${this.apiKey}&hash=${this.hash}&ts=${this.ts}&offset=${offset}&limit=${limit}`;

    return this.http
      .get<any>(url)
      .pipe(map((res) => res.data.results.map(this.mapToComicDomain)));
  }

  getComicById(id: number): Observable<Comic> {
    return this.http
      .get<any>(
        `${this.baseUrl}/comics/${id}?apikey=${this.apiKey}&hash=${this.hash}&ts=${this.ts}`
      )
      .pipe(map((res) => this.mapToComicDomain(res.data.results[0])));
  }

  private mapToComicDomain(apiComic: any): Comic {
    const description =
      apiComic.textObjects?.find((t: any) => t.language === 'en-us')?.text ||
      apiComic.description ||
      'Sin descripción';
    const onsaleDate = apiComic.dates?.find(
      (d: any) => d.type === 'onsaleDate'
    )?.date;
    const price = apiComic.prices?.find(
      (p: any) => p.type === 'printPrice'
    )?.price;

    return {
      id: apiComic.id,
      title: apiComic.title,
      description,
      image: `${apiComic.thumbnail.path}.${apiComic.thumbnail.extension}`,
      onsaleDate,
      price,
      creators: apiComic.creators?.items || [],
      characters: apiComic.characters?.items?.map((c: any) => c.name) || [],
    };
  }
}
