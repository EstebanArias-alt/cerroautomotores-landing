import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
  <footer class="py-10 border-t border-white/10">
    <div class="mx-auto max-w-7xl px-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
      <p class="opacity-70">© {{year}} Cerro Automotores. Todos los derechos reservados.</p>
      <div class="flex gap-4 opacity-80 text-sm">
        <a href="#catalogo">Catálogo</a>
        <a href="#financiacion">Financiación</a>
        <a href="#contacto">Contacto</a>
      </div>
    </div>
  </footer>
  `,
  styles:[``]
})
export class FooterComponent { year = new Date().getFullYear(); }