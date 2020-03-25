import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  public signupForm;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private formBuilder: FormBuilder) { }
  propertyList: any;
  singleProperty;

  ngOnInit() {
      this.formInitializer();

      this.http
          .get('http://test-node-api-test.herokuapp.com/properties/getProperties')
          .subscribe(res => {
              this.propertyList = res;
              this.route.paramMap.subscribe(paramMap => {
                  const val = paramMap.get('id');
                  this.singleProperty = this.propertyList.find(obj => {
                      return obj._id.includes(val);
                  });

                  this.signupForm.patchValue(this.singleProperty);
              });
          });
  }

    formInitializer() {
        console.log('fi', this.singleProperty);
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

  updateData() {
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
        const url = `http://test-node-api-test.herokuapp.com/properties/${this.singleProperty._id}`;
        console.log('link', url);
        return this.http.patch(url, dataObj);
    }
}
