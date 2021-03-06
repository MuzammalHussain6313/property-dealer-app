import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {ListService} from '../list.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

    constructor(private route: ActivatedRoute,
                private http: HttpClient, private router: Router
    ) {
    }

    propertyList: any;
    singleProperty;

    ngOnInit() {
        this.http.get('http://test-node-api-test.herokuapp.com/properties/getProperties').subscribe(res => {
            this.propertyList = res;
            this.route.paramMap.subscribe(paramMap => {
                const val = paramMap.get('id');
                this.singleProperty = this.propertyList.find(obj => {
                    return obj._id.includes(val);
                });
            });
        });
    }

    deleteStudent() {
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
        this.router.navigate(['list']);
    }

    callAPI(student): Observable<any> {
        const url = `http://test-node-api-test.herokuapp.com/proprties/${this.singleProperty._id}`;
        console.log('link', url);
        return this.http.delete(url);
    }

    updateItem() {
        const id = this.singleProperty.student_id;
        const url = `update/${id}`;
        console.log(url);
        this.router.navigateByUrl(url);
    }

    contactDealer(contactNumber: any) {
        alert('You can contactwith owner via ' + contactNumber + ' Number.');
    }
}
