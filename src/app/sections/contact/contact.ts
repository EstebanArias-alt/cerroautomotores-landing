import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
<section id="contacto" class="scroll-mt-24 py-16 bg-white/5">
  <div class="mx-auto max-w-7xl px-4">
    <h2 class="text-3xl md:text-4xl font-bold">Contacto</h2>
    <div class="grid md:grid-cols-2 gap-8 mt-6">
      <form action="https://formspree.io/f/yourid" method="POST" class="space-y-3">
        <input name="nombre" placeholder="Nombre" class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10">
        <input type="email" name="email" placeholder="Email" class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10">
        <textarea name="mensaje" rows="4" placeholder="Mensaje" class="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10"></textarea>
        <button class="rounded-lg px-5 py-2 bg-blue-500 text-black font-semibold">Enviar</button>
      </form>
      <iframe class="w-full h-72 rounded-xl"
        src="https://www.google.com/maps?q=San%20Salvador%20de%20Jujuy&output=embed" loading="lazy"></iframe>
    </div>
  </div>
</section>
  `,
  styles:[``]
})
export class ContactComponent {}