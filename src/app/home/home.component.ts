import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
