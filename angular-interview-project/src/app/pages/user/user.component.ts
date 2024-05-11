import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, LoginComponent,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [HttpClientModule, AuthService],
})
export class UserComponent {
  constructor(private authSvc: AuthService) {}
  size = 5;
  ngOnInit() {
    this.authSvc.fetchApiData().subscribe((data) => {
      // console.log(data);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
