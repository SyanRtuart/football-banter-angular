import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchBanterComponent } from './match-banter.component';

describe('MatchBanterComponent', () => {
  let component: MatchBanterComponent;
  let fixture: ComponentFixture<MatchBanterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchBanterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchBanterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
