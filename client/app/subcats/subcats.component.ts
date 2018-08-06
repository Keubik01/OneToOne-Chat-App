import { Component, OnInit } from '@angular/core';
import { SubcatService } from '../services/subcat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Subcat } from '../shared/models/subcat.model';
import { CatService } from '../services/cat.service';
import { Cat } from '../shared/models/cat.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CatType } from '../shared/models/category_type.model';
import { CategoryTypeService } from '../services/category_type.service';

@Component({
  selector: 'app-subcats',
  templateUrl: './subcats.component.html',
  styleUrls: ['./subcats.component.css']
})
export class SubCatsComponent implements OnInit {

  subcat = new Subcat();
  cat = new Cat();

  subcats: Subcat[] = [];
  cats: Cat[] = [];

  cattype = new CatType();
  cattypes: CatType [] = [];

  model: any = {};
  loading = false;
  subCatData: any [];
  singleCat: any [];
  // types: string[] = [];
  categories: string[] = [];
  subcategory_list:any = [];
  isLoading = true;
  isEditing = false;


addSubCatForm: FormGroup;
subcategoryname = new FormControl('', Validators.required);
category_id= new FormControl('', Validators.required);
category_type = new FormControl('', Validators.required);

  constructor(private subcatService: SubcatService,
              public toast: ToastComponent,
              private catService: CatService,
              private formBuilder: FormBuilder,
              public catTypeService: CategoryTypeService
            ) {}

  ngOnInit() {
    this.getCats();
    this.getSubCats();
    this.getCatTypes();

    this.addSubCatForm = this.formBuilder.group({
        subcategoryname: this.subcategoryname,
        category_id: this.category_id,
        category_type: this.category_type
      });
  }


  getSubCats() {

    this.subcatService.getSubCats().subscribe(
      data => {
        this.catService.getCats().subscribe(cats =>{
          this.catTypeService.getCatTypes().subscribe( cattypes =>{
            for (var x in data){
              // console.log('data[x]')
              for (var y in cats){
                for(var z in cattypes){
                  // console.log('getcattype==', cattypes[z])
                  if(data[x]["category_id"] == cats[y]["_id"]){
                    data[x]["category_id"] = cats[y]["_id"];
                    data[x]["category_name"] = cats[y]["name"];
                  }
                  if(data[x]["category_type"] == cattypes[z]["_id"]){
                    data[x]["category_type"] = cattypes[z]["_id"];
                    data[x]["category_type_name"] = cattypes[z]["category_type"];
                  }
                }
              }
            }
          this.subcategory_list = data;
          });
        });
      },
        error => console.log(error),
       () => this.isLoading = false
    );
  }


  getCatTypes(){
    this.catTypeService.getCatTypes().subscribe(
      data => this.cattypes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

   // CATEGORY NAMES DROPDOWN BIND
  getCats(){
    this.catService.getCats().subscribe(categories => { this.singleCat = categories;
        return this.cats = this.singleCat;
    });
  }

findCategory(category_type) {
    this.catTypeService.getCatById(category_type).subscribe(res =>{
      this.cats = res;
    });
}

addSubCat() {
  // console.log(this.addSubCatForm.value);
    this.subcatService.addSubCat(this.addSubCatForm.value).subscribe(
      res => {
        this.subcategory_list.push(res);
        this.addSubCatForm.reset();
        this.getSubCats();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

cancelEditing() {
  this.isEditing = false;
  this.subcat = new Subcat();
  this.toast.setMessage('item editing cancelled.', 'warning');
  this.addSubCatForm.reset();
}


enableEditing(subcat: Subcat) {
  var cat_type_data : any;
  cat_type_data = subcat;
  this.isEditing = true;

  this.catTypeService.getCatTypes().subscribe(cattypes =>{
    this.catService.getCats().subscribe(cats =>{
      for (var y in cats){
        for(var z in cattypes){
          if(subcat["category_id"] == cats[y]["_id"]){
            subcat["category_id"] = cats[y]["_id"];
            subcat["category_name"] = cats[y]["name"];
          }
          if(subcat["category_type"] == cattypes[z]["_id"]){
            subcat["category_type"] = cattypes[z]["_id"];
            subcat["category_type_name"] = cattypes[z]["category_type"];
          }
        }
      }
      this.subcat = subcat;
    });
  });
  this.catTypeService.getCatById(cat_type_data.category_type).subscribe(res =>{
    this.cats = res;
  });
}


editSubCat(subCat_obj){
  this.subcatService.editSubCat(subCat_obj).subscribe(
      () => {
        this.isEditing = false;
        this.getSubCats();
        this.addSubCatForm.reset();
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
      );
  }

deleteSubCat(subcat: Subcat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.subcatService.deleteSubCat(subcat).subscribe(
        () => {
          const pos = this.subcategory_list.map(elem => elem._id).indexOf(subcat._id);
          this.subcategory_list.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
