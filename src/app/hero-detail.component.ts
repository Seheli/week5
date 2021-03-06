import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IT } from './IT';
import { ITService } from './IT.service';

@Component({
  selector: 'my-IT-detail',
  templateUrl: './IT-detail.component.html',
  styleUrls: ['./IT-detail.component.css']
})
export class ITDetailComponent implements OnInit {
  @Input() IT: IT;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private ITService: ITService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.ITService.getIT(id).subscribe(IT => (this.IT = IT));
      } else {
        this.navigated = false;
        this.IT = new IT();
      }
    });
  }

  save(): void {
    this.ITService.save(this.IT).subscribe(IT => {
      this.IT = IT; // saved IT, w/ id if new
      this.goBack(IT);
    }, error => (this.error = error)); // TODO: Display error message
  }

  goBack(savedIT: IT = null): void {
    this.close.emit(savedIT);
    if (this.navigated) {
      window.history.back();
    }
  }
}
