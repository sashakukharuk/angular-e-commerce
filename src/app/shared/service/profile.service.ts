import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../interface/profile.interface';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  profile: Profile;
  constructor(private http: HttpClient) {
  }
  getProfile(): Observable<Profile> {
    return this.http.get<Profile>('/api/profile/').pipe(tap((res) => {
      this.profile = res;
    }));
  }
  create(profile: Profile, id: string): Observable<Profile> {
    profile.userId = id;
    return this.http.post<Profile>('/api/profile/', profile);
  }
  clearProfile(): void {
    this.profile = null;
  }
}
