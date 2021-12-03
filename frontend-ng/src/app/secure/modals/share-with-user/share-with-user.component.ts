import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-share-with-user',
  templateUrl: './share-with-user.component.html',
  styleUrls: ['./share-with-user.component.scss'],
})
export class ShareWithUserComponent implements OnInit, OnDestroy{

  // two way binded variable
  public username: string;

  // subscriptions 
  public userSubscription$: Subscription
  @Input() albumName: FormControl;
  public users: User[] = [];
  public hasQuery: boolean = false;
  constructor(private userService: UserService, private popoverController: PopoverController, private alertCtrl: AlertController) { }

  ngOnInit() {}

  // unsubscribe to http request
  ngOnDestroy() {
    if(this.userSubscription$ != null) {
      this.userSubscription$.unsubscribe();
    }
  }


  // Search by username
  public findUser() {
    let query = this.username.trim();

    // Will match if query is nothing or is only spaces
    let matchSpaces: any = query.match(/\s*/);
    if(matchSpaces[0] == query) {
      this.users = [];
      this.hasQuery = false
      return;
    }
    this.userSubscription$ = this.userService.search(query).subscribe(
      (users: User[]) => {
        this.users = users;
        this.hasQuery = true;
      }
    )
  }

  async cancel() {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: '<div>Are you sure you want to exit?</div>',
      backdropDismiss: false,
      animated: false,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.popoverController.dismiss();
          }
        },
        { text: 'No' }
      ]
    });
    await alert.present();
  }

  selectUser(user: User) {
    this.popoverController.dismiss(user);
  }

}
