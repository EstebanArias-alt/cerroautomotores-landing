// src/app/sections/catalog/catalog.component.ts
import { Component, input, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';

type Item = {
  id: string;                 // único (usa un slug simple si no tenés id real)
  tipo: 'Auto' | 'Moto';
  titulo: string;
  precio: number;
  moneda?: 'USD' | 'ARS';
  img: string;
  anio?: number;
  km?: number;
  estado?: 'Nuevo' | 'Usado';
};

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgOptimizedImage],
  template: `
<section id="catalogo" class="scroll-mt-24 py-16 bg-brand-dark text-white">
  <div class="mx-auto max-w-7xl px-4">
    <!-- Encabezado -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold">Unidades destacadas</h2>
        <p class="text-brand-gray mt-1">Stock curado de autos y motos. Financiación disponible.</p>
      </div>
      <a [href]="'https://wa.me/' + whatsapp()" target="_blank" rel="noopener"
         class="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-brand text-white font-medium hover:bg-brand-light transition">
        Consultar por WhatsApp
      </a>
    </div>

    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <article *ngFor="let it of items(); trackBy: trackById"
               class="group rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/[0.06]
                      hover:ring-brand hover:bg-white/[0.08] transition
                      shadow-[0_8px_30px_rgba(0,0,0,.25)] hover:shadow-[0_10px_40px_rgba(0,0,0,.35)]
                      will-change-transform hover:-translate-y-0.5">
        <!-- Media -->
        <div class="relative">
          <div class="overflow-hidden bg-white/5 aspect-[4/3]">
            <!-- skeleton -->
            <div class="absolute inset-0 animate-pulse bg-white/[0.06]" *ngIf="!loaded[it.id]"></div>
            <img
              [ngSrc]="it.img" [alt]="it.titulo" width="800" height="600" decoding="async"
              class="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
              (load)="onLoad(it.id)" (error)="onError(it.id)" />
          </div>

          <!-- overlay gradiente para legibilidad de chips -->
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent"></div>

          <!-- chip tipo -->
          <span class="absolute left-3 top-3 text-[11px] uppercase tracking-wide px-2 py-1 rounded-md
                       bg-brand/90 text-white ring-1 ring-white/10">
            {{ it.tipo }}
          </span>

          <!-- chip estado opcional -->
          <span *ngIf="it.estado" class="absolute left-3 top-11 text-[11px] uppercase tracking-wide px-2 py-1 rounded-md
                       bg-white/15 backdrop-blur ring-1 ring-white/15">
            {{ it.estado }}
          </span>

          <!-- precio arriba a la derecha -->
          <div class="absolute right-3 top-3 rounded-xl px-3 py-1.5 bg-white/95 text-brand-dark font-semibold
                      shadow-sm ring-1 ring-black/5">
            {{ it.precio | currency:(it.moneda || 'USD'):'symbol':'1.0-0' }}
          </div>
        </div>

        <!-- Body -->
        <div class="p-4">
          <h3 class="text-lg font-semibold leading-snug">{{ it.titulo }}</h3>

          <!-- chips specs -->
          <div class="mt-2 flex flex-wrap gap-2 text-sm">
            <span *ngIf="it.anio" class="px-2 py-1 rounded-lg bg-white/5 ring-1 ring-white/10 text-white/80">
              {{ it.anio }}
            </span>
            <span *ngIf="it.km !== undefined" class="px-2 py-1 rounded-lg bg-white/5 ring-1 ring-white/10 text-white/80">
              {{ it.km | number:'1.0-0' }} km
            </span>
          </div>

          <!-- CTA -->
          <div class="mt-4 flex gap-2">
            <a [href]="'https://wa.me/' + whatsapp() + '?text=Me%20interesa:%20' + encode(it.titulo)"
               target="_blank" rel="noopener"
               class="flex-1 inline-flex items-center justify-center rounded-lg px-3 py-2
                      bg-brand text-white font-medium hover:bg-brand-light transition">
              Consultar
            </a>
            <a href="#contacto"
               class="inline-flex items-center justify-center rounded-lg px-3 py-2
                      border border-white/20 text-white/80 hover:border-brand hover:text-brand-light transition">
              Ver más
            </a>
          </div>
        </div>
      </article>
    </div>

    <!-- Nota -->
    <p class="mt-6 text-center text-xs text-white/50">
      * Imágenes ilustrativas. Confirmá disponibilidad y condiciones con un asesor.
    </p>
  </div>
</section>
  `,
})
export class CatalogComponent {
  whatsapp = input('5493880000000');

  // 🔧 ejemplo: reemplazá por tu data real
  items = input<Item[]>([
    { id:'cronos', tipo:'Auto', titulo:'Fiat Cronos Precision', precio:13500, moneda:'USD', anio:2021, km:42000, img:'assets/autos/cronos.jpg', estado:'Usado' },
    { id:'cb190r', tipo:'Moto', titulo:'Honda CB190R',          precio: 3500, moneda:'USD', anio:2022, km: 8200, img:'assets/motos/cb190r.jpg', estado:'Usado' },
    { id:'onixltz',tipo:'Auto', titulo:'Chevrolet Onix LTZ',    precio:12900, moneda:'USD', anio:2020, km:60000, img:'assets/autos/onix.jpg',   estado:'Usado' },
  ]);

  // estado de carga por card
  loaded: Record<string, boolean> = {};

  onLoad(id: string){ this.loaded[id] = true; }
  onError(id: string){
    this.loaded[id] = true;
    // opcional: imagen fallback
    // (creá assets/placeholder.webp si querés un placeholder)
    // this.replaceImgById(id, 'assets/placeholder.webp');
  }

  encode(text: string){ return encodeURIComponent(text); }
  trackById = (_: number, it: Item) => it.id;

  // Si usás fallback manual, podés ubicar el <img> via DOM, pero idealmente cambiá la data del item en tu fuente
}
