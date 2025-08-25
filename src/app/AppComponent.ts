import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { HeroComponent } from './sections/hero/hero';
import { CatalogComponent } from './sections/catalog/catalog';

import { TestimonialsComponent } from './sections/testimonials/testimonials';
import { ContactComponent } from './sections/contact/contact';
import { CommonModule } from '@angular/common';
import { BusinessLoanComponent } from './sections/financing/financing';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,
    HeroComponent, CatalogComponent, TestimonialsComponent, ContactComponent,BusinessLoanComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
