import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  template: `
<section id="testimonios" class="scroll-mt-24 py-16">
  <div class="mx-auto max-w-7xl px-4">
    <h2 class="text-3xl md:text-4xl font-bold">Clientes felices</h2>
    <div class="grid md:grid-cols-3 gap-6 mt-8">
      <blockquote class="bg-white/5 p-6 rounded-2xl">"Excelente atención y entrega rápida." <span class="block mt-2 opacity-70">— María G.</span></blockquote>
      <blockquote class="bg-white/5 p-6 rounded-2xl">"Financiación clara, sin sorpresas." <span class="block mt-2 opacity-70">— Lucas P.</span></blockquote>
      <blockquote class="bg-white/5 p-6 rounded-2xl">"La moto llegó impecable." <span class="block mt-2 opacity-70">— Sofía R.</span></blockquote>
    </div>
  </div>
</section>
  `,
  styles:[``]
})
export class TestimonialsComponent {}