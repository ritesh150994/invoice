import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }
  onLogOut(){
    this.authService.logout()
    this.router.navigate([''],{relativeTo:this.route});
  }
}
