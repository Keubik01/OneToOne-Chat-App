import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Helpdesk } from '../shared/models/helpdesk.model';

@Injectable()
export class HelpDeskService {

  constructor(private http: HttpClient) { }

  getHelpdeskDetails(): Observable<Helpdesk[]> {
    return this.http.get<Helpdesk[]>('/api/helpdesks');
  }

  countSociety(): Observable<number> {
    return this.http.get<number>('/api/helpdesks/count');
  }

  addHelpdesk(helpdesk: Helpdesk): Observable<Helpdesk> {
    return this.http.post<Helpdesk>('/api/helpdesk', helpdesk);
  }

  getHelpdesk(helpdesk: Helpdesk): Observable<Helpdesk> {
    return this.http.get<Helpdesk>(`/api/helpdesk/${helpdesk._id}`);
  }

  editHelpdesk(helpdesk: Helpdesk): Observable<any> {
    return this.http.put(`/api/helpdesk/${helpdesk._id}`, helpdesk, { responseType: 'text' });
  }

  deleteHelpdesk(helpdesk: Helpdesk): Observable<any> {
    return this.http.delete(`/api/helpdesk/${helpdesk}`, { responseType: 'text' });
  }

  update(_id: string, helpdesk: Helpdesk) {
    console.log('inside ', _id, helpdesk)
    return this.http.put(`/api/helpdesk/${helpdesk._id}` , helpdesk, { responseType: 'text' });
  }

}
