import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInvoiceRoutingModule } from './create-invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateInvoiceComponent, EditInvoiceComponent],
  imports: [
    CommonModule,
    CreateInvoiceRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  

  ]
})
export class CreateInvoiceModule { }
