import { CategoryService } from './../../core/service/categories/category-service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategorySlider } from "../category-slider/category-slider";

@Component({
  selector: 'app-categories',
  imports: [CategorySlider],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})

export class Categories implements OnInit{
ngOnInit(): void {
    this.getAllCategories()
}
private category=inject(CategoryService)
dataList:WritableSignal<any[]>=signal([])

getAllCategories(){
  this.category.getAllCategories().subscribe({
    next:(res)=>{
      
      this.dataList.set(res.data)
    },error:()=>{

    }
  })
}
}
