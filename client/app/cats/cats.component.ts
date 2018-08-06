import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatService } from '../services/cat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';
import { CatType } from '../shared/models/category_type.model';
import { CategoryTypeService } from '../services/category_type.service';


@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  cattype = new CatType();
  cattypes: CatType [] = [];

  addCatForm: FormGroup;
  name = new FormControl('', Validators.required);
  category_type= new FormControl('', Validators.required);

  constructor(private catService: CatService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public catTypeService: CategoryTypeService) { }

  ngOnInit() {
    this.getCats();
    this.getCatTypes();
    this.addCatForm = this.formBuilder.group({
      name: this.name,
      category_type: this.category_type,
    });
  }

  getCatTypes(){
    this.catTypeService.getCatTypes().subscribe(
      data => this.cattypes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getCats() {
    this.catService.getCats().subscribe(
      data => {
        this.catTypeService.getCatTypes().subscribe(cattypes => {
          for( var x in data){
            for (var y in cattypes){
              if(data[x]["category_type"] == cattypes[y]["_id"]){
                data[x]["category_type"] = cattypes[y]["_id"];
                data[x]["category_type_name"] = cattypes[y]["category_type"];
              }
            }
          }
          this.cats = data;
          // console.log('dd', this.cats)
        });
      }
    );
  }

  addCat() {
    this.catService.addCat(this.addCatForm.value).subscribe(
      res => {
        this.cats.push(res);
        this.addCatForm.reset();
        this.getCats();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cat: Cat) {
    var cat_data :any ;
    cat_data = cat;
    this.isEditing = true;

      this.catTypeService.getCatTypes().subscribe(cattypes => {
          for (var y in cattypes){
            if(cat["category_type"] == cattypes[y]["_id"]){
              cat["category_type"] = cattypes[y]["_id"];
              cat["category_type_name"] = cattypes[y]["category_type"];
            }
          }
        this.cat = cat;
    });
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = new Cat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
    this.addCatForm.reset();
  }

  editCat(cat: Cat) {
    this.catService.editCat(cat).subscribe(
      () => {
        this.isEditing = false;
        this.addCatForm.reset();
        this.getCatTypes();
        this.getCats();
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCat(cat: Cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        () => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
