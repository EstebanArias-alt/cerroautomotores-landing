// src/app/sections/business-loan/business-loan.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-business-loan',
  standalone: true,
  imports: [FormsModule, CommonModule, DecimalPipe],
  template: `
<section id="prestamos" class="scroll-mt-24 py-16 bg-brand-dark text-white">
  <div class="mx-auto max-w-4xl px-4">
    <h2 class="text-3xl md:text-4xl font-bold">Préstamos a Negocios</h2>
    <p class="text-brand-gray mt-2">Calculá una cuota aproximada según monto, cuotas y periodicidad.</p>

    <div class="mt-6 grid md:grid-cols-4 gap-4">
      <label class="block">
        <span class="block text-sm text-white/80">Monto</span>
        <input type="number" [(ngModel)]="monto" min="10000" step="1000"
               class="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/15 placeholder:text-white/40 focus:outline-none focus:ring-brand"
               placeholder="Ej: 500000" />
      </label>

      <label class="block">
        <span class="block text-sm text-white/80">Cuotas</span>
        <input type="number" [(ngModel)]="cuotas" min="1" max="180" step="1"
               class="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/15 focus:outline-none focus:ring-brand"
               placeholder="Ej: 12" />
      </label>

      <label class="block">
        <span class="block text-sm text-white/80">Periodicidad</span>
        <select [(ngModel)]="periodicidad"
                class="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/15 focus:outline-none focus:ring-brand">
          <option value="quincena">Quincenal (15%)</option>
          <option value="diario">Diaria (2%)</option>
        </select>
      </label>

      <div class="flex items-end">
        <button (click)="calc()"
                class="w-full rounded-lg px-4 py-2 bg-brand text-white font-semibold hover:bg-brand-light transition">
          Calcular
        </button>
      </div>
    </div>

    <div *ngIf="valorCuota" class="mt-5 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
      <div class="text-lg">
        Cuota estimada:
        <span class="text-brand font-extrabold">{{ valorCuota | number:'1.0-0' }}</span>
      </div>
      <div class="mt-1 text-white/70 text-sm">
        Total a pagar: <b>{{ total | number:'1.0-0' }}</b> (capital + interés en {{ cuotas }} {{ periodicidad }})
      </div>
    </div>

    <a [href]="waLink"
       target="_blank" rel="noopener"
       class="inline-block mt-6 px-5 py-3 bg-brand text-white rounded-xl font-semibold hover:bg-brand-light transition">
      Solicitar por WhatsApp
    </a>
  </div>
</section>
  `,
})
export class BusinessLoanComponent {
  monto = 500000;
  cuotas = 12;
  periodicidad: 'quincena' | 'diario' = 'quincena';

  valorCuota = 0;
  total = 0;
  waLink = this.buildWa('');

  private readonly tasaQuincena = 0.15; // 15%
  private readonly tasaDiaria = 0.02;   // 2%

  calc() {
    const m = Math.max(0, this.monto || 0);
    const n = Math.max(1, this.cuotas || 1);
    const r = this.periodicidad === 'quincena' ? this.tasaQuincena : this.tasaDiaria;

    const total = m * (1 + r * n); // interés simple acumulado
    this.total = total;
    this.valorCuota = total / n;

    const resumen =
      `Préstamo a negocios:%0A` +
      `Monto: ${this.format(this.monto)} ARS%0A` +
      `Periodicidad: ${this.periodicidad}%0A` +
      `Cuotas: ${this.cuotas}%0A` +
      `Cuota: ${this.format(this.valorCuota)} ARS%0A` +
      `Total: ${this.format(this.total)} ARS`;
    this.waLink = this.buildWa(resumen);
  }

  private buildWa(texto: string) {
    return `https://wa.me/5493880000000?text=${texto}`;
  }

  private format(v: number) {
    return Math.round(v).toLocaleString('es-AR');
  }
}
