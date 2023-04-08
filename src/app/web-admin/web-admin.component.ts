import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-web-admin',
  templateUrl: './web-admin.component.html',
  styleUrls: ['./web-admin.component.scss']
})

export class WebAdminComponent implements OnInit {

  activeTab = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //jiaodo!!!!ngxi
  }


  onTabChanged(event: MatTabChangeEvent): void {
    this.activeTab = event.index;
    switch (event.index) {
      case 0:
        this.router.navigate(['view-all-users'], { relativeTo: this.route });
        break;
      case 1:
        this.router.navigate(['add-restaurant-manager'], { relativeTo: this.route });
        break;
      default:
        break;
    }
  }

}
