import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [HttpClientModule, AuthService],
})
export class UserComponent {
  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.fetchApiData().subscribe((data) => {
      console.log(data);
    });
  }
}
