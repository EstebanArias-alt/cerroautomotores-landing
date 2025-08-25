// src/app/sections/hero/hero.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
<section id="top" class="relative w-full h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
  <picture class="absolute inset-0 -z-10">
    <source [attr.srcset]="bgMobileWebp()" media="(max-width: 767px)" type="image/webp">
    <source [attr.srcset]="bgMobileJpg()"  media="(max-width: 767px)">
    <source [attr.srcset]="bgDesktopWebp()" media="(min-width: 768px)" type="image/webp">
    <source [attr.srcset]="bgDesktopJpg()"  media="(min-width: 768px)">
    <img [src]="bgDesktopWebp()" alt="" class="w-full h-full object-cover" [style.objectPosition]="focusPosition()"
         loading="eager" fetchpriority="high">
  </picture>

  <!-- Degradados/overlay afinados a tu paleta -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/30 to-transparent"></div>
    <div class="pointer-events-none absolute -top-40 -left-40 w-[50rem] h-[50rem] rounded-full bg-brand/25 blur-3xl opacity-30"></div>
    <div class="pointer-events-none absolute -bottom-40 -right-40 w-[50rem] h-[50rem] rounded-full bg-brand-light/20 blur-3xl opacity-25"></div>
  </div>

  <div class="relative z-10 w-full max-w-3xl mx-auto px-6">
    <div class="rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,.25)]">
      <h1 class="text-4xl md:text-6xl font-extrabold leading-tight text-white">
        {{ title() }}
      </h1>
      <p class="mt-4 text-lg md:text-2xl text-white/85">
        {{ subtitle() }}
      </p>

      <div class="mt-6 grid sm:grid-cols-2 gap-3">
        <a href="#catalogo"
           class="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-brand text-white font-semibold hover:bg-brand-light transition">
          Ver catálogo
        </a>
        <a [href]="'https://wa.me/' + whatsapp()" target="_blank" rel="noopener"
           class="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-white text-brand-dark font-semibold hover:bg-white/90 transition">
          WhatsApp
        </a>
      </div>

      <div class="mt-5 flex flex-wrap gap-2 text-sm text-white/85">
        <span class="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15">✔ Atención personalizada</span>
        <span class="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15">✔ Financiación flexible</span>
        <span class="px-3 py-1 rounded-full bg-white/10 ring-1 ring-white/15">✔ Entrega rápida</span>
      </div>
    </div>
  </div>

  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-dark to-transparent"></div>
</section>
  `
})
export class HeroComponent {
  title = input('Cerro Automotores');
  subtitle = input('Seriedad y Confianza — Autos y motos con financiación a tu medida.');
  whatsapp = input('5493880000000');

  // Imágenes responsive (cambialas si querés)
  bgDesktopWebp = input('assets/hero-desktop.webp');
  bgDesktopJpg  = input('assets/hero-desktop.jpg');
  bgMobileWebp  = input('assets/hero-mobile.webp');
  bgMobileJpg   = input('assets/hero-mobile.jpg');

  focusPosition = input<'center' | string>('center'); // ej. '40% center'
}
