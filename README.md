# dynamic-list

This Angular package features a robust and dynamic table component designed to display any response data efficiently. It integrates essential functionalities including pagination, sorting, and CRUD (Create, Read, Update, Delete) actions to enhance user experience and data management.


## Features

This Angular pakage features a dynamic table that displays any responce data with the following functionalities:

- Pagination: Allows users to navigate through pages of data.
- Sorting: Enables sorting of table columns in ascending or descending order.
- CRUD Actions:
   - Edit its redirect to your edit page.
   - View: its redirect to your view page.
   - Delete: its call your delete function with event emitter.


## Install

```

```

## Call in module file

```js
import { DynamicListModule } from 'dynamic-list';


//import in module imports section like :

@NgModule({
  declarations: [],
  imports: [DynamicListModule],
  providers: [],
  bootstrap: [AppComponent]
})


```

## Call in component file

```js

title = 'My List Page Title';

  itemsTitles = [
    { key: "user_id", value: "User Id", isSearch: true },
    { key: "name", value: "Name", isSearch: true },
    { key: "email", value: "Email", isSearch: true },
    { key: "phone", value: "Phone", isSearch: true },
    { key: "email", value: "Email", isSearch: true }
  ];

  actionMenus = [
    {
      name: 'View',
      ridirectUrl: '/view/',
      isConfirm: false,
      fieldName: '_id'
    },
    {
      name: 'Edit',
      ridirectUrl: '/add/',
      isConfirm: false,
      fieldName: '_id'
    },
    {
      name: 'Delete',
      ridirectUrl: '',
      isConfirm: true,
      fieldName: '_id'
    }
  ];

  myListData: any = [];

  paginationItems = {
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0
  }

  sortingVal = {
    sort: '',
    sort_order: '',
  }

  searchVal =  {
    searchBy: '',
    searchTerm: ''
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllData();
  }


  getAllData() {

    let options = {
      current: this.paginationItems.currentPage,
      limit: this.paginationItems.itemsPerPage,
      sort: this.sortingVal.sort,
      sort_order: this.sortingVal.sort_order,
      searchBy: this.searchVal.searchBy,
      searchTerm: this.searchVal.searchTerm,
    }

    this.dataService.getUsers(options).subscribe((res: any) => {
      this.myListData = res ? res?.data?.data : [];      
      let totalData = res?.count;
      this.paginationItems.totalPages = Math.ceil(totalData / this.paginationItems.itemsPerPage);
    });

  }



  pageItemDelete(del_id: any) {
    console.log(del_id)
  }

  onGoTo(pageNo: any) {
    this.paginationItems.currentPage = pageNo;
    this.getAllData();
  }

  onNext(pageNo: any) {
    this.paginationItems.currentPage = this.paginationItems.currentPage + 1;
    this.getAllData();
  }


  onPrev(pageNo: any) {
    this.paginationItems.currentPage = this.paginationItems.currentPage - 1;
    this.getAllData();
  }

  sorting(sortOptions: any) {
    this.sortingVal.sort = sortOptions.sortKey;
    this.sortingVal.sort_order = sortOptions.sortDirection == false ? 'asc' : 'desc';
    this.getAllData();
  }

  search(searchOpt:any){
    this.searchVal.searchBy = searchOpt.searchBy;
    this.searchVal.searchTerm = searchOpt.searchTerm;    
    this.getAllData();
  }

  reset(searchOpt:any){
    this.searchVal.searchBy = searchOpt.searchBy;
    this.searchVal.searchTerm = searchOpt.searchTerm;    
    this.getAllData();
  }


```

## Call in html tamplate

```html
<lib-dynamic-list 
[title]="title" 
[itemTitles]="itemsTitles" 
[items]="myListData" 
[actionMenus]="actionMenus" 
[paginationItems]="paginationItems" 
(toDel)="pageItemDelete($event)" 
(onGoPage)="onGoTo($event)"
(next)="onNext($event)" 
(prev)="onPrev($event)" 
(toSort)="sorting($event)" 
(toSearch)="search($event)" 
(toReset)="reset($event)">
</lib-dynamic-list>
```


## license
MIT

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/posts/dilip-shaw-2740769_dilipabcnodeframe1-activity-6576729679556853760-JiaP)


## 🚀 About Me
I'm a full stack developer. Experienced developer with over 20 years of expertise in crafting scalable web applications. Proficient in frontend technologies such as Angular and React, alongside extensive experience in WordPress, Drupal, and backend frameworks like Node.js. With a proven track record of delivering high-quality solutions to meet client needs and drive business objectives, I bring a versatile skill set and a commitment to excellence to every project.


## Feedback

If you have any feedback, please reach out to us at dilipabc@gmail.com