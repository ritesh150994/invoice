import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


import { AuthService } from '../login/auth.service';
import { Invoice } from '../models/invoice.model';
import { HomeService } from './home.service';
import { User } from './users.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  displayedColumns: string[] = [ 'name', 'email','actions'];
  // dataSource:User[]=[]
  @ViewChild(MatPaginator) paginator:MatPaginator
  dataSource:MatTableDataSource<any>
data:User

  constructor(
    private homeService:HomeService,
    private router:Router,private route:ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit(){
   let userdata=JSON.parse(localStorage.getItem('user'))
   console.log(localStorage.getItem('user'))
   console.log(userdata)

  //  Selection = new SelectionModel<Invoice>(true, []);

  //  /** Whether the number of selected elements matches the total number of rows. */
  //  isAllSelected() {
  //    const numSelected = this.selection.selected.length;
  //    const numRows = this.dataSource.data.length;
  //    return numSelected === numRows;
  //  }
 
  //  /** Selects all rows if they are not all selected; otherwise clear selection. */
  //  masterToggle() {
  //    this.isAllSelected() ?
  //        this.selection.clear() :
  //        this.dataSource.data.forEach(row => this.selection.select(row));
  //  }

   if(userdata.isSuperAdmin===true){
    this.homeService.getUsers()
    .subscribe(rowData=>{
      this.dataSource=new MatTableDataSource(rowData)
      console.log(this.dataSource)
      this.dataSource.paginator=this.paginator
      document.body.className="image"
    }) 
   }else{
     console.log('access denied')
  //    this.homeService.getUserById(id)
  //    .subscribe(data=>{
  //      console.log(data)
  //      this.dataSource=new MatTableDataSource(data)
  //    })
  
   }
  }


  ngOnDestroy(){
    document.body.className=""
  }


Create(){
    this.router.navigate(['/create'])
 }
    
 
 onEdit(id:number){
      console.log(id)
      this.router.navigate([`/${id}/edit`],{relativeTo:this.route});
    }

   
onDelete(id:number){
        let r= confirm('Do you want to delete this???')
     if(r===true){
      console.log(id)
      this.homeService.deleteId(id)
      .subscribe(res=>{
        console.log(res)
        // this.dataSource=this.dataSource.filter()
      })
     }else{
       console.log("not removed user")
     }
    
    }


onLogOut(){
      this.authService.logout()
      this.router.navigate([''],{relativeTo:this.route});
    }
   
}


