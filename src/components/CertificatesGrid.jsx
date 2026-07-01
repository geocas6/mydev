import { useState } from 'react';
import ProgressBar from './ProgressBar';
import '../styles/Certificates.css';

/* ============================================================
   DATOS DE CERTIFICADOS
   ── Instrucciones para agregar un certificado ──
   1. Cambia "active: false" a "active: true"
   2. Rellena los campos:
      - imageUrl:   ruta relativa a /public/images/ o URL externa
      - certUrl:    enlace al certificado verificable
      - platform:   nombre de la plataforma (ej. "Coursera", "Udemy")
      - title:      título del curso/certificado
      - description: breve descripción (1-2 oraciones)
      - tags:       array de tecnologías/habilidades
   ============================================================ */
const CERTIFICATES_DATA = [
  {
    id: 1,
    active: true,
    platform: 'Plataforma',                       // ← Rellena esto
    title: 'Título del Certificado 1',            // ← Rellena esto
    description: 'Descripción breve del curso y los conocimientos adquiridos.', // ← Rellena esto
    tags: ['Tag1', 'Tag2', 'Tag3'],               // ← Rellena esto
    imageUrl: '',                                 // ← Ruta de imagen o deja vacío para ícono
    certUrl: '#',                                 // ← URL del certificado verificable
  },
  {
    id: 2,
    active: true,
    platform: 'Plataforma',                       // ← Rellena esto
    title: 'Título del Certificado 2',            // ← Rellena esto
    description: 'Descripción breve del curso y los conocimientos adquiridos.', // ← Rellena esto
    tags: ['Tag1', 'Tag2'],                       // ← Rellena esto
    imageUrl: '',                                 // ← Ruta de imagen o deja vacío para ícono
    certUrl: '#',                                 // ← URL del certificado verificable
  },
  // Los 6 slots restantes se generan automáticamente como "bloqueados"
  { id: 3, active: false },
  { id: 4, active: false },
  { id: 5, active: false },
  { id: 6, active: false },
  { id: 7, active: false },
  { id: 8, active: false },
];

/* ── Sub-componente: Tarjeta Activa ─────────────────────────── */
function ActiveCard({ cert, index }) {
  return (
    <a
      href={cert.certUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-card"
      id={`cert-card-${cert.id}`}
      aria-label={`Ver certificado: ${cert.title}`}
    >
      {/* Thumbnail */}
      <div className="cert-card__thumbnail">
        {cert.imageUrl ? (
          <img src={cert.imageUrl} alt={`Certificado ${cert.title}`} loading="lazy" />
        ) : (
          <div className="cert-card__thumbnail-placeholder" aria-hidden="true">
            🎓
          </div>
        )}
        {/* Badges */}
        <span className="cert-card__badge">#{String(index + 1).padStart(2, '0')}</span>
        <span className="cert-card__verified" aria-label="Verificado">
          <span aria-hidden="true">✓</span> Verificado
        </span>
      </div>

      {/* Body */}
      <div className="cert-card__body">
        <p className="cert-card__platform">{cert.platform}</p>
        <h2 className="cert-card__title">{cert.title}</h2>
        <p className="cert-card__description">{cert.description}</p>
      </div>

      {/* Footer */}
      <div className="cert-card__footer">
        <div className="cert-card__tags" aria-label="Tecnologías">
          {cert.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <span className="cert-card__cta" aria-hidden="true">Ver →</span>
      </div>
    </a>
  );
}

/* ── Sub-componente: Tarjeta Bloqueada ──────────────────────── */
function LockedCard({ id }) {
  return (
    <div
      className="cert-card--locked"
      id={`cert-locked-${id}`}
      aria-label="Certificado próximamente"
      aria-disabled="true"
    >
      <div className="locked-overlay">
        <span className="locked-overlay__icon" aria-hidden="true">🔒</span>
        <span className="locked-overlay__label">Próximamente</span>
        <span className="locked-overlay__sub">En progreso...</span>
      </div>
    </div>
  );
}

/* ── Componente Principal ───────────────────────────────────── */
function CertificatesGrid() {
  // El estado contiene el array completo de 8 slots.
  // Para agregar un certificado: modifica CERTIFICATES_DATA arriba.
  const [certificates] = useState(CERTIFICATES_DATA);

  const activeCerts  = certificates.filter((c) => c.active);
  const activeCount  = activeCerts.length;
  const totalSlots   = certificates.length; // 8

  return (
    <>
      <main className="certificates-page" id="main-content">
        {/* Header */}
        <header className="page-header">
          <div className="page-header__eyebrow" aria-label="Estado activo">
            Portafolio de Certificaciones
          </div>
          <h1 className="page-header__title">
            My Dev <span>Certificates</span>
          </h1>
          <p className="page-header__subtitle">
            Formación continua hacia convertirme en Full Stack Developer.
            Cada certificado es un paso más en el camino.
          </p>
        </header>

        {/* Stats row */}
        <div className="stats-row" role="region" aria-label="Estadísticas de progreso">
          <div className="stat-item">
            <span className="stat-item__value">{activeCount}</span>
            <span className="stat-item__label">Completados</span>
          </div>
          <div className="stat-item">
            <span className="stat-item__value">{totalSlots - activeCount}</span>
            <span className="stat-item__label">Pendientes</span>
          </div>
          <div className="stat-item">
            <span className="stat-item__value">
              {Math.round((activeCount / totalSlots) * 100)}%
            </span>
            <span className="stat-item__label">Progreso</span>
          </div>
        </div>

        {/* Grid 2×4 */}
        <section
          className="certificates-grid"
          aria-label="Grilla de certificados"
        >
          {certificates.map((cert, index) =>
            cert.active ? (
              <ActiveCard
                key={cert.id}
                cert={cert}
                index={certificates.slice(0, index).filter((c) => c.active).length}
              />
            ) : (
              <LockedCard key={cert.id} id={cert.id} />
            )
          )}
        </section>
      </main>

      {/* Barra de progreso fija */}
      <ProgressBar active={activeCount} total={totalSlots} />
    </>
  );
}

export default CertificatesGrid;
