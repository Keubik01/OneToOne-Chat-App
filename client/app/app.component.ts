import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewChecked, OnInit {

  public message;
  title = 'Tour of Heroes';
  notifications = [];

  constructor(public auth: AuthService,
              private changeDetector: ChangeDetectorRef,
              private router: Router
            ) {
            }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngOnInit () {

  }
}
