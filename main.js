// Año automático en el footer
document.getElementById('year').textContent = new Date().getFullYear()

// Tema: móvil siempre oscuro; escritorio 19:00–08:00 = noche, resto = día
const THEME_KEY = 'c18-theme'
const isMobile = () => window.matchMedia('(max-width: 600px)').matches
const isNightTime = () => {
  const h = new Date().getHours()
  return h >= 19 || h < 8
}
const getDefaultTheme = () => (isMobile() || isNightTime()) ? 'dark' : 'light'

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(THEME_KEY, theme)
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  const theme = saved || getDefaultTheme()
  setTheme(theme)
}

initTheme()
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark'
  setTheme(current === 'dark' ? 'light' : 'dark')
})

// Al cargar, ir al encabezado (inicio) si no hay hash en la URL
const mainScroll = document.querySelector('main')
if (mainScroll && !window.location.hash) {
  mainScroll.scrollTo(0, 0)
}

// Logo C18: clic lleva al inicio
document.querySelector('.logo')?.addEventListener('click', (e) => {
  e.preventDefault()
  mainScroll?.scrollTo({ top: 0, behavior: 'smooth' })
})

// Fecha y hora en vivo (DD/MM/AAAA HH:MM:SS:MS)
const audioDateTimeEl = document.getElementById('audioDateTime')
if (audioDateTimeEl) {
  const pad2 = n => String(n).padStart(2, '0')
  const pad3 = n => String(n).padStart(3, '0')
  const updateDateTime = () => {
    const d = new Date()
    audioDateTimeEl.textContent = `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}:${pad3(d.getMilliseconds())}`
  }
  updateDateTime()
  setInterval(updateDateTime, 10)
}

// Nube de palabras en el hero
const cloudWords = [
  'Estrategia Digital', 'Growth Hacking', 'Branding', 'ROI', 'Conversión', 'Leads',
  'Embudo de Ventas', 'Target', 'Engagement', 'Posicionamiento', 'Visibilidad', 'Alcance',
  'Campañas', 'Analítica', 'Insights', 'Contenido de Valor', 'Fidelización', 'Tráfico Web',
  'SEO', 'SEM', 'Identidad Visual', 'Storytelling', 'Impacto', 'Tendencias', 'Mercado',
  'Código Limpio', 'Full Stack', 'Responsive Design', 'Mobile First', 'UX / UI',
  'Experiencia de Usuario', 'Innovación', 'Tech Solutions', 'Desarrollo a Medida',
  'Velocidad de Carga', 'Seguridad', 'Escalabilidad', 'Integración', 'Automatización',
  'Algoritmos', 'Bases de Datos', 'Cloud Computing', 'Inteligencia Artificial',
  'Optimización', 'Soporte 24/7', 'Arquitectura Web', 'Plataformas', 'E-commerce',
  'Landing Page', 'Interfaz Intuitiva', 'Éxito', 'Rentabilidad', 'Ventas', 'Liderazgo',
  'Startup', 'Emprendimiento', 'Visión', 'Misión', 'Objetivos', 'Resultados', 'Escalado',
  'B2B', 'B2C', 'Networking', 'Sinergias', 'Competitividad', 'Valor Diferencial',
  'Soluciones', 'Proyectos', 'Futuro', 'Transformación', 'Negocio Online', 'Monetización',
  'Prestigio', 'Confianza', 'Sin Límites', 'Potencia tu Marca', 'Premium', 'Exclusividad',
  'Disruptivo', 'Creatividad', 'Ideas que Venden', 'Next Level', 'Global', 'Conecta',
  'Impulsa', 'Acelera', 'Calidad', 'Eficiencia', 'Vanguardia', 'Dinamismo', 'Agilidad',
  'Focus', 'Crecimiento Exponencial', 'Claridad', 'Talento', 'Pasión', 'Evolución',
  'Soluciones Reales', 'C18'
]

