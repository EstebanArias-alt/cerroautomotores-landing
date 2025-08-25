// src/app/shared/navbar/navbar.component.ts
import { Component, signal, OnDestroy, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
<header class="fixed inset-x-0 top-0 z-50 transition-all duration-300 will-change-[background,backdrop-filter]"
        [ngClass]="shrink() ? 'bg-brand-dark/90 backdrop-blur-md shadow-sm' : 'bg-transparent backdrop-blur-0 shadow-none'">
  <nav class="mx-auto max-w-7xl px-4 flex items-center justify-between transition-[padding] duration-300"
       [ngClass]="shrink() ? 'py-3' : 'py-5'">
    <a href="#top" class="flex items-center gap-3">
      <img src="assets/logo.svg" alt="Cerro Automotores" class="h-7 w-auto" />
      <span class="hidden sm:inline text-white/90 font-semibold tracking-wide">Cerro Automotores</span>
    </a>

    <ul class="hidden md:flex gap-6 text-sm">
      <li><a href="#catalogo" class="text-white/90 hover:text-white">Catálogo</a></li>
      <li><a href="#financiacion" class="text-white/90 hover:text-white">Financiación</a></li>
      <li><a href="#testimonios" class="text-white/90 hover:text-white">Opiniones</a></li>
      <li><a href="#contacto" class="text-white/90 hover:text-white">Contacto</a></li>
    </ul>

    <a target="_blank" href="https://wa.me/5493880000000"
       class="hidden md:inline-block rounded-xl px-4 py-2 bg-brand text-white font-medium hover:bg-brand-light transition">
      WhatsApp
    </a>

    <button class="md:hidden inline-flex items-center justify-center rounded-lg p-2 border border-white/20 text-white"
            (click)="toggle()" aria-label="Abrir menú">
      <svg *ngIf="!open()" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M3.75 6.75A.75.75 0 014.5 6h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25A.75.75 0 014.5 11.25h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clip-rule="evenodd"/></svg>
      <svg *ngIf="open()" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd"/></svg>
    </button>
  </nav>

  <div *ngIf="open()" class="md:hidden border-t border-white/10 bg-brand-dark/95 text-white">
    <div class="mx-auto max-w-7xl px-4 py-3 space-y-2">
      <a href="#catalogo" (click)="close()" class="block py-2">Catálogo</a>
      <a href="#financiacion" (click)="close()" class="block py-2">Financiación</a>
      <a href="#testimonios" (click)="close()" class="block py-2">Opiniones</a>
      <a href="#contacto" (click)="close()" class="block py-2">Contacto</a>
      <a target="_blank" href="https://wa.me/5493880000000"
         class="inline-block mt-2 rounded-xl px-3 py-2 bg-brand text-white font-medium hover:bg-brand-light transition">WhatsApp</a>
    </div>
  </div>
</header>
  `
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  open = signal(false);
  shrink = signal(false);

  toggle(){ this.open.update(v => !v); }
  close(){ this.open.set(false); }

  private onScroll = () => { if (this.isBrowser) this.shrink.set(window.scrollY > 10); };

  ngAfterViewInit(){ if (!this.isBrowser) return; this.onScroll(); window.addEventListener('scroll', this.onScroll, {passive:true}); }
  ngOnDestroy(){ if (!this.isBrowser) return; window.removeEventListener('scroll', this.onScroll); }
}
