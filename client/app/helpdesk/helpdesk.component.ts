import { Component, OnInit } from '@angular/core';
import { Helpdesk } from '../shared/models/helpdesk.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { HelpDeskService } from '../services/helpdesk.service';
import { Subcat } from '../shared/models/subcat.model';
import { SubcatService } from '../services/subcat.service';
import { CatService } from '../services/cat.service';
import { Cat } from '../shared/models/cat.model';


@Component({
    selector: 'app-helpdesk',
    moduleId: module.id,
    templateUrl: 'helpdesk.component.html'
})

export class HelpDeskComponent implements OnInit{

    helpdesk = new Helpdesk();
    model: any = {};
    cats: string[] = [];
    singleCat: any [];

    types: string[] = [];
    subcats: Subcat[] = [];

    help_desk_lists: Helpdesk[] = [];
    category_namse: any[] = [];
    subCatData: any[];
    helpdeskData: any [];
    helpdeskObj: string[] = [];

    statuses: string[] = ['Pendind', 'Completed', 'On-going', 'Rejected'];

    constructor(
        private subcatService: SubcatService,
        public toast: ToastComponent,
        private helpdeskService: HelpDeskService,
        private catService: CatService
    ) {}

    ngOnInit() {
        // fetch the value of dropdown and grid on page load
        this.getHelpdeskDetails();

    }

    helpDeskDetail() {}

    getCats(){
        this.catService.getCats().subscribe(categories => {
            this.singleCat = categories;
            return this.types = this.singleCat;
        });
    }

    onSelect(ddlSelect, helpdeskObj){
        this.helpdeskService.update(ddlSelect, helpdeskObj).subscribe(desk => {
          // console.log('DESK', desk)
        })
      }


    getHelpdeskDetails() {

        this.getCats();
        this.getSubCats();

        this.helpdeskService.getHelpdeskDetails().subscribe(helpdeskObj => {
            for(var j = 0; j<= helpdeskObj.length; j++) {
                if(typeof helpdeskObj[j] != 'undefined') {
                    for(var i=0; i<= this.types.length; i++) {
                        if (typeof this.types[i] != 'undefined') {
                            for(let k =0; k<= this.subCatData.length; k++) {
                                if (typeof this.subCatData[k] != 'undefined') {
                                    if(helpdeskObj[j].category == this.types[i]['_id']) {
                                        helpdeskObj[j].category = this.types[i]['name'];
                                        helpdeskObj[j].subcategory = this.subCatData[i]['subcategoryname'];
                                        this.help_desk_lists.push(helpdeskObj[j]);

                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    getSubCats() { this.subcatService.getSubCats().subscribe(subCatObj => { this.subCatData = subCatObj;}); }

}
