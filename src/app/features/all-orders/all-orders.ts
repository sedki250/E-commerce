import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AllOrdersService } from '../../core/service/allorders/all-orders-service';

@Component({
  selector: 'app-all-orders',
  imports: [],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.scss'
})
export class AllOrders implements OnInit{
private allOredersService=inject(AllOrdersService)
ordersList:WritableSignal<any>=signal([])

getAllOrders(){
  this.allOredersService.getAllOrders().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.ordersList.set(res.data)
      
    }
  })
}
getUsersOrder(){
   this.allOredersService.getOredersUser('cartId').subscribe({
        next:(res)=>{
          console.log(res.data);
          this.ordersList.set(res.data)
        }
      })
}
ngOnInit(): void {
    this.getAllOrders()
    this.getUsersOrder()
}
}
