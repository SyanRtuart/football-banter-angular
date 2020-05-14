import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBanterComponent } from './create-banter.component';

describe('CreateBanterComponent', () => {
  let component: CreateBanterComponent;
  let fixture: ComponentFixture<CreateBanterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBanterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBanterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
