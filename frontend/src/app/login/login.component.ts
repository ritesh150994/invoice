import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  password:any
data:any
resData:any
errMessage:any
loginInvalid

// formSubmitAttempt = false;

loginForm:FormGroup=new FormGroup({
   'email':new FormControl(null,Validators.compose([
  	Validators.required,
  	Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
	])),
  'password':new FormControl(null,Validators.required),

 });

  constructor(private authService:AuthService,private router:Router,
    private route:ActivatedRoute,
    private toasterService:ToastrService) { }

  ngOnInit(): void {
    document.body.className="login"
  }

  ngOnDestroy(){
    document.body.className=""
  }

  onSubmit(){
    
  
    let email=this.loginForm.value.email
    let password=this.loginForm.value.password

   this.authService.login(email,password)
    .subscribe(data=>{
      console.log(data)
    this.resData=data
    
    if(this.resData.body.message){
      this.toasterService.error('Email or Password is Incorrect!!')
      this.errMessage=this.resData.body.message
   
    }else{
     this.toasterService.success('Welcome,You are successfully Signed In!!')
      this.router.navigate(['/home'],{relativeTo:this.route})
 
    }
    
    })
  
  }


  // forbiddenEmails(control:FormControl): Promise<any> | Observable<any>{
  //   const promise = new Promise<any>((resolve,reject)=>{
  //     setInterval(()=>{
  //  if(control.value==='test@test.com'){
  //    resolve({'emailIsForbidden':true})
  //  }else{
  //    resolve(null);
  //  }
  //     },2000)
  //   });
  //   return promise
  // }

onLogOut(){
  this.authService.logout()
}

account_validation_messages = {
 
  'email': [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Enter a valid email' }
  ],
  
 
  }
     
}
