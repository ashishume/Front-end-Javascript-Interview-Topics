import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() size: any;
  @Output() sizeChange = new EventEmitter<number>();

  str="My name is ashish"
  ngOnInit() {
    console.log(this.size);

    setTimeout(() => {
      this.sizeChange.emit(10);
    }, 2000);
  }
}