const cloudContainer = document.getElementById('heroCloud')
if (cloudContainer) {
  const slots = 10
  const positions = [
    { top: '5%', left: '10%' }, { top: '15%', left: '60%' }, { top: '25%', left: '20%' },
    { top: '35%', left: '75%' }, { top: '45%', left: '5%' }, { top: '55%', left: '50%' },
    { top: '65%', left: '25%' }, { top: '75%', left: '70%' }, { top: '85%', left: '35%' },
    { top: '50%', left: '85%' }
  ]
  const elements = []

  for (let i = 0; i < slots; i++) {
    const span = document.createElement('span')
    span.className = 'hero__cloud-word'
    span.style.top = positions[i].top
    span.style.left = positions[i].left
    span.style.animation = `cloudFloat ${10 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite`
    cloudContainer.appendChild(span)
    elements.push(span)
  }

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)
  let used = new Set()

  const updateWord = (el) => {
    el.classList.remove('visible')
    const available = cloudWords.filter(w => !used.has(w))
    const pool = available.length ? available : cloudWords
    if (available.length === 0) used.clear()
    const word = pool[Math.floor(Math.random() * pool.length)]
    used.add(word)
    el.textContent = word
    el.classList.toggle('c18', word === 'C18')
    setTimeout(() => el.classList.add('visible'), 50)
  }

  elements.forEach((el, i) => {
    const cycle = () => {
      el.classList.add('fade-out')
      setTimeout(() => {
        el.classList.remove('visible', 'fade-out')
        setTimeout(() => {
          updateWord(el)
        }, 50)
      }, 500)
    }
    setTimeout(() => {
      updateWord(el)
      setInterval(cycle, 4000 + Math.random() * 2500)
    }, i * 350)
  })
}

// Intro — video + audio con fade-in al hacer clic
const bgMusic = document.getElementById('bgMusic')
const playBtn = document.getElementById('playBtn')
const startOverlay = document.getElementById('startOverlay')
const introVideo = document.getElementById('introVideo')

if (introVideo) {
  introVideo.play().catch(() => {})
}

const volumeSlider = document.getElementById('volumeSlider')

function getVolume() {
  return volumeSlider ? volumeSlider.value / 100 : 0.03
}

if (bgMusic && playBtn && startOverlay) {
  const fadeDuration = 2500

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      bgMusic.volume = getVolume()
    })
    volumeSlider.value = 3
    bgMusic.volume = 0.03
  }

  startOverlay.addEventListener('click', () => {
    bgMusic.volume = 0
    bgMusic.play()
    playBtn.classList.add('playing')
    startOverlay.classList.add('hidden')

    let start = Date.now()
    const fadeIn = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / fadeDuration, 1)
      bgMusic.volume = progress * getVolume()
      if (progress < 1) requestAnimationFrame(fadeIn)
    }
    fadeIn()
  })

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (bgMusic.paused) {
      bgMusic.volume = getVolume()
      bgMusic.play()
      playBtn.classList.add('playing')
    } else {
      bgMusic.pause()
      playBtn.classList.remove('playing')
    }
  })
}

// Cursor personalizado
const cursor = document.getElementById('cursor')
if (cursor && window.matchMedia('(pointer: fine)').matches) {
  let x = 0, y = 0, mouseX = 0, mouseY = 0
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })
  const animate = () => {
    x += (mouseX - x) * 0.5
    y += (mouseY - y) * 0.5
    cursor.style.left = x + 'px'
    cursor.style.top = y + 'px'
    requestAnimationFrame(animate)
  }
  animate()
  document.querySelectorAll('a, button, .proyecto, .equipo__card, .audio-toggle, .audio-controls, .start-overlay, .contacto__cta, .contacto__card, .form-overlay').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'))
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
  })
}

// Smooth reveal on scroll
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, observerOptions)

document.querySelectorAll('.proyecto, .contacto__card').forEach(el => observer.observe(el))

// Indicador de sección activa en el nav
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav a[data-section]')

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id)
      })
    }
  })
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 })

sections.forEach(section => navObserver.observe(section))

