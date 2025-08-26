// src/app/sections/business-loan/business-loan.component.ts
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Periodicidad = 'quincena' | 'diario';

type Row = {
  periodo: number;
  cuota: number;
  interes: number;
  capital: number;
  saldo: number;
};

@Component({
  selector: 'app-business-loan',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, CurrencyPipe],
  template: `
<section id="prestamos" class="scroll-mt-24 py-16 bg-brand-dark text-white">
  <div class="mx-auto max-w-4xl px-4">
    <h2 class="text-3xl md:text-4xl font-bold">Préstamos a Negocios</h2>
    <p class="text-brand-gray mt-2">
      Calculá una cuota aproximada según monto, cuotas y periodicidad.
      Tasa por periodo: <b>Quincenal 15%</b> · <b>Diaria 2%</b>.
    </p>

    <!-- Form -->
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

    <!-- Resumen -->
    <div *ngIf="valorCuota" class="mt-5 rounded-xl bg-white/5 ring-1 ring-white/10 p-4">
      <div class="grid md:grid-cols-4 gap-4 text-center">
        <div>
          <div class="text-sm text-white/70">Monto</div>
          <div class="text-xl font-bold">{{ monto | currency:'ARS':'symbol-narrow':'1.0-0' }}</div>
        </div>
        <div>
          <div class="text-sm text-white/70">Cuotas</div>
          <div class="text-xl font-bold">{{ cuotas }}</div>
        </div>
        <div>
          <div class="text-sm text-white/70">Interés por {{ periodicidad === 'quincena' ? 'quincena' : 'día' }}</div>
          <div class="text-xl font-bold">{{ (tasa()*100) | number:'1.0-2' }}%</div>
        </div>
        <div>
          <div class="text-sm text-white/70">Cuota</div>
          <div class="text-2xl font-extrabold text-brand">{{ valorCuota | currency:'ARS':'symbol-narrow':'1.0-0' }}</div>
        </div>
      </div>

      <div class="mt-3 text-center md:text-right text-white/80">
        Total a pagar: <b>{{ total | currency:'ARS':'symbol-narrow':'1.0-0' }}</b>
      </div>

      <div class="mt-4 flex flex-wrap gap-2 justify-center md:justify-end">
        <button (click)="toggleTabla()" class="rounded-xl px-4 py-2 border border-white/20 hover:border-brand">
          {{ verTabla ? 'Ocultar' : 'Ver' }} tabla
        </button>
        <button (click)="descargarCSV()" class="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20">
          Descargar CSV
        </button>
        <a [href]="waLink" target="_blank" rel="noopener"
           class="rounded-xl px-5 py-2 bg-brand text-white font-semibold hover:bg-brand-light transition">
          Solicitar por WhatsApp
        </a>
      </div>
    </div>

    <!-- Tabla -->
    <div *ngIf="verTabla" class="mt-6 overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="bg-white/10">
          <tr class="text-left">
            <th class="px-3 py-2">Período</th>
            <th class="px-3 py-2">Cuota</th>
            <th class="px-3 py-2">Interés</th>
            <th class="px-3 py-2">Capital</th>
            <th class="px-3 py-2">Saldo</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let r of tabla; trackBy: trackByPeriodo" class="border-b border-white/10">
            <td class="px-3 py-2">{{ r.periodo }}</td>
            <td class="px-3 py-2">{{ r.cuota   | currency:'ARS':'symbol-narrow':'1.0-0' }}</td>
            <td class="px-3 py-2">{{ r.interes | currency:'ARS':'symbol-narrow':'1.0-0' }}</td>
            <td class="px-3 py-2">{{ r.capital | currency:'ARS':'symbol-narrow':'1.0-0' }}</td>
            <td class="px-3 py-2">{{ r.saldo   | currency:'ARS':'symbol-narrow':'1.0-0' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="mt-4 text-xs text-white/50">
      * Cálculo orientativo con interés simple por periodo. Sujetos a evaluación crediticia y condiciones comerciales.
    </p>
  </div>
</section>
  `
})
export class BusinessLoanComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  monto = 500000;
  cuotas = 12;
  periodicidad: Periodicidad = 'quincena';

  valorCuota = 0;
  total = 0;
  waLink = this.buildWa('');
  verTabla = false;
  tabla: Row[] = [];

  trackByPeriodo = (_: number, row: Row) => row.periodo;

  private readonly tasaQuincena = 0.15; // 15%
  private readonly tasaDiaria   = 0.02; // 2%

  private nf = new Intl.NumberFormat('es-AR');
  private miles(v: number) { return this.nf.format(Math.round(v)); }

  tasa() { return this.periodicidad === 'quincena' ? this.tasaQuincena : this.tasaDiaria; }

  calc() {
    const P = Math.max(0, this.monto || 0);
    const n = Math.max(1, this.cuotas || 1);
    const r = this.tasa();

    // Interés simple acumulado: total = P * (1 + r * n)
    this.total = P * (1 + r * n);
    this.valorCuota = this.total / n;

    this.armarTabla(P, n, r);

    const resumen =
      `Préstamo a negocios:%0A` +
      `Monto: ${this.format(P)} ARS%0A` +
      `Periodicidad: ${this.periodicidad}%0A` +
      `Cuotas: ${n}%0A` +
      `Cuota estimada: ${this.format(this.valorCuota)} ARS%0A` +
      `Total estimado: ${this.format(this.total)} ARS`;
    this.waLink = this.buildWa(resumen);
  }

  toggleTabla(){ this.verTabla = !this.verTabla; }

  private armarTabla(P: number, n: number, r: number) {
    const interesFijo = P * r;                  // interés simple por periodo
    const cuota = this.valorCuota || (P * (1 + r * n)) / n;
    const capitalPeriodo = cuota - interesFijo; // constante
    const rows: Row[] = [];
    let saldo = P;

    for (let k = 1; k <= n; k++) {
      const cap = Math.min(capitalPeriodo, saldo); // última fila evita negativo
      saldo = Math.max(0, saldo - cap);
      rows.push({
        periodo: k,
        cuota,
        interes: interesFijo,
        capital: cap,
        saldo
      });
    }
    this.tabla = rows;
  }

  descargarCSV() {
   if (!this.isBrowser || !this.tabla.length) return;
  const sep = ';';
  const header = ['Periodo','Cuota (ARS)','Interés (ARS)','Capital (ARS)','Saldo (ARS)'].join(sep);
  const lines = this.tabla.map(r =>
    [
      r.periodo,
      this.miles(r.cuota),
      this.miles(r.interes),
      this.miles(r.capital),
      this.miles(r.saldo)
    ].join(sep)
  );
  const csv = [header, ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prestamo_${this.periodicidad}_${this.cuotas}cuotas.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  }

  private red(v: number){ return Math.round(v).toString(); }

  private buildWa(texto: string) {
    return `https://wa.me/5493880000000?text=${texto}`;
  }

  private format(v: number) {
    return Math.round(v).toLocaleString('es-AR');
  }

  
}
