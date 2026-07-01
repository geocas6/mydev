import { useState, useEffect } from 'react';
import '../styles/ProgressBar.css';

/**
 * ProgressBar — Barra de progreso fija en el fondo de la página.
 *
 * @param {number} active   - Cantidad de certificados activos
 * @param {number} total    - Total de slots (default 8)
 */
function ProgressBar({ active, total = 8 }) {
  const [displayPercent, setDisplayPercent] = useState(0);
  const targetPercent = Math.round((active / total) * 100);

  // Animación count-up del número de porcentaje
  useEffect(() => {
    let start = null;
    const duration = 1400; // ms — debe coincidir con progressFill

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayPercent(Math.round(eased * targetPercent));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    // Delay de 300ms para sincronizar con animación CSS
    const rafId = setTimeout(() => requestAnimationFrame(step), 300);

    return () => clearTimeout(rafId);
  }, [targetPercent]);

  // Genera los puntos de hito (uno por certificado completado posible)
  const milestones = Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    reached: i < active,
  }));

  return (
    <div
      className="progress-bar-container"
      role="progressbar"
      aria-valuenow={targetPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progreso hacia Full Stack Developer: ${active} de ${total} certificados completados`}
    >
      {/* Left label */}
      <div className="progress-bar__label">
        <span className="progress-bar__title">Mi progreso</span>
        <span className="progress-bar__goal">Full Stack Dev</span>
      </div>

      {/* Center track */}
      <div className="progress-bar__track-wrapper">
        <div className="progress-bar__track">
          <div
            className="progress-bar__fill"
            style={{ width: `${targetPercent}%` }}
          />
        </div>

        {/* Milestone dots */}
        <div className="progress-bar__milestones" aria-hidden="true">
          {milestones.map((m) => (
            <span
              key={m.id}
              className={`milestone${m.reached ? ' milestone--reached' : ''}`}
              title={`Certificado ${m.id}`}
            />
          ))}
        </div>
      </div>

      {/* Right percentage */}
      <div className="progress-bar__percentage">
        <span className="progress-bar__number">{displayPercent}%</span>
        <span className="progress-bar__fraction">
          {active}/{total} completados
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;
