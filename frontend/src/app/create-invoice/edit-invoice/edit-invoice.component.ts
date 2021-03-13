import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InvoiceService } from 'src/app/home/invoice.service';
import { AuthService } from 'src/app/login/auth.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css']
})
export class EditInvoiceComponent implements OnInit {
id:any
  data:any
  products:[]=[]

 CGST=0.00
  SGST=0.00
  IGST=0.00
  subtotal=0.00
  discount=0.00
  totalPrice=0.00
  updateForm:FormGroup
  
  constructor(private invoiceService:InvoiceService,
    private router:Router,private route:ActivatedRoute,
    private authService:AuthService) { }
  
  
  
   get controls() {
      return (<FormArray>this.updateForm.get('products')).controls;
    }
    addProduct() {
      (<FormArray>this.updateForm.get('products')).push(
        new FormGroup({
          'name': new FormControl(null),
          'qty': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'price': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      );
    }
  
    onDelete(index: number) {
      (<FormArray>this.updateForm.get('products')).removeAt(index);
    }
   
  getTotal(){
    let product=this.updateForm.value.products
   let totalPrice=product.reduce((a,b)=>a+b.price*b.qty,0)
  
   if(this.updateForm.get('currency').value==='USD'){
      this.subtotal=totalPrice
      this.totalPrice=totalPrice
   }else{
    if(this.updateForm.get('currency').value==='INR' && this.updateForm.get('state').value==='Haryana'){
       this.subtotal=totalPrice
       this.discount=totalPrice*0.05
       this.CGST=totalPrice*0.09
       this.SGST=totalPrice*0.09
       this.totalPrice=totalPrice-this.discount+this.CGST+this.SGST
    } else{
      this.subtotal=totalPrice
      this.discount=totalPrice*0.05
      this.IGST=totalPrice*0.18 
      this.totalPrice=totalPrice-this.discount+this.IGST
    }
   }
  }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=params['id']
        this.initForm();
       
      }
    )
  }



  private initForm(){
    let createdBy='';
    let name = '';
    let address = '';
    let contactNumber
    let email = '';
    let invoiceNumber = '';
    let invoiceDate 
    let currency = '';
    let state='';
    let subtotal
    let discount
    let CGST
    let SGST
    let IGST
    let totalPrice
    let products = new FormArray([]);
  

  this.invoiceService.getInvoiceById(this.id).subscribe(res=>{
      let invoice=res
      
      createdBy=invoice.createdBy;
      name=invoice.name;
      address=invoice.address;
      contactNumber=invoice.contactNumber;
      email=invoice.email;
      invoiceNumber=invoice.invoiceNumber;
      invoiceDate=invoice.invoiceDate;
      currency=invoice.currency;
      state=invoice.state;
      subtotal=invoice.subtotal.toFixed(2);
      discount=invoice.discount.toFixed(2);
      CGST=invoice.CGST.toFixed(2);
      SGST=invoice.SGST.toFixed(2);
      IGST=invoice.IGST.toFixed(2);
      totalPrice=Number((invoice.totalPrice).toFixed(2));

    if(invoice['products']){
    for(let product of invoice.products){
      // const product=[]
      products.push(
        new FormGroup({
          'name': new FormControl(product.name, Validators.required),
          'qty': new FormControl(product.qty, Validators.required),
          'price': new FormControl(product.price, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
    }
  }
        this.updateForm = new FormGroup({
        'createdBy':new FormControl(createdBy,Validators.required),
    
        'name': new FormControl(name, Validators.required),
        'address': new FormControl(address, Validators.required),
        'contactNumber': new FormControl(contactNumber, Validators.required),
        'email': new FormControl(email, Validators.required),
        'invoiceNumber': new FormControl(invoiceNumber, Validators.required),
        'invoiceDate': new FormControl(invoiceDate, Validators.required),
        'currency': new FormControl(currency, Validators.required),
        'state': new FormControl(state, Validators.required),
        'subtotal':new FormControl(subtotal,Validators.required),
        'discount':new FormControl(discount,Validators.required),
        'CGST':new FormControl(CGST,Validators.required),
        'SGST':new FormControl(SGST,Validators.required),
        'IGST':new FormControl(IGST,Validators.required),
        'totalPrice':new FormControl(totalPrice,Validators.required),
        'products':products
        
      
      })
    
  })
  
}
  
onUpdate(id:number) {
  console.log(id)
  console.log(this.updateForm)

  const invoiceData={
    createdBy:this.updateForm.value.createdBy,
    name:this.updateForm.value.name,
    address:this.updateForm.value.address,
    contactNumber:this.updateForm.value.contactNumber,
    email:this.updateForm.value.email,
    invoiceNumber:this.updateForm.value.invoiceNumber,
    invoiceDate:this.updateForm.value.invoiceDate,
     currency:this.updateForm.value.currency,
    state:this.updateForm.value.state,
    
    subtotal:this.subtotal.toFixed(2),
    discount:this.discount.toFixed(2),
    CGST:this.CGST.toFixed(2),
    SGST:this.SGST.toFixed(2),
    IGST:this.IGST.toFixed(2),
    totalPrice:this.totalPrice.toFixed(2),
     products:this.updateForm.value.products
  }
  
  this.invoiceService.updateInvoice(id,invoiceData).subscribe(res=>{
  console.log(res)
  

  

  
})
this.router.navigate(['/manage-invoice'],{relativeTo:this.route})
}

onLogOut(){
  this.authService.logout()
  this.router.navigate([''],{relativeTo:this.route});
}


}

  