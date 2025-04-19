import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesHomeComponent } from './abilities.home.component';

describe('AbilitiesHomeComponent', () => {
  let component: AbilitiesHomeComponent;
  let fixture: ComponentFixture<AbilitiesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilitiesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
