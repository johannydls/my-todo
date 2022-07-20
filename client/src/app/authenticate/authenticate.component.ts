import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  public mode: 'signin' | 'signup';

  constructor() {
    this.mode = 'signin';
  }

  ngOnInit(): void {
  }

}
