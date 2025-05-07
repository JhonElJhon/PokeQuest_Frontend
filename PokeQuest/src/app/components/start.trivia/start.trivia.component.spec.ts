import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTriviaComponent } from './start.trivia.component';

describe('StartTriviaComponent', () => {
  let component: StartTriviaComponent;
  let fixture: ComponentFixture<StartTriviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartTriviaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
