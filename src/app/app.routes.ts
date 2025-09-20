import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Brands } from './features/brands/brands';
import { ProductDetailes } from './features/product-detailes/product-detailes';
import { Products } from './features/products/products';
import { Cart } from './features/cart/cart';
import { Login } from './features/login/login';
import { SignUp } from './features/sign-up/sign-up';
import { Categories } from './features/categories/categories';
import { Notfound } from './features/notfound/notfound';
import { Card } from './features/card/card';

import { authGuard } from './core/guard/auth-guard';
import { loggedInGuard } from './core/guard/logged-in-guard';
import { ForgetPassword } from './features/forget-password/forget-password';
import { Checkout } from './features/checkout/checkout';
import { AllOrders } from './features/all-orders/all-orders';
import { WishList } from './features/wish-list/wish-list';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'brands',component:Brands},
    {path:'productDetails/:id',component:ProductDetailes ,data: { renderMode: 'client' }},
    {path:'products',component:Products},
    {path:'cart',component:Cart,canActivate:[authGuard]},
    {path:'allorders',component:AllOrders,canActivate:[authGuard]},
    {path:'wishlist',component:WishList,canActivate:[authGuard]},
    {path:'checkout/:id',component:Checkout,canActivate:[authGuard], data: { renderMode: 'client' }},
    {path:'login',component:Login,canActivate:[loggedInGuard]},
    {path:'signUp',component:SignUp,canActivate:[loggedInGuard]},
    {path:'resetPassword',component:ForgetPassword,canActivate:[loggedInGuard]},
    {path:'categories',component:Categories},
    {path:'**',component:Notfound},
    {path:'card',component:Card},
    
];
