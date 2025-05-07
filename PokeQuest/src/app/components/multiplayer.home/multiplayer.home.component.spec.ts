import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerHomeComponent } from './multiplayer.home.component';

describe('MultiplayerHomeComponent', () => {
  let component: MultiplayerHomeComponent;
  let fixture: ComponentFixture<MultiplayerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiplayerHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
