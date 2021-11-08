import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  name: String = "Profile";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user().subscribe(
      (data) => this.name = data.username,
      () =>  this.router.navigate(['/login'])
    );
  }

}
