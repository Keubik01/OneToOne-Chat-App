import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Subcat } from '../shared/models/subcat.model';

@Injectable()
export class SubcatService {

  constructor(private http: HttpClient) { }

  getSubCats(): Observable<Subcat[]> {
    return this.http.get<Subcat[]>('/api/subcats');
  }

  countSubCats(): Observable<number> {
    return this.http.get<number>('/api/subcats/count');
  }

  addSubCat(subcat: Subcat): Observable<Subcat> {
    return this.http.post<Subcat>('/api/subcat', subcat);
  }

  getsub(subcat: Subcat): Observable<Subcat> {
    return this.http.get<Subcat>(`/api/subcat/${subcat}`);
  }

  editSubCat(subcat: Subcat): Observable<any> {
    return this.http.put(`/api/subcat/${subcat._id}`, subcat, { responseType: 'text' });
  }

  deleteSubCat(subcat: Subcat): Observable<any> {
    console.log('delete', subcat)
    return this.http.delete(`/api/subcat/${subcat._id}`, { responseType: 'text' });
  }

  update(_id: string, subcat: Subcat) {
    return this.http.put(`/api/subcat/${subcat._id}` , subcat, { responseType: 'text' });
  }

  getSubCatById(cat_id): Observable<Subcat[] > {
    return this.http.get<Subcat[]>(`/api/subcat_id/${cat_id}`);
  }

}
