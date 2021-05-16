import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DBCRUDService} from '../dbcrud.service';

import {HttpReperto, Reperto, RepertoRelease, HttpRepertoRelease, FotoReperto, HttpFotoReperto, RepertoWrapper} from '../RepertiDataModel';


@Component({
  selector: 'app-reperti',
  templateUrl: './reperti.component.html',
  styleUrls: ['./reperti.component.css']
  //styleUrls: ['../styles.css']
})

export class RepertiComponent implements OnInit {

  title = 'RepertiGeologici';

  search = '';
  field = '';

  selectedFile: File = null;
  imageData: FormData;


  REPERTI: RepertoRelease[];
  //REPERTI: RepertoWrapper[];
  FOTOREPERTI: FotoReperto[];

  foto = "http://localhost:3000/images/Automated%20Ranch%20Automation%20Layer.png";

  constructor(private router: Router, private db: DBCRUDService) {

    db.getReperti()
      .subscribe( (data: HttpRepertoRelease[]) => {
        this.REPERTI = data;
        });
  }

  ngOnInit() {
  }

  getFotoRepertoInfo(inputID: number){
    this.db.getFotoRepertoInfo(inputID).subscribe((data: HttpFotoReperto[]) => {
        this.REPERTI.find(iterator => iterator.ID == inputID ).ArrayFoto = data;
        //this.REPERTI[0].ArrayFoto[0].Path = "http://localhost:3000/images/Automated%20Ranch%20Automation%20Layer.png";
      this.REPERTI.find(iterator => iterator.ID == inputID ).ArrayFoto.forEach( FotoInfo => {
          FotoInfo.Path = 'http://localhost:3000'+FotoInfo.Path.split("\\").join('/').substring(6,FotoInfo.Path.length);
        });
    });
  }

  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     this.foto = reader.result;
  //   }, false);
  //
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }

  loadFoto(fotoPath: string){
    this.db.getFotoReperto(fotoPath).subscribe(data => {
      //this.foto = data;
    });
  }

  searchReperti(input: string, field: string) {
    this.search = input;
    this.field = field;
    this.db.getRepertiSearch(this.search, this.field)
      .subscribe( (data: HttpRepertoRelease[]) => {this.REPERTI = data; });
  }

  MostraImmagine(input: RepertoRelease){
    input.PathShow = !input.PathShow;
    if(input.PathShow == true){
      this.getFotoRepertoInfo(input.ID);
    }
    console.log(this.FOTOREPERTI[input.ID]);
    this.loadFoto(this.FOTOREPERTI[input.ID].Path);
  }

  rimuoviReperti(inputID: number){
    this.db.deleteReperto(inputID).subscribe();
  }

  createFormData(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  upload(inputID: number) {
    this.imageData = new FormData();
    this.imageData.append('imageUpload', this.selectedFile, this.selectedFile.name);
    this.db.postImmagineReperto(this.imageData, inputID).subscribe();
  }
}
