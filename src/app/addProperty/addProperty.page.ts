import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addProperty',
  templateUrl: './addProperty.page.html',
  styleUrls: ['./addProperty.page.scss']
})
export class AddPropertyPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.signupForm = this.formBuilder.group({
      owner: [null, [Validators.required]],
      type: [null, [Validators.required]],
      area: [null, [Validators.required]],
      price: [null, [Validators.required]],
      contact: [null, [Validators.required]],
      description: [null, [Validators.required]],
      location: [null, [Validators.required]]
    });
  }

  save() {
    if (this.signupForm.valid) {
      console.log('formData', this.signupForm.value);
      const formData = this.signupForm.value;
      this.saveHttpReq(formData).subscribe(
        data => {
          console.log('I got this response -> ', data);
          this.router.navigate(['list']);
        },
        error => {
          console.log('error', error);
        }
      );
    }
  }

  saveHttpReq(dataObj): Observable<any> {
    // const url = 'http://test-node-api-test.herokuapp.com/students/newStudent'; // This link is working coorectly.
    console.log(dataObj);
    const url = 'http://localhost:3000/properties/newProperty';
    return this.http.post(url, dataObj);
  }
}
