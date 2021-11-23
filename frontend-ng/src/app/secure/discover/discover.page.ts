import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  public title = 'Galeria';
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.logout().subscribe(() => {
      console.log("success")
    })
  }

}
