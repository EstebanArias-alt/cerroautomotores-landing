// src/app/sections/catalog/catalog.component.ts
import { Component, computed, signal, input } from '@angular/core';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Item = {
  tipo: 'Auto' | 'Moto';
  titulo: string;
  precio: number;
  moneda?: 'USD' | 'ARS';
  img: string;
  anio?: number;
  km?: number;
};

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, NgOptimizedImage],
  template: `
<section id="catalogo" class="scroll-mt-24 py-16 bg-brand-dark text-white">
  <div class="mx-auto max-w-7xl px-4">
    <!-- Header + acciones -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold">Unidades destacadas</h2>
        <p class="text-brand-gray mt-1">Filtrá por tipo o buscá por modelo.</p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <!-- Filtros tipo -->
        <div class="inline-flex rounded-xl overflow-hidden ring-1 ring-white/15">
          <button (click)="setTipo('Todos')"
                  class="px-3 py-2 text-sm transition"
                  [ngClass]="tipo() === 'Todos' ? 'bg-brand text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'">
            Todos
          </button>
          <button (click)="setTipo('Auto')"
                  class="px-3 py-2 text-sm transition"
                  [ngClass]="tipo() === 'Auto' ? 'bg-brand text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'">
            Autos
          </button>
          <button (click)="setTipo('Moto')"
                  class="px-3 py-2 text-sm transition"
                  [ngClass]="tipo() === 'Moto' ? 'bg-brand text-white' : 'bg-white/5 hover:bg-white/10 text-white/80'">
            Motos
          </button>
        </div>

        <!-- Buscador -->
        <input [(ngModel)]="q"
               placeholder="Buscar modelo…"
               class="px-3 py-2 rounded-xl bg-white/5 ring-1 ring-white/15 placeholder:text-white/40 focus:outline-none focus:ring-brand"
               />
        <button (click)="clear()"
                class="px-3 py-2 rounded-xl bg-white/5 ring-1 ring-white/15 hover:bg-white/10 text-white/80 text-sm">
          Limpiar
        </button>

        <a [href]="'https://wa.me/' + whatsapp()" target="_blank" rel="noopener"
           class="hidden md:inline-block rounded-xl px-4 py-2 bg-brand text-white font-medium hover:bg-brand-light transition">
          WhatsApp
        </a>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <article *ngFor="let it of visibles(); trackBy: trackByTitulo"
               class="bg-white/5 rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-brand transition shadow-sm hover:shadow-lg">
        <img [ngSrc]="it.img" [alt]="it.titulo" width="800" height="600" class="w-full h-48 object-cover" />
        <div class="p-4">
          <div class="flex items-center justify-between">
            <span class="text-xs uppercase tracking-wide px-2 py-1 rounded-md bg-brand/20 text-brand-light">{{ it.tipo }}</span>
            <span class="text-sm text-brand-gray" *ngIf="it.anio || it.km">
              {{ it.anio || '' }}<ng-container *ngIf="it.anio && it.km"> • </ng-container>{{ it.km ? (it.km | number:'1.0-0') + ' km' : '' }}
            </span>
          </div>
          <h3 class="text-lg font-semibold mt-2 text-white">{{ it.titulo }}</h3>
          <p class="mt-2 text-brand text-xl font-bold">{{ it.precio | currency:(it.moneda || 'USD'):'symbol':'1.0-0' }}</p>
          <div class="mt-3 flex gap-2">
            <a [href]="'https://wa.me/' + whatsapp() + '?text=Me%20interesa:%20' + encode(it.titulo)"
               target="_blank" rel="noopener"
               class="rounded-lg px-3 py-2 bg-brand text-white font-medium hover:bg-brand-light transition">Consultar</a>
            <a href="#contacto" class="rounded-lg px-3 py-2 border border-white/20 text-white/80 hover:border-brand hover:text-brand-light transition">Ver más</a>
          </div>
        </div>
      </article>
    </div>

    <!-- Vacío -->
    <div *ngIf="visibles().length === 0" class="mt-10 text-center text-white/70">
      No hay resultados para “{{ q }}”.
    </div>
  </div>
</section>
  `,
})
export class CatalogComponent {
  whatsapp = input('5493880000000');

  // Data de ejemplo (reemplazá por tu API o JSON)
  items = input<Item[]>([
    { tipo:'Auto', titulo:'Fiat Cronos Precision', precio: 13500, moneda:'USD', anio:2021, km:42000, img:'assets/autos/cronos.jpg' },
    { tipo:'Moto', titulo:'Honda CB190R',          precio: 3500,  moneda:'USD', anio:2022, km:8200,  img:'assets/motos/cb190r.jpg' },
    { tipo:'Auto', titulo:'Chevrolet Onix LTZ',    precio: 12900, moneda:'USD', anio:2020, km:60000, img:'assets/autos/onix.jpg' },
  ]);

  // Estado de filtros
  tipo = signal<'Todos' | 'Auto' | 'Moto'>('Todos');
  q: string = '';

  setTipo(t: 'Todos' | 'Auto' | 'Moto'){ this.tipo.set(t); }
  clear(){ this.q = ''; this.tipo.set('Todos'); }

  // Filtrado reactivo
  visibles = computed(() => {
    const T = this.tipo();
    const query = this.q.trim().toLowerCase();
    return this.items().filter(it => {
      const okTipo = (T === 'Todos') || (it.tipo === T);
      const okText = !query || it.titulo.toLowerCase().includes(query);
      return okTipo && okText;
    });
  });

  encode(text: string){ return encodeURIComponent(text); }
  trackByTitulo = (_: number, it: Item) => it.titulo;
}
