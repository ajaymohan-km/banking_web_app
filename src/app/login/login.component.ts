import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

isLoginClicked:boolean=false;

  loginGroup = new FormGroup(
    {
      userName:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
    }
  )
  loginUser() {
    this.isLoginClicked=true;
    if(!this.loginGroup.dirty)
    {
   
    }
 }
}
