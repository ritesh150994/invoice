import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../home/invoice.service';
import { AuthService } from '../login/auth.service';
import { Invoice } from '../models/invoice.model';

@Component({
  selector: 'app-manage-invoice',
  templateUrl: './manage-invoice.component.html',
  styleUrls: ['./manage-invoice.component.css']
})
export class ManageInvoiceComponent implements OnInit {
  id:any
  displayedColumns: string[] = [ 'select','date', 'invoice','recipient','creator','actions','amount'];
  // dataSource:Invoice[]=[]
  @ViewChild(MatPaginator) paginator:MatPaginator
  @ViewChild(MatSort) sort:MatSort
  dataSource:MatTableDataSource<any>
 
  selection = new SelectionModel<Invoice>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


 
  constructor(
    private invoiceService:InvoiceService,
    private router:Router,private route:ActivatedRoute,
    private authService:AuthService
  
    ) { }

  ngOnInit(){
   let invoicedata=JSON.parse(localStorage.getItem('user'))
   console.log(localStorage.getItem('user'))
   console.log(invoicedata)
   document.body.className="manage"
   
   if(invoicedata.isSuperAdmin===true){
    this.invoiceService.getInvoices()
    .subscribe(rowData=>{
      console.log(rowData)
      this.dataSource=new MatTableDataSource(rowData)
      console.log(this.dataSource)
      this.dataSource.sort=this.sort
      this.dataSource.paginator=this.paginator
     
    }) 
   }else{
    this.invoiceService.getInvoiceByUserId()
    .subscribe(rowData=>{
      console.log(rowData)
      this.dataSource=new MatTableDataSource(rowData)
      console.log(this.dataSource)
      this.dataSource.paginator=this.paginator
  })
   
  }
}
 

  ngOnDestroy(){
    document.body.className=""
  }

 onEdit(id:number){
      console.log(id)
      this.router.navigate([`/${id}/edit-invoice`],{relativeTo:this.route});
    }

   
onDelete(id:number){
        let r= confirm('Are You sure,Do you want to delete this Invoice???')
     if(r===true){
      console.log(id)
      this.invoiceService.deleteId(id)
      .subscribe(res=>{
        console.log(res)
        // this.dataSource=this.dataSource.filter((value)=>value._id !== id)
      })
     }else{
       console.log("not removed invoice")
     }
    
    }

   

    onDownload(index:number){
    let invoice
    this.invoiceService.getInvoiceById(index).subscribe(res=>{
      invoice=res
      this.invoiceService.generatePDF(invoice)
    })

    }
   
    search(key:Event){
      this.dataSource.filter=(key.target as HTMLInputElement).value.trim().toLowerCase()
    }

onLogOut(){
      this.authService.logout()
      this.router.navigate([''],{relativeTo:this.route});
    }
   
}



