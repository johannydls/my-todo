import { Component, OnInit } from '@angular/core';
import { User } from '../helpers/interfaces';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user: User | undefined;

  constructor(
    private session: SessionService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.user = this.session.getUser();
    }, 500);
  }

}
