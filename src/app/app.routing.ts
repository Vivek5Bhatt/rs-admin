import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './pages/error/404.component';
import { P500Component } from './pages/error/500.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/admin-profile/admin-profile.module').then(m => m.AdminProfileModule)
      },
      {
        path: 'banner',
        loadChildren: () => import('./pages/banner/banner.module').then(m => m.BannerModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'affiliate',
        loadChildren: () => import('./pages/affliate/affliate.module').then(m => m.AffliateModule)
      },
      {
        path: 'vendor',
        loadChildren: () => import('./pages/vendor/vendor.module').then(m => m.VendorModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'group-name',
        loadChildren: () => import('./pages/group-name/group-name.module').then(m => m.GroupNameModule)
      },
      {
        path: 'delivery-charge',
        loadChildren: () => import('./pages/delivery-charge/delivery-charge.module').then(m => m.DeliveryChargeModule)
      },
      {
        path: 'discount',
        loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule)
      },
      {
        path: 'quote',
        loadChildren: () => import('./pages/quote/quote.module').then(m => m.QuoteModule)
      },
      {
        path: 'brand',
        loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule)
      },
      {
        path: 'delivery-notification',
        loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule)
      },
      {
        path: 'contact-info',
        loadChildren: () => import('./pages/contact-info/contact-info.module').then(m => m.ContactInfoModule)
      },
      {
        path: 'measurement',
        loadChildren: () => import('./pages/measurement-unit/measurement-unit.module').then(m => m.MeasurementUnitModule)
      },
      {
        path: 'user-notification',
        loadChildren: () => import('./pages/send-notification/send-notification.module').then(m => m.SendNotificationModule)
      },
      {
        path: 'vendor-notification',
        loadChildren: () => import('./pages/vendor-notification/vendor-notification.module').then(m => m.VendorNotificationModule)
      },
      {
        path: 'application',
        loadChildren: () => import('./pages/application/application.module').then(m => m.ApplicationModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'career',
        loadChildren: () => import('./pages/career/career.module').then(m => m.CareerModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsModule)
      },
      {
        path: 'request',
        loadChildren: () => import('./pages/request/request.module').then(m => m.RequestModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
