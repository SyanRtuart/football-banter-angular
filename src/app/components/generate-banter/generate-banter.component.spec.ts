import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBanterComponent } from './generate-banter.component';

describe('GenerateBanterComponent', () => {
  let component: GenerateBanterComponent;
  let fixture: ComponentFixture<GenerateBanterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateBanterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBanterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
