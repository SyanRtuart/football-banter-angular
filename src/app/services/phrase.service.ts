import { UpdateMemberRequest } from './../models/services/phrase/update-member-request';
import { Member } from '../models/services/phrase/member-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhraseService {
  private apiUrl = environment.apiUrl

  private apiRoutes = {
    getMember: 'phrase/member/',
    updateMemberGeneralAttributes: 'phrase/member/updateGeneralAttributes',
  }

  constructor(private http: HttpClient) { }

  getMember(memberId: string): Observable<Member> {
    return this.http.get<Member>(this.apiUrl + this.apiRoutes.getMember + memberId);
  }

  updateMemberGeneralAttributes(request: UpdateMemberRequest) {
    return this.http.post(this.apiUrl + this.apiRoutes.updateMemberGeneralAttributes, request)
  }
}
