# dynamic-list-page

This Angular package features a robust and dynamic table component designed to display any response data efficiently. It integrates essential functionalities including pagination, sorting, and CRUD (Create, Read, Update, Delete) actions to enhance user experience and data management.

## Uses

To import and use a module from a package named dynamic-list-page in your Angular project, you need to follow these steps:

    - Install the Package: Ensure the package is installed in your project.
    - Import the Module: Import the DynamicListModule in your Angular module file.
    - Use the Module: Utilize the components, directives, or services provided by the module in your application.



## Install

```
npm install dynamic-list-page
```

## Example: Dynamic List Component with Pagination, Sorting, and Actions

Here's a more detailed example assuming the dynamic-list-page provides a DynamicListComponent that handles pagination, sorting, and CRUD actions.


## Import the Module app.module.ts

```js

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DynamicListModule } from 'dynamic-list-page'; // Import the module here

@NgModule({
  declarations: [ 
    AppComponent,
    // other components
  ],
  imports: [
    BrowserModule,
    DynamicListModule, // Include the module here
    // other modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



```

## app.component.ts (Optional)

If you need to pass any data or configuration to the DynamicListComponent, you can use Angular's input bindings. For example:

```js

// Define any properties you need to pass to the dynamic list component


//Page Title
title = 'My List Page Title';


// Table headers and Search defined
  itemsTitles = [
    { key: "user_id", value: "User Id", isSearch: true },
    { key: "name", value: "Name", isSearch: true },
    { key: "email", value: "Email", isSearch: true },
    { key: "phone", value: "Phone", isSearch: true },
    { key: "email", value: "Email", isSearch: true }
  ];

//Action menu defined
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
  //Enable Disable Function As per your requirement
  functionEnable = [{
    pagination: true,
    sorting: true, 
    searching: true
  }];

//data pass for listing
  myListData: any = [];
// Pagination control items
  paginationItems = {
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0
  }
// Sorting control items
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

  //Data received from service api
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


  //Item Delete function
  pageItemDelete(del_id: any) {
    console.log(del_id)
  }
  // Sorting function
  sorting(sortOptions: any) {
    this.sortingVal.sort = sortOptions.sortKey;
    this.sortingVal.sort_order = sortOptions.sortDirection == false ? 'asc' : 'desc';
    this.getAllData();
  }
  //Searching function
  search(searchOpt:any){
    this.searchVal.searchBy = searchOpt.searchBy;
    this.searchVal.searchTerm = searchOpt.searchTerm;    
    this.getAllData();
  }
  //search form reset
  reset(searchOpt:any){
    this.searchVal.searchBy = searchOpt.searchBy;
    this.searchVal.searchTerm = searchOpt.searchTerm;    
    this.getAllData();
  }
  // Pagination function for no
  onGoTo(pageNo: any) {
    this.paginationItems.currentPage = pageNo;
    this.getAllData();
  }
  // Pagination function for next button
  onNext(pageNo: any) {
    this.paginationItems.currentPage = this.paginationItems.currentPage + 1;
    this.getAllData();
  }

   // Pagination function for prev button
  onPrev(pageNo: any) {
    this.paginationItems.currentPage = this.paginationItems.currentPage - 1;
    this.getAllData();
  }


```

## app.component.html (With Input Bindings)

```html
<lib-dynamic-list 
[title]="title" 
[itemTitles]="itemsTitles" 
[funEnable]="functionEnable"
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

## Summary

By following these steps, you can import and use the DynamicListModule from the dynamic-list-page package in your Angular application. Ensure you check the documentation of the package for specific details on the components, directives, or services it provides and how to use them effectively.


![Logo](https://rccbltd.co.in/assets/frontend/images/1.png)


## Features

This Angular pakage features a dynamic table that displays any responce data with the following functionalities:

- Pagination: Allows users to navigate through pages of data.
- Sorting: Enables sorting of table columns in ascending or descending order.
- CRUD Actions:
   - Edit its redirect to your edit page.
   - View: its redirect to your view page.
   - Delete: its call your delete function with event emitter.


## license
MIT

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/posts/dilip-shaw-2740769_dilipabcnodeframe1-activity-6576729679556853760-JiaP)


## 🚀 About Me
I'm a full stack developer. Experienced developer with over 20 years of expertise in crafting scalable web applications. Proficient in frontend technologies such as Angular and React, alongside extensive experience in WordPress, Drupal, and backend frameworks like Node.js. With a proven track record of delivering high-quality solutions to meet client needs and drive business objectives, I bring a versatile skill set and a commitment to excellence to every project.


## Feedback

If you have any feedback, please reach out to us at dilipabc@gmail.com