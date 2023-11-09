import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private router = inject(Router);
  constructor() {}
ngOnInit() {
console.log(this.router.getCurrentNavigation()!.extras.state!);
}
}
