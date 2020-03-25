import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {ListPage} from '../list/list.page';
import {Observable} from 'rxjs';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private popoverController: PopoverController,
              private navParams: NavParams,
              private router: Router,
              private http: HttpClient,
              private route: ActivatedRoute) { }
  id;
  propertyList: any;
  singleProperty;
  ngOnInit() {
    this.id = this.navParams.data._id;
    console.log('id ' + this.id);
    this.http.get('http://test-node-api-test.herokuapp.com/properties/getProperties').subscribe(res => {
      this.propertyList = res;
      this.route.paramMap.subscribe(paramMap => {
        this.singleProperty = this.propertyList.find(obj => {
          return obj._id.includes(this.id);
        });
      });
    });
  }

  deleteProperty() {
    console.log('formData ' + this.singleProperty._id);
    this.callAPI(this.singleProperty).subscribe(
        data => {
          console.log('I got this response -> ', data);
          this.router.navigate(['list']);
        },
        error => {
          console.log('error', error);
        }
    );
    alert('deleted successfully');
    this.router.navigate(['list']);
  }

  callAPI(student): Observable<any> {
    // delete code added and working correctly.
    const url = `http://test-node-api-test.herokuapp.com/properties/${this.singleProperty._id}`;
    console.log('link', url);
    return this.http.delete(url);
  }
  updateItem() {
    const id = this.singleProperty._id;
    const url = `update/${id}`;
    console.log(url);
    this.router.navigateByUrl(url);
  }
}
