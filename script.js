/**
 * Projeto Ciência Viva — Grupo Estrela Urbana
 * Interatividade: carrossel de destaques científicos, croqui experimental DBC 5×4 e modais.
 */

(function () {
  'use strict';

  // 1. Menu Mobile
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Carrossel de Citações e Destaques Científicos (Seção Inferior)
  const quotes = [
    {
      text: '“O potencial do biochar associa-se ao aprisionamento de carbono, retenção hídrica, filtragem do solo e redução de agentes patogênicos.”',
      author: 'Chaves; Fernandes (2024) • Machado (2024)',
    },
    {
      text: '“Avaliamos quatro tratamentos com biocarvão de podas urbanas e uma testemunha em delineamento 5×4 para beneficiar a cultura do milho Zea mays L.”',
      author: 'Grupo Estrela Urbana • Projeto Ciência Viva',
    },
    {
      text: '“A pirólise sob baixa demanda de oxigênio converte lignina e celulose das podas urbanas em compostos estáveis de alto valor agregado.”',
      author: 'Gestão Sustentável de Resíduos • E.E. Frei Egídio Parisi',
    },
  ];

  let currentQuoteIndex = 0;
  const quoteTextEl = document.getElementById('quoteText');
  const quoteAuthorEl = document.getElementById('quoteAuthor');
  const quotePrevBtn = document.getElementById('quotePrevBtn');
  const quoteNextBtn = document.getElementById('quoteNextBtn');

  function renderQuote(index) {
    if (!quoteTextEl || !quoteAuthorEl) return;
    quoteTextEl.style.opacity = '0';
    quoteAuthorEl.style.opacity = '0';

    window.setTimeout(() => {
      const item = quotes[index];
      quoteTextEl.textContent = item.text;
      quoteAuthorEl.textContent = item.author;
      quoteTextEl.style.opacity = '1';
      quoteAuthorEl.style.opacity = '1';
    }, 160);
  }

  if (quotePrevBtn && quoteNextBtn) {
    quotePrevBtn.addEventListener('click', () => {
      currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
      renderQuote(currentQuoteIndex);
    });

    quoteNextBtn.addEventListener('click', () => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      renderQuote(currentQuoteIndex);
    });
  }

  // 3. Modais Científicos (DBC 5×4 & Contato)
  const modalDbc = document.getElementById('modalDbc');
  const modalContact = document.getElementById('modalContact');
  const dbcModeNote = document.getElementById('dbcModeNote');
  const dbcTabs = document.querySelectorAll('[data-tab-mode]');

  const modeDescriptions = {
    geral:
      '<strong>Atributos Agronômicos Observados:</strong> Desenvolvimento vegetativo do milho (<em>Zea mays L.</em>), estruturação física do solo, retenção hídrica, filtragem de nutrientes e aprisionamento estável de carbono oriundo da pirólise da lignina e celulose das podas urbanas.',
    incorporado:
      '<strong>Manejo Solo Incorporado:</strong> O biocarvão de podas urbanas mistas é homogeneizado diretamente na camada arável das parcelas antes da semeadura do milho (<em>Zea mays L.</em>), potencializando o contato direto com a rizosfera, a porosidade e a retenção de água em profundidade.',
    lanco:
      '<strong>Manejo Aplicação a Lanço:</strong> O biocarvão é distribuído superficialmente a lanço sobre as parcelas nos 4 blocos casualizados, avaliando sua eficiência prática no condicionamento superficial, proteção física do solo, infiltração hídrica e resposta agronômica da cultura.',
  };

  function setDbcTab(mode) {
    const validMode = modeDescriptions[mode] ? mode : 'geral';
    dbcTabs.forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-tab-mode') === validMode);
    });
    if (dbcModeNote) {
      dbcModeNote.innerHTML = modeDescriptions[validMode];
    }
  }

  dbcTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      setDbcTab(btn.getAttribute('data-tab-mode'));
    });
  });

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    [modalDbc, modalContact].forEach((m) => {
      if (m) m.classList.remove('is-open');
    });
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const target = trigger.getAttribute('data-open-modal');
      const dbcMode = trigger.getAttribute('data-dbc-mode');

      if (target === 'dbc') {
        if (dbcMode) setDbcTab(dbcMode);
        openModal(modalDbc);
      } else if (target === 'contact') {
        openModal(modalContact);
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach((closeBtn) => {
    closeBtn.addEventListener('click', closeAllModals);
  });

  [modalDbc, modalContact].forEach((backdrop) => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) closeAllModals();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAllModals();
  });

  // 4. Formulário de Contato Demonstrativo
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameInput = document.getElementById('contactName');
      const sender = nameInput && nameInput.value ? nameInput.value.trim() : 'visitante';
      formFeedback.textContent = `Obrigado, ${sender}! Sua mensagem foi registrada para a equipe Estrela Urbana (Ciência Viva).`;
      contactForm.reset();
    });
  }

  // 5. Botão Flutuante Voltar ao Topo
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
