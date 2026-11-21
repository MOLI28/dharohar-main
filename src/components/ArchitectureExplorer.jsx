import React, { useEffect, useState } from 'react';
import { MapPin, X, ShieldCheck, Info } from 'lucide-react';
import useReveal from '../hooks/useReveal.js';
import api from '../services/api.js';
import { DEMO_LOCATIONS } from '../data/demoHeritage.js';

const LOCATION_DETAILS = {
  bhangarh: [
    {
      id: 'main-gate',
      name: 'Main Gate',
      x: 50,
      y: 12,
      description:
        'One of the principal entrances into the fortified settlement and the starting point for exploring the internal complex.',
      significance:
        'It represents the controlled entrance into the historic fortified settlement.',
      history:
        'The surviving gates form part of the larger defensive and urban layout of Bhangarh.'
    },
    {
      id: 'lahori-gate',
      name: 'Lahori Gate',
      x: 24,
      y: 27,
      description:
        'A historic gateway forming part of the network of entrances associated with the settlement.',
      significance:
        'It helps demonstrate the scale and planned structure of the fortified site.',
      history:
        'Bhangarh contains several surviving gateways associated with its historic urban layout.'
    },
    {
      id: 'ajmeri-gate',
      name: 'Ajmeri Gate',
      x: 76,
      y: 27,
      description:
        'Another important entrance point within the fortified settlement.',
      significance:
        'The gate contributes to understanding movement through the historic complex.',
      history:
        'The surviving gateways illustrate the defensive and administrative organisation of the settlement.'
    },
    {
      id: 'market',
      name: 'Market Area',
      x: 50,
      y: 38,
      description:
        'A central area associated with the historic urban settlement where commercial activity once took place.',
      significance:
        'The remains help visitors understand that Bhangarh was once a functioning settlement rather than only a royal fort.',
      history:
        'Rows of structures in the settlement are associated with the historic market and urban spaces.'
    },
    {
      id: 'gopinath-temple',
      name: 'Gopinath Temple',
      x: 23,
      y: 52,
      description:
        'One of the important religious structures located within the historic settlement.',
      significance:
        'The temple demonstrates the coexistence of religious and urban spaces within Bhangarh.',
      history:
        'The temple remains are part of the broader architectural landscape of the site.'
    },
    {
      id: 'someshwar-temple',
      name: 'Someshwar Temple',
      x: 77,
      y: 52,
      description:
        'A religious structure associated with the historic settlement of Bhangarh.',
      significance:
        'It contributes to the cultural and architectural character of the fortified complex.',
      history:
        'The surviving temple architecture provides evidence of the religious spaces that existed within the settlement.'
    },
    {
      id: 'keshav-rai-temple',
      name: 'Keshav Rai Temple',
      x: 28,
      y: 68,
      description:
        'A temple structure located within the archaeological remains of the settlement.',
      significance:
        'It represents the importance of religious architecture in the everyday life of the historic town.',
      history:
        'The surviving temple remains form part of the documented architectural landscape of Bhangarh.'
    },
    {
      id: 'royal-palace',
      name: 'Royal Palace',
      x: 70,
      y: 73,
      description:
        'The palace area is associated with the ruling establishment of the fortified settlement.',
      significance:
        'It represents the administrative and residential centre of the historic complex.',
      history:
        'The palace ruins form one of the most visually prominent areas of Bhangarh today.'
    }
  ]
};

function createFallbackLocations(heritageId) {
  const detailed = LOCATION_DETAILS[heritageId];

  if (detailed) {
    return detailed;
  }

  const names = DEMO_LOCATIONS[heritageId] || [];

  return names.map((name, index) => ({
    id: `${heritageId}-${index}`,
    name,
    x: 20 + ((index * 23) % 60),
    y: 18 + ((index * 31) % 65),
    description:
      `${name} is an important feature represented in this interactive heritage site layout.`,
    significance:
      'This location is included as part of the curated prototype representation of the heritage site.',
    history:
      'Additional site-specific historical information can be added through the Dharohar database.'
  }));
}

