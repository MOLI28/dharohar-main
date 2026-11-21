import React, { useMemo, useState } from 'react';
import {
  MapPin,
  Navigation,
  Loader2,
  Search,
  Landmark,
  Palette,
  Music,
  BookOpen,
  Compass
} from 'lucide-react';

import { Link } from 'react-router-dom';
import api from '../services/api.js';
import { DEMO_HERITAGE } from '../data/demoHeritage.js';

const categoryIcons = {
  'Monuments & Places': Landmark,
  'Temples': Landmark,
  'Crafts': Palette,
  'Stories & Traditions': BookOpen,
  'Music & Dance': Music
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const toRadians = (value) =>
    (value * Math.PI) / 180;

  const latitudeDifference =
    toRadians(lat2 - lat1);

  const longitudeDifference =
    toRadians(lon2 - lon1);

  const a =
    Math.sin(latitudeDifference / 2) *
      Math.sin(latitudeDifference / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

export default function Explore() {
  const [items, setItems] =
    useState(DEMO_HERITAGE || []);

  const [search, setSearch] =
    useState('');

  const [activeCategory, setActiveCategory] =
    useState('All');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const categories = useMemo(() => {
    if (!Array.isArray(DEMO_HERITAGE)) {
      return ['All'];
    }

    return [
      'All',
      ...new Set(
        DEMO_HERITAGE
          .map((item) => item.category)
          .filter(Boolean)
      )
    ];
  }, []);

  const filteredItems = useMemo(() => {
    const query =
      search.toLowerCase().trim();

    return items.filter((item) => {
      const categoryMatches =
        activeCategory === 'All' ||
        item.category === activeCategory;

      const searchableText = [
        item.name,
        item.category,
        item.city,
        item.state,
        item.region,
        item.short_description,
        item.description
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const searchMatches =
        !query ||
        searchableText.includes(query);

      return (
        categoryMatches &&
        searchMatches
      );
    });
  }, [
    items,
    search,
    activeCategory
  ]);

  const exploreNearMe = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setLoading(false);

      setError(
        'Geolocation is not supported by this browser. Showing all curated heritage.'
      );

      setItems(DEMO_HERITAGE);

      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude =
          position.coords.latitude;

        const longitude =
          position.coords.longitude;

        try {
          const results =
            await api.nearby(
              latitude,
              longitude,
              150
            );

          if (
            Array.isArray(results) &&
            results.length > 0
          ) {
            setItems(results);
          } else {
            throw new Error(
              'No nearby API results'
            );
          }
        } catch {
          const nearbyHeritage =
            DEMO_HERITAGE
              .filter(
                (item) =>
                  item.latitude &&
                  item.longitude
              )
              .map((item) => ({
                ...item,

                distance_km: Number(
                  calculateDistance(
                    latitude,
                    longitude,
                    item.latitude,
                    item.longitude
                  ).toFixed(1)
                )
              }))
              .sort(
                (a, b) =>
                  a.distance_km -
                  b.distance_km
              );

          setItems(nearbyHeritage);

          setError(
            'Showing nearby records from the Dharohar curated demo archive.'
          );
        } finally {
          setLoading(false);
        }
      },

      () => {
        setLoading(false);

        setItems(DEMO_HERITAGE);

        setError(
          'Location permission was not granted. Showing all curated heritage instead.'
        );
      }
    );
  };

  const showAllHeritage = () => {
    setItems(DEMO_HERITAGE);
    setSearch('');
    setActiveCategory('All');
    setError('');
  };

  return (
    <main className="explore-page">

      <section className="explore-hero">

        <div className="container">

          <span className="eyebrow">
            Discover India
          </span>

          <h1>
            Explore India's Heritage
          </h1>

          <p>
            Discover monuments, temples,
            crafts, traditions, stories,
            music and dance from across India.
          </p>

          <div className="explore-search">

            <Search size={20} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search monuments, temples, crafts, traditions..."
            />

          </div>

          <div className="explore-actions">

            <button
              className="btn btn-primary"
              onClick={exploreNearMe}
              disabled={loading}
            >

              {loading ? (
                <Loader2
                  size={18}
                  className="spin"
                />
              ) : (
                <Navigation size={18} />
              )}

              {loading
                ? 'Finding Heritage...'
                : 'Explore Near Me'}

            </button>

            <button
              className="btn explore-all-button"
              onClick={showAllHeritage}
            >
              <Compass size={18} />
              Explore All
            </button>

          </div>

        </div>

      </section>


      <section className="section section--cream">

        <div className="container">

          <div className="section-head">

            <span className="eyebrow">
              Heritage Discovery
            </span>

            <h2>
              Explore the Archive
            </h2>

            <p>
              Discover curated and
              source-backed heritage records
              from across India.
            </p>

          </div>


          {error && (
            <div className="explore-message">
              <MapPin size={18} />

              <span>
                {error}
              </span>
            </div>
          )}


          <div className="category-filters">

            {categories.map(
              (category) => {
                const Icon =
                  category === 'All'
                    ? Compass
                    : categoryIcons[
                        category
                      ] || Landmark;

                return (
                  <button
                    key={category}
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={
                      activeCategory ===
                      category
                        ? 'category-button active'
                        : 'category-button'
                    }
                  >

                    <Icon size={16} />

                    {category}

                  </button>
                );
              }
            )}

          </div>


          <div className="result-count">

            <strong>
              {filteredItems.length}
            </strong>

            {' '}heritage records found

          </div>


          <div className="explore-grid">

            {filteredItems.map(
              (item) => {

                const image =
                  item.image ||
                  item.images?.[0] ||
                  '';

                const description =
                  item.description ||
                  item.short_description ||
                  'Explore the history and cultural significance of this heritage.';

                return (

                  <Link
                    key={
                      item.id ||
                      item.slug
                    }
                    to={`/heritage/${
                      item.slug ||
                      item.id
                    }`}
                    className="explore-card"
                  >

                    <div className="explore-card-image">

                      {image ? (

                        <img
                          src={image}
                          alt={item.name}
                        />

                      ) : (

                        <div className="image-placeholder">

                          <Landmark
                            size={45}
                          />

                        </div>

                      )}

                      <span className="category-badge">

                        {item.category}

                      </span>

                    </div>


                    <div className="explore-card-content">

                      <div className="location">

                        <MapPin size={14} />

                        <span>

                          {item.city ||
                            'India'}

                          {item.state &&
                            item.city &&
                            `, ${item.state}`}

                        </span>

                      </div>


                      <h3>
                        {item.name}
                      </h3>


                      <p>
                        {description}
                      </p>


                      {item.distance_km !==
                        undefined && (

                        <span className="distance">

                          {item.distance_km} km
                          away

                        </span>

                      )}


                      <span className="explore-link">

                        Explore Heritage →

                      </span>

                    </div>

                  </Link>

                );
              }
            )}

          </div>


          {filteredItems.length === 0 && (

            <div className="empty-state">

              <Search size={40} />

              <h3>
                No heritage found
              </h3>

              <p>
                Try another name,
                location or category.
              </p>

              <button
                className="btn btn-primary"
                onClick={showAllHeritage}
              >
                Show All Heritage
              </button>

            </div>

          )}

        </div>

      </section>


      <style>{`

        .explore-page {
          background: var(--paper);
        }

        .explore-hero {
          padding: 150px 0 100px;
          background:
            linear-gradient(
              135deg,
              var(--slate),
              #274953
            );
          color: var(--vanilla);
        }

        .explore-hero h1 {
          color: var(--vanilla);
          font-size:
            clamp(
              42px,
              7vw,
              72px
            );
          margin-top: 18px;
          max-width: 800px;
        }

        .explore-hero p {
          max-width: 700px;
          margin-top: 18px;
          color:
            rgba(
              255,
              243,
              176,
              .85
            );
          font-size: 18px;
        }

        .explore-search {
          margin-top: 30px;
          max-width: 750px;
          background:
            var(--vanilla);
          color:
            var(--slate);
          display: flex;
          align-items: center;
          gap: 12px;
          padding:
            7px
            20px;
          border-radius: 14px;
        }

        .explore-search input {
          flex: 1;
          border: none;
          outline: none;
          background:
            transparent;
          padding: 13px 0;
          font-size: 15px;
          color:
            var(--slate);
        }

        .explore-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }

        .explore-all-button {
          background:
            transparent;
          border:
            1px solid
            var(--vanilla);
          color:
            var(--vanilla);
        }

        .explore-message {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 25px;
          padding: 14px;
          border-radius: 12px;
          background:
            rgba(
              224,
              159,
              62,
              .15
            );
          color:
            var(--slate);
        }

        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .category-button {
          display: flex;
          align-items: center;
          gap: 7px;
          padding:
            10px
            16px;
          border-radius: 999px;
          border:
            1px solid
            rgba(
              51,
              92,
              103,
              .25
            );
          background:
            var(--vanilla);
          color:
            var(--slate);
          font-weight: 600;
        }

        .category-button.active {
          background:
            var(--auburn);
          color:
            var(--vanilla);
          border-color:
            var(--auburn);
        }

        .result-count {
          margin-bottom: 22px;
          color:
            var(--slate);
        }

        .result-count strong {
          color:
            var(--auburn);
          font-size: 20px;
        }

        .explore-grid {
          display: grid;
          grid-template-columns:
            repeat(
              3,
              minmax(
                0,
                1fr
              )
            );
          gap: 24px;
        }

        .explore-card {
          overflow: hidden;
          border-radius: 18px;
          background:
            var(--vanilla);
          border:
            1px solid
            rgba(
              51,
              92,
              103,
              .18
            );
          transition:
            transform .25s ease,
            box-shadow .25s ease;
          box-shadow:
            0 8px 20px
            rgba(
              51,
              92,
              103,
              .12
            );
        }

        .explore-card:hover {
          transform:
            translateY(-6px);
          box-shadow:
            0 18px 35px
            rgba(
              51,
              92,
              103,
              .2
            );
        }

        .explore-card-image {
          position: relative;
          height: 220px;
          background:
            var(--slate);
        }

        .explore-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-placeholder {
          height: 100%;
          display: grid;
          place-items: center;
          color:
            var(--yellow);
        }

        .category-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background:
            var(--yellow);
          color:
            var(--slate);
          padding:
            6px
            10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
        }

        .explore-card-content {
          padding: 20px;
        }

        .location {
          display: flex;
          gap: 6px;
          align-items: center;
          font-size: 12px;
          color:
            var(--slate);
        }

        .explore-card h3 {
          margin: 10px 0;
          color:
            var(--auburn);
          font-size: 24px;
        }

        .explore-card p {
          color:
            var(--slate);
          font-size: 14px;
        }

        .explore-link {
          display: block;
          margin-top: 18px;
          color:
            var(--auburn);
          font-weight: 700;
        }

        .distance {
          display: block;
          margin-top: 12px;
          color:
            var(--slate);
          font-size: 12px;
          font-weight: 700;
        }

        .empty-state {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 12px;
          color:
            var(--slate);
        }

        .spin {
          animation:
            spin
            1s
            linear
            infinite;
        }

        @keyframes spin {
          to {
            transform:
              rotate(360deg);
          }
        }

        @media (
          max-width: 950px
        ) {
          .explore-grid {
            grid-template-columns:
              repeat(
                2,
                1fr
              );
          }
        }

        @media (
          max-width: 600px
        ) {
          .explore-grid {
            grid-template-columns:
              1fr;
          }

          .explore-hero {
            padding:
              130px
              0
              70px;
          }
        }

      `}</style>

    </main>
  );
}