import { Injectable } from '@angular/core';
import { Banter } from '../models/banter';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanterService {

  banter: Banter[] = [
    {type: 'For', banter: 'Your team played good last night'},
    {type: 'For', banter: 'So and so was good wasnt he'},
    {type: 'For', banter: 'So and so strikes again'},
    {type: 'For', banter: 'Took your eyes off him for 5 minutes'},
    {type: 'Against', banter: 'What happened last night?'},
    {type: 'Against', banter: 'So and so never even turned up last night'},
    {type: 'Against', banter: 'Your teams crap'},
    {type: 'Against', banter: 'Bla bla bla'},
  ];

  constructor() { }

 getBanter(): Observable<Banter[]> {
   return of(this.banter);
 }

}
