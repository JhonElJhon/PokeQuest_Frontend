import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-berry.home',
  imports: [],
  templateUrl: './berry.home.component.html',
  styleUrl: './berry.home.component.css'
})
export class BerryHomeComponent {

  constructor(private route: ActivatedRoute){
    
  }
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe()
  }
}
