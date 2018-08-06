import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CatType } from '../shared/models/category_type.model';

@Injectable()
export class CategoryTypeService {

  constructor(private http: HttpClient) { }

  getCatTypes(): Observable<CatType[]> {
    return this.http.get<CatType[]>('/api/category_types');
  }

  getCatById(cat_id): Observable<CatType[] > {
    return this.http.get<CatType[]>(`/api/category_types/${cat_id}`);
  }


}