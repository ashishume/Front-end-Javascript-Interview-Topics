import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() size: any;
  @Output() sizeChange = new EventEmitter<number>();

  str = 'My name is ashish';
  ngOnInit() {
    console.log(this.size);

    setTimeout(() => {
      this.sizeChange.emit(10);
    }, 2000);
  }

  user = {
    firstName: '',
    lastName: '',
  };

  onSubmit() {
    console.log(this.user.firstName);
    console.log(this.user.lastName);
  }
}