export default function ArchitectureExplorer({
  heritageId = 'bhangarh'
}) {
  const ref = useReveal();

  const [locations, setLocations] = useState(() =>
    createFallbackLocations(heritageId)
  );

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fallback =
      createFallbackLocations(heritageId);

    setLocations(fallback);

    setActiveId(
      fallback.length
        ? fallback[0].id
        : null
    );

    let mounted = true;

    api.locations(heritageId)
      .then((rows) => {
        if (
          !mounted ||
          !Array.isArray(rows) ||
          rows.length === 0
        ) {
          return;
        }

        const normalized = rows.map(
          (location, index) => ({
            id:
              location.id ||
              `${heritageId}-${index}`,

            name:
              location.name ||
              `Location ${index + 1}`,

            x: Number(
              location.x_position ??
              location.x ??
              50
            ),

            y: Number(
              location.y_position ??
              location.y ??
              50
            ),

            description:
              location.description ||
              'Information about this site feature is available in the Dharohar record.',

            significance:
              location.significance ||
              'An important part of this heritage site.',

            history:
              location.history ||
              '',

            interesting_facts:
              location.interesting_facts ||
              []
          })
        );

        setLocations(normalized);

        if (normalized.length) {
          setActiveId(normalized[0].id);
        }
      })
      .catch(() => {
        // Demo fallback remains visible.
      });

    return () => {
      mounted = false;
    };
  }, [heritageId]);

  const activeLocation =
    locations.find(
      (location) =>
        location.id === activeId
    ) || locations[0];

  return (
    <section
      className="section walk-section"
      id="explore"
      ref={ref}
    >
      <div className="container">

        <div className="section-head reveal">
          <span className="eyebrow">
            INTERACTIVE EXPLORATION
          </span>

          <h2>
            Explore the Site
          </h2>

          <p>
            Walk through the important locations within the heritage site.
            Select any location on the map to discover its history,
            architecture and cultural significance.
          </p>
        </div>

        {locations.length > 0 ? (
          <div className="walk-layout reveal">

            <div className="fort-map">

              <div className="map-title">
                <MapPin size={15} />
                Interactive Site Layout
              </div>

              <div className="fort-boundary" />

              <div className="main-path vertical" />

              <div className="main-path horizontal" />

              <div className="map-north">
                N ↑
              </div>

              {locations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  className={
                    activeId === location.id
                      ? 'location-marker active'
                      : 'location-marker'
                  }
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`
                  }}
                  onClick={() =>
                    setActiveId(location.id)
                  }
                >
                  <span className="marker-dot">
                    <MapPin size={15} />
                  </span>

                  <span className="marker-label">
                    {location.name}
                  </span>
                </button>
              ))}

              <div className="map-help">
                <Info size={14} />
                Click a location to explore
              </div>

            </div>

            <aside className="location-panel">

              {activeLocation && (
                <>
                  <div className="panel-top">

                    <span className="verified">
                      <ShieldCheck size={14} />
                      Dharohar Demo Record
                    </span>

                    <button
                      type="button"
                      className="close-panel"
                      onClick={() =>
                        setActiveId(null)
                      }
                    >
                      <X size={18} />
                    </button>

                  </div>

                  <h3>
                    {activeLocation.name}
                  </h3>

                  <div className="panel-section">
                    <span>ABOUT THIS LOCATION</span>

                    <p>
                      {activeLocation.description}
                    </p>
                  </div>

                  <div className="panel-section">
                    <span>SIGNIFICANCE</span>

                    <p>
                      {activeLocation.significance}
                    </p>
                  </div>

                  {activeLocation.history && (
                    <div className="panel-section">
                      <span>HISTORICAL CONTEXT</span>

                      <p>
                        {activeLocation.history}
                      </p>
                    </div>
                  )}

                  {Array.isArray(
                    activeLocation.interesting_facts
                  ) &&
                    activeLocation.interesting_facts.length >
                      0 && (
                      <div className="panel-section">
                        <span>INTERESTING FACT</span>

                        <p>
                          {
                            activeLocation
                              .interesting_facts[0]
                          }
                        </p>
                      </div>
                    )}

                </>
              )}

            </aside>

          </div>
        ) : (
          <div className="walk-empty">
            <MapPin size={36} />

            <h3>
              Interactive map not available
            </h3>

            <p>
              Internal locations have not yet been
              added for this heritage record.
            </p>
          </div>
        )}

      </div>

      <style>{`

        .walk-section {
          background: var(--paper);
        }

        .walk-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1.45fr)
            minmax(320px, .8fr);
          gap: 28px;
          align-items: stretch;
        }

        .fort-map {
          min-height: 590px;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background:
            linear-gradient(
              135deg,
              var(--slate),
              #274953
            );
          border:
            1px solid
            rgba(255,243,176,.25);
        }

        .fort-boundary {
          position: absolute;
          inset: 9%;
          border:
            2px solid
            rgba(255,243,176,.3);
          border-radius: 32px;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 34px,
              rgba(255,243,176,.04) 35px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 34px,
              rgba(255,243,176,.04) 35px
            );
        }

        .main-path {
          position: absolute;
          z-index: 1;
          background:
            rgba(224,159,62,.35);
        }

        .main-path.vertical {
          top: 12%;
          bottom: 12%;
          left: 50%;
          width: 5px;
          transform:
            translateX(-50%);
        }

        .main-path.horizontal {
          left: 12%;
          right: 12%;
          top: 51%;
          height: 4px;
        }

        .map-title {
          position: absolute;
          z-index: 5;
          top: 18px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--vanilla);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .map-north {
          position: absolute;
          z-index: 5;
          top: 18px;
          right: 20px;
          color: var(--yellow);
          font-size: 13px;
          font-weight: 800;
        }

        .location-marker {
          position: absolute;
          z-index: 4;
          transform:
            translate(-50%, -50%);
          width: 130px;
          min-height: 72px;
          border: none;
          background: transparent;
          color: var(--vanilla);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .marker-dot {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: var(--yellow);
          color: var(--slate);
          border:
            3px solid
            var(--slate);
          box-shadow:
            0 0 0 3px
            rgba(224,159,62,.35);
          transition:
            transform .2s ease,
            background .2s ease;
        }

        .location-marker:hover .marker-dot,
        .location-marker.active .marker-dot {
          transform: scale(1.25);
          background: var(--auburn);
          color: var(--vanilla);
        }

        .marker-label {
          padding: 4px 8px;
          border-radius: 999px;
          background:
            rgba(51,92,103,.9);
          border:
            1px solid
            rgba(255,243,176,.18);
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .map-help {
          position: absolute;
          z-index: 5;
          bottom: 18px;
          left: 18px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 13px;
          border-radius: 999px;
          background:
            rgba(51,92,103,.9);
          color: var(--vanilla);
          font-size: 11px;
        }

        .location-panel {
          min-height: 590px;
          padding: 30px;
          border-radius: 24px;
          background: var(--slate);
          color: var(--vanilla);
          border:
            1px solid
            rgba(255,243,176,.22);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .panel-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .verified {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--yellow);
          font-size: 11px;
          font-weight: 700;
        }

        .close-panel {
          border: none;
          background: transparent;
          color: var(--vanilla);
          cursor: pointer;
        }

        .location-panel h3 {
          color: var(--vanilla);
          font-size: 32px;
          margin: 4px 0 6px;
        }

        .panel-section {
          padding-top: 14px;
          border-top:
            1px solid
            rgba(255,243,176,.14);
        }

        .panel-section span {
          color: var(--yellow);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .1em;
        }

        .panel-section p {
          margin-top: 7px;
          color:
            rgba(255,243,176,.82);
          line-height: 1.7;
          font-size: 14px;
        }

        .walk-empty {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--slate);
          gap: 12px;
        }

        @media (max-width: 900px) {
          .walk-layout {
            grid-template-columns: 1fr;
          }

          .location-panel {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .fort-map {
            min-height: 520px;
          }

          .location-marker {
            width: 90px;
          }

          .marker-label {
            font-size: 8px;
            max-width: 100px;
          }

          .location-panel {
            padding: 22px;
          }
        }

      `}</style>

    </section>
  );
}