import { Component, OnInit } from '@angular/core';
import {HttpRepertoRelease, Reperto, RepertoRelease} from '../RepertiDataModel';
import {Router} from '@angular/router';
import {DBCRUDService} from '../dbcrud.service';

@Component({
  selector: 'app-nuovo-reperto',
  templateUrl: './nuovo-reperto.component.html',
  styleUrls: ['./nuovo-reperto.component.css']
})
export class NuovoRepertoComponent implements OnInit {

  newReperto = new RepertoRelease(
    0,
  0,
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  0,
  '',
  '',
  false,
  0,
  false
  );

  submitted: boolean = false;

  constructor(private router: Router, private db: DBCRUDService) {
    this.newReperto.PathShow = false;
    this.submitted = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }

  newRepertoInsert() {
    console.log(this.newReperto);
    this.db.insertReperti(this.newReperto).subscribe();
  }

}