// Glitch RGB en C18: al entrar + cada 15s (para verlo tras "Acceder al estudio")
function triggerGlitch() {
  const heroTitle = document.getElementById('heroTitle')
  if (!heroTitle) return
  heroTitle.classList.remove('glitch')
  void heroTitle.offsetWidth
  heroTitle.classList.add('glitch')
  setTimeout(() => heroTitle.classList.remove('glitch'), 400)
}

const heroTitle = document.getElementById('heroTitle')
if (heroTitle) {
  startOverlay?.addEventListener('click', () => {
    setTimeout(triggerGlitch, 800) // glitch al entrar al estudio
  })
  setInterval(triggerGlitch, 15000) // cada 15 segundos
}

// Glitch en header y footer: cada 15 segundos (desfase 15s entre uno y otro)
function triggerLogoGlitch(el) {
  if (!el) return
  el.classList.remove('glitch')
  void el.offsetWidth
  el.classList.add('glitch')
  setTimeout(() => el.classList.remove('glitch'), 300)
}

const GLITCH_INTERVAL = 15000
const headerLogo = document.getElementById('headerLogo')
const footerLogo = document.getElementById('footerLogo')
if (headerLogo && footerLogo) {
  triggerLogoGlitch(headerLogo)
  setInterval(() => triggerLogoGlitch(headerLogo), GLITCH_INTERVAL)
  setTimeout(() => {
    triggerLogoGlitch(footerLogo)
    setInterval(() => triggerLogoGlitch(footerLogo), GLITCH_INTERVAL)
  }, GLITCH_INTERVAL)
} else if (headerLogo) {
  setInterval(() => triggerLogoGlitch(headerLogo), GLITCH_INTERVAL)
} else if (footerLogo) {
  setInterval(() => triggerLogoGlitch(footerLogo), GLITCH_INTERVAL)
}

// Formulario de contacto
const abrirForm = document.getElementById('abrirFormulario')
const cerrarForm = document.getElementById('cerrarFormulario')
const formOverlay = document.getElementById('formOverlay')
const formContacto = document.getElementById('formContacto')
const tipoNegocioSearch = document.getElementById('tipoNegocioSearch')
const tipoNegocioOptions = document.getElementById('tipoNegocioOptions')
const tipoNegocioHidden = document.getElementById('tipoNegocio')

if (abrirForm && formOverlay) {
  abrirForm.addEventListener('click', () => formOverlay.classList.add('visible'))
}

// Select con buscador
if (tipoNegocioSearch && tipoNegocioOptions && tipoNegocioHidden) {
  const options = tipoNegocioOptions.querySelectorAll('.form__select-option')

  tipoNegocioSearch.addEventListener('focus', () => tipoNegocioOptions.classList.add('visible'))
  tipoNegocioSearch.addEventListener('input', () => {
    const q = tipoNegocioSearch.value.toLowerCase()
    tipoNegocioHidden.value = tipoNegocioSearch.value
    options.forEach(opt => {
      opt.classList.toggle('hidden', !opt.dataset.value.toLowerCase().includes(q))
    })
  })

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      tipoNegocioSearch.value = opt.dataset.value
      tipoNegocioHidden.value = opt.dataset.value
      tipoNegocioOptions.classList.remove('visible')
    })
  })

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.form__select-wrapper')) tipoNegocioOptions.classList.remove('visible')
  })
}

const formModal = document.getElementById('formModal')
const formContent = document.getElementById('formContent')
const formSuccess = document.getElementById('formSuccess')

formContacto?.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!tipoNegocioHidden?.value && tipoNegocioSearch?.value) {
    tipoNegocioHidden.value = tipoNegocioSearch.value
  }
  formModal?.classList.add('success')
  formContacto.reset()
})

function resetFormModal() {
  formModal?.classList.remove('success')
}

if (cerrarForm && formOverlay) {
  cerrarForm.addEventListener('click', () => {
    resetFormModal()
    formOverlay.classList.remove('visible')
  })
}

formOverlay?.addEventListener('click', (e) => {
  if (e.target === formOverlay) {
    resetFormModal()
    formOverlay.classList.remove('visible')
  }
})
