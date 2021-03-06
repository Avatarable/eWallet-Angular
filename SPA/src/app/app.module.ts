import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CourseListComponent } from './shared/components/course-list/course-list.component';
import { AuthModule } from './modules/auth/auth.module';
import { NgProgressModule } from 'ngx-progressbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';
import { ConfirmEqualValidatorDirective } from './shared/directives/confirm-equal-validator.directive';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthComponent } from './modules/auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    ManagerComponent,
    HeaderComponent,
    FooterComponent,
    CourseListComponent,
    ConfirmEqualValidatorDirective,
    SidebarComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    NgProgressModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: 'right' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
