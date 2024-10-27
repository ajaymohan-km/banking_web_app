import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isSubmitClicked:boolean = false
    registerGroup = new FormGroup(
      {
        fullName:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required]),
        password:new FormControl('',[Validators.required]),
        phoneNumber:new FormControl('',[Validators.required]),
        userType: new FormControl('',[Validators.required])
      }
    )
    registerUser() {
      this.isSubmitClicked=true;
     if(!this.registerGroup.dirty)
     {
    
     }
    }
}
