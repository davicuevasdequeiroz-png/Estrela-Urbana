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

  // 4. Formulário de Contato (envio para grupoestrelaurbana@gmail.com)
  const CONTACT_TARGET_EMAIL = 'grupoestrelaurbana@gmail.com';
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const sender = nameInput && nameInput.value ? nameInput.value.trim() : 'visitante';
      const senderEmail = emailInput && emailInput.value ? emailInput.value.trim() : '';
      const messageText = messageInput && messageInput.value ? messageInput.value.trim() : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }
      formFeedback.textContent = 'Enviando sua mensagem...';

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_TARGET_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: sender,
            email: senderEmail,
            message: messageText,
            _subject: `Novo contato (${sender}) — Projeto Ciência Viva`,
          }),
        });

        if (!response.ok) {
          throw new Error('Falha no envio via FormSubmit');
        }

        formFeedback.textContent = `Obrigado, ${sender}! Sua mensagem foi enviada para ${CONTACT_TARGET_EMAIL}.`;
        contactForm.reset();
      } catch (_err) {
        const subject = encodeURIComponent(`Contato Projeto Ciência Viva — ${sender}`);
        const body = encodeURIComponent(
          `Nome/Instituição: ${sender}\nE-mail: ${senderEmail}\n\nMensagem:\n${messageText}`
        );
        window.location.href = `mailto:${CONTACT_TARGET_EMAIL}?subject=${subject}&body=${body}`;
        formFeedback.textContent = `Abrindo seu aplicativo de e-mail para enviar para ${CONTACT_TARGET_EMAIL}...`;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar Mensagem';
        }
      }
    });
  }

  // 5. Botão Flutuante Voltar ao Topo
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Seção Interativa de Scrollytelling (383 Frames • Canvas 60fps)
  const scrollySection = document.getElementById('metodologia-scrolly');
  const scrollyCanvas = document.getElementById('scrollyCanvas');
  const scrollyCards = Array.from(document.querySelectorAll('.scrolly-card'));
  const stepCounterEl = document.getElementById('scrollyStepCounter');
  const phaseMiniEl = document.getElementById('scrollyPhaseMini');
  const progressFillEl = document.getElementById('scrollyProgressFill');
  const progressBarWrapEl = document.getElementById('scrollyProgressBarWrap');
  const heroSaibaMaisBtn = document.getElementById('heroSaibaMaisBtn');

  if (heroSaibaMaisBtn && scrollySection) {
    heroSaibaMaisBtn.addEventListener('click', (event) => {
      event.preventDefault();
      scrollySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (scrollySection && scrollyCanvas) {
    const ctx = scrollyCanvas.getContext('2d', { alpha: false });
    const TOTAL_FRAMES = 383;
    const CANVAS_WIDTH = 1080;
    const CANVAS_HEIGHT = 1920;

    scrollyCanvas.width = CANVAS_WIDTH;
    scrollyCanvas.height = CANVAS_HEIGHT;
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    // Cronograma exato de fases e intervalos de frames
    const PHASES = [
      { index: 0, step: '01/06', shortLabel: 'COLETA URBANA', start: 1, end: 35 },
      { index: 1, step: '02/06', shortLabel: 'TRIAGEM E PREPARO', start: 46, end: 110 },
      { index: 2, step: '03/06', shortLabel: 'PIRÓLISE A 500 °C', start: 116, end: 183 },
      { index: 3, step: '04/06', shortLabel: 'APLICAÇÃO NO SOLO', start: 184, end: 257 },
      { index: 4, step: '05/06', shortLabel: 'EXPERIMENTO DBC 5×4', start: 268, end: 330 },
      { index: 5, step: '06/06', shortLabel: 'CULTURA DO MILHO', start: 332, end: 383 },
    ];

    // Armazenamento de imagens carregadas (1..383)
    const framesStore = new Array(TOTAL_FRAMES + 1);
    const framesLoaded = new Array(TOTAL_FRAMES + 1).fill(false);
    let frameFolder = 'frame'; // fallback automático para 'frames' se necessário
    let currentTargetFrame = 1;
    let lastRenderedFrame = -1;
    let rafId = null;

    function formatFrameNumber(num) {
      return String(num).padStart(3, '0');
    }

    function getFramePath(index, folder) {
      return `${folder}/frame_${formatFrameNumber(index)}.jpg`;
    }

    // Encontra o frame carregado mais próximo caso o usuário role muito rápido
    function findNearestLoadedFrame(target) {
      if (framesLoaded[target]) return target;
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = target - offset;
        const next = target + offset;
        if (prev >= 1 && framesLoaded[prev]) return prev;
        if (next <= TOTAL_FRAMES && framesLoaded[next]) return next;
      }
      return -1;
    }

    // Desenha o frame no <canvas> mantendo proporção 9:16 (1080×1920)
    function drawFrame(targetFrame) {
      if (!ctx) return;
      const nearestIndex = findNearestLoadedFrame(targetFrame);
      if (nearestIndex === -1 || nearestIndex === lastRenderedFrame) return;

      const img = framesStore[nearestIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      lastRenderedFrame = nearestIndex;
    }

    // Sincroniza cards e HUD com o frame atual
    function syncNarrativeAndHud(frameNum, progress) {
      let activePhase = null;
      let latestReachedPhase = PHASES[0];

      for (let i = 0; i < PHASES.length; i++) {
        const p = PHASES[i];
        if (frameNum >= p.start) {
          latestReachedPhase = p;
        }
        if (frameNum >= p.start && frameNum <= p.end) {
          activePhase = p;
          break;
        }
      }

      // Atualiza estado ativo dos 6 cards (nos intervalos de transição activePhase é null => fade-out suave)
      scrollyCards.forEach((card, idx) => {
        const isCurrent = activePhase !== null && activePhase.index === idx;
        card.classList.toggle('is-active', isCurrent);
      });

      // Atualiza HUD discreto
      const displayPhase = activePhase || latestReachedPhase;
      if (stepCounterEl && displayPhase) {
        stepCounterEl.textContent = displayPhase.step;
      }
      if (phaseMiniEl && displayPhase) {
        phaseMiniEl.textContent = activePhase ? displayPhase.shortLabel : `${displayPhase.shortLabel} • TRANSIÇÃO`;
      }
      const pct = Math.min(100, Math.max(0, progress * 100));
      if (progressFillEl) {
        progressFillEl.style.width = `${pct.toFixed(2)}%`;
      }
      if (progressBarWrapEl) {
        progressBarWrapEl.setAttribute('aria-valuenow', String(Math.round(pct)));
      }
    }

    function updateScrollytelling() {
      rafId = null;
      const rect = scrollySection.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const totalScrollable = Math.max(1, rect.height - viewportHeight);

      const rawProgress = -rect.top / totalScrollable;
      const progress = Math.min(1, Math.max(0, rawProgress));
      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(1 + progress * (TOTAL_FRAMES - 1)))
      );

      currentTargetFrame = frameIndex;
      drawFrame(frameIndex);
      syncNarrativeAndHud(frameIndex, progress);
    }

    function requestTick() {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScrollytelling);
      }
    }

    // Carrega um frame individual e agenda redesenho se necessário
    function loadSingleFrame(index, folderToUse) {
      return new Promise((resolve) => {
        if (framesLoaded[index]) {
          resolve(true);
          return;
        }
        const img = new Image();
        img.decoding = 'async';
        if (index === 1) {
          img.fetchPriority = 'high';
        }
        img.onload = () => {
          framesStore[index] = img;
          framesLoaded[index] = true;
          if (
            index === currentTargetFrame ||
            lastRenderedFrame === -1 ||
            Math.abs(index - currentTargetFrame) < Math.abs(lastRenderedFrame - currentTargetFrame)
          ) {
            requestTick();
          }
          resolve(true);
        };
        img.onerror = () => {
          resolve(false);
        };
        img.src = getFramePath(index, folderToUse);
      });
    }

    // Preload inteligente em duas passagens (keyframes espaçados primeiro + preenchimento completo)
    async function startPreloading() {
      let firstOk = await loadSingleFrame(1, frameFolder);
      if (!firstOk) {
        frameFolder = 'frames';
        await loadSingleFrame(1, frameFolder);
      }
      requestTick();

      const priorityQueue = [];
      const seen = new Set([1]);

      // Passagem 1: Keyframes a cada 8 frames + limites de cada fase para resposta imediata ao scroll rápido
      PHASES.forEach((p) => {
        [p.start, Math.round((p.start + p.end) / 2), p.end].forEach((f) => {
          if (!seen.has(f)) {
            seen.add(f);
            priorityQueue.push(f);
          }
        });
      });

      for (let i = 1; i <= TOTAL_FRAMES; i += 8) {
        if (!seen.has(i)) {
          seen.add(i);
          priorityQueue.push(i);
        }
      }

      // Passagem 2: Todos os frames restantes em ordem sequencial
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!seen.has(i)) {
          seen.add(i);
          priorityQueue.push(i);
        }
      }

      const CONCURRENCY = 6;
      let cursor = 0;

      async function worker() {
        while (cursor < priorityQueue.length) {
          const nextFrame = priorityQueue[cursor++];
          await loadSingleFrame(nextFrame, frameFolder);
        }
      }

      const workers = [];
      for (let w = 0; w < CONCURRENCY; w++) {
        workers.push(worker());
      }
      await Promise.all(workers);
    }

    // Clique em um card no Desktop rola suavemente para o centro daquela fase
    scrollyCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (window.innerWidth < 1024) return;
        const phase = PHASES[idx];
        if (!phase) return;
        const midFrame = (phase.start + phase.end) / 2;
        const targetProgress = (midFrame - 1) / (TOTAL_FRAMES - 1);
        const sectionTop = scrollySection.offsetTop;
        const totalScrollable = Math.max(1, scrollySection.offsetHeight - window.innerHeight);
        window.scrollTo({
          top: sectionTop + targetProgress * totalScrollable,
          behavior: 'smooth',
        });
      });
    });

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    startPreloading();
    requestTick();
  }
})();
