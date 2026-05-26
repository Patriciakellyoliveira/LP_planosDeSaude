// ── Reveal on scroll ──
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // ── WhatsApp form submission ──
  function enviarWhatsApp(e) {
    e.preventDefault();

    const nome     = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email    = document.getElementById('email').value.trim();
    const produto  = document.getElementById('produto').value;
    const mensagem = document.getElementById('mensagem').value.trim();
    const Cnpj  = document.getElementById('cnpj').value.trim();

    const numeroWA = '5511994672848';

    let texto = `*Nova Solicitação de Cotação* 🛡️\n\n`;
    texto += `👤 *Nome:* ${nome}\n`;
    texto += `📱 *WhatsApp:* ${telefone}\n`;
    if (email) texto += `📧 *E-mail:* ${email}\n`;
    if (Cnpj) texto += `🆔 *CNPJ:* ${Cnpj}\n`;
    texto += `📋 *Produto:* ${produto}\n`;
    if (mensagem) texto += `💬 *Mensagem:* ${mensagem}\n`;
    texto += `\n_Mensagem enviada pelo site da Soares Corretora de Seguros_`;

    const url = `https://wa.me/${numeroWA}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    // Reset form
    document.getElementById('cotacao-form').reset();

    // Feedback visual
    const btn = document.querySelector('.btn-submit');
    btn.textContent = '✅ Enviado! Redirecionando...';
    btn.style.background = 'linear-gradient(135deg,#25D366,#128c7e)';
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg> Enviar pelo WhatsApp`;
      btn.style.background = 'linear-gradient(135deg,var(--gold),var(--gold-light))';
    }, 3000);
  }

  // ── Phone mask ──
  document.getElementById('telefone').addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').substring(0, 11);
    if (v.length >= 7) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length >= 3) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length >= 1) v = `(${v}`;
    this.value = v;
  });