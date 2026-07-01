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
    platform: 'Coderhouse',
    title: 'Título del Certificado 1',            // ← Rellena esto
    description: 'Descripción breve del curso y los conocimientos adquiridos.', // ← Rellena esto
    tags: ['Tag1', 'Tag2', 'Tag3'],               // ← Rellena esto
    imageUrl: 'https://coder-ui-static-content.coderhouse.com/certificates/8f646d71-648a-4ba1-8366-ca572b634c8f.png',
    certUrl: 'https://pub.coderhouse.com/certificates/8f646d71-648a-4ba1-8366-ca572b634c8f?v=1',
  },
  {
    id: 2,
    active: true,
    platform: 'Coderhouse',
    title: 'Título del Certificado 2',            // ← Rellena esto
    description: 'Descripción breve del curso y los conocimientos adquiridos.', // ← Rellena esto
    tags: ['Tag1', 'Tag2'],                       // ← Rellena esto
    imageUrl: 'https://coder-ui-static-content.coderhouse.com/certificates/8f646d71-648a-4ba1-8366-ca572b634c8f.png', // ← Reemplaza con la imagen del cert 2 cuando la tengas
    certUrl: 'https://coderhouse-production-student-certificates.s3.us-east-1.amazonaws.com/certificates/students/5dfacbf3-b626-4224-b889-47741d573cb4/group/products/1b2dff06-72d9-458b-b83e-e160d51fe380/b9fad966-44fb-4151-9330-31241633f61b.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA57BPRSYQDCTIIJYK%2F20260630%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260630T225953Z&X-Amz-Expires=86400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCXVzLWVhc3QtMSJGMEQCIEZ%2BnralokLt6GWA693zo7OWi1i4snrP1EYvafTmGr%2FPAiAJdf1Jx%2FJecxZwxVimKSIamZfUKMflBwise9w22TnLKiqUBAjM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDk2MDAyNDkwOTM0NCIMDPOEnTQAwtUCeUIIKugDhEtz5wn6n8%2BVp5%2BY3d8ZqFYySDv5nSCtrhitseiLRt6jrKjI0%2BM8khNEK8gQ3hy713TreCRgcqP0kqq58wFEkZwNxn4vR73713b81GbD1yY6eU1soaDrewqKE%2BS6KJlC5isM80LxwVgBGlc6lBh2ar9BuzTgwSqpWAsvKxTbeo%2FNxo%2Bgp%2F2wxAamqygBIlwzWRgLWxY0H9gneRRfswk7DIKEjZolP9xmp0RG2ESgPpghUWfq5N%2FQBWNav1TWHDJmDwifk%2B976oOwQB%2BjMU6G9Zr%2Fu6EyUhvszCiHXqB1rHpZEu5NhYjPWcUPHbQj%2FnLnJN2HD2vV64mW9kW0ltYLTngdDRW%2FPTC6gLSITV2DKas86IvZm75SeGXUbs7GcXeU6RVVqYY0IJlIFCfuMUMBceNQdqnXoubmCWSHPYlnXDS1%2FuCwstLe2%2F8c9Tl0pHSf%2BR9eIis2U4PomKbDZxJOzcv42HGMVrKzhc5Qy99YKKQonRjC97il%2BFf2YpLaywP3C7lFQR%2FvgR54pvtx3hRJkM%2FcRyqIA32LCS3%2BY2vU5I59iTK%2B0kPZ2jJVNzRVqFCUqKWQV7l0abJivwUBNfWN17QoWKMXutBnZVt5LOzN2xQ3WQMx3KLdRTX3hVaSUqYX5%2BGrw0SLoLMwgaqQ0gY6pgGvM8GT8QxkWwKjEObBNKTHWoMhOLWfDNiwpjManEBsAThqmIO3ZfM7o702B0WL0EwRkkzg5FUeRRDeJboI%2BcPb5%2BQ8etMSiuN96D1yU0f7V%2FoAx%2BUmUNyLSp%2B5VzuTo0ODMV1U7UI2U2XKnL3ip4DQGI%2FSa4sBuNVu40NOeYYgD2vtJHW7Op3X0peA2qwkKJG6NFss0jAPjE8q49oP7FAYXiy6w9pn&X-Amz-Signature=c507ab26a082a37ceea34d4ff2a20399413bbd404776055b449615c11cef6c67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject',
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
            Geo&apos;s Dev <span>Progress</span>
          </h1>
          <p className="page-header__subtitle">
            Sigue mi progreso hacia convertirme en Full Stack Developer.
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
