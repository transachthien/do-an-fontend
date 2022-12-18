import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService,private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe((res: any)=>{
      console.log(res);
      this.storageService.saveUser(res);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        // this.reloadPage();
        this.gotoHome();
    },(error: HttpErrorResponse)=>{
      alert(error.message);
      this.errorMessage = error.message;
        this.isLoginFailed = true;
    }
    );

    // this.authService.login(username, password).subscribe({
    //   next: data => {
    //     this.storageService.saveUser(data);

    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.storageService.getUser().roles;
    //     this.reloadPage();
    //   },
    //   error: err => {  
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // });
  }

  reloadPage(): void {
    window.location.reload();
  }
  logoutPage(){
        this.isLoginFailed = false;
        this.isLoggedIn = false;
        this.storageService.clean();
        this.router.navigate(['/login']);

  }
  gotoHome(){
    this.router.navigate(['/addProduct']); // define your component where you want to go
}

}
