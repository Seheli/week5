import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IT } from './IT';
import { ITService } from './IT.service';

@Component({
  selector: 'my-IT390',
  templateUrl: './IT390.component.html',
  styleUrls: ['./IT390.component.css']
})
export class IT390Component implements OnInit {
  IT390: IT[];
  selectedIT: IT;
  addingIT = false;
  error: any;
  showNgFor = false;

  constructor(private router: Router, private ITService: ITService) {}

  getIT390(): void {
    this.ITService
      .getIT390()
      .subscribe(
        IT390 => (this.IT390 = IT390),
        error => (this.error = error)
      )
  }

  addIT(): void {
    this.addingIT = true;
    this.selectedIT = null;
  }

  close(savedIT: IT): void {
    this.addingIT = false;
    if (savedIT) {
      this.getIT390();
    }
  }

  deleteIT(IT: IT, event: any): void {
    event.stopPropagation();
    this.ITService.delete(IT).subscribe(res => {
      this.IT390 = this.IT390.filter(h => h !== IT);
      if (this.selectedIT === IT) {
        this.selectedIT = null;
      }
    }, error => (this.error = error));
  }

  ngOnInit(): void {
    this.getIT390();
  }

  onSelect(IT: IT): void {
    this.selectedIT = IT;
    this.addingIT = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedIT.id]);
  }
}
