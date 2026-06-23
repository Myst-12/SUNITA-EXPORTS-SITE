'use client';

import styles from './WorldMap.module.css';

const exportDestinations = [
  { name: 'USA', cx: 85, cy: 110 },
  { name: 'Canada', cx: 95, cy: 70 },
  { name: 'UK', cx: 195, cy: 80 },
  { name: 'Netherlands', cx: 200, cy: 75 },
  { name: 'Germany', cx: 210, cy: 80 },
  { name: 'UAE', cx: 260, cy: 125 },
  { name: 'Saudi Arabia', cx: 250, cy: 125 },
  { name: 'Nigeria', cx: 205, cy: 160 },
  { name: 'South Africa', cx: 230, cy: 220 },
  { name: 'Singapore', cx: 320, cy: 165 },
  { name: 'Australia', cx: 350, cy: 210 },
  { name: 'New Zealand', cx: 380, cy: 230 },
];

const indiaDot = { name: 'Mumbai, India', cx: 285, cy: 135 };

const regionPills = [
  { emoji: '🇺🇸', label: 'Americas' },
  { emoji: '🇬🇧', label: 'Europe' },
  { emoji: '🇦🇪', label: 'Middle East' },
  { emoji: '🌍', label: 'Africa & Asia-Pacific' },
];

export default function WorldMap() {
  return (
    <section className={styles.section} id="global-reach">
      <div className={styles.container}>
        <p className={styles.label}>GLOBAL REACH</p>
        <h2 className={styles.title}>Trusted Across 40+ Nations</h2>
        <p className={styles.subtitle}>
          From Mumbai to the world — delivering certified Indian agri-products
          to food importers, distributors, and retailers globally.
        </p>

        <div className={styles.mapWrapper}>
          <svg
            className={styles.mapSvg}
            viewBox="0 0 450 280"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="World map showing Sunita Agri Exports global trade routes"
            role="img"
          >
            {/* ── Continent Shapes (simplified polygons) ── */}

            {/* North America */}
            <polygon
              className={styles.continent}
              points="
                55,30 70,25 90,22 110,25 125,30 130,40 128,55
                130,65 125,80 115,95 105,110 95,120 80,125
                70,120 62,115 55,105 50,90 48,75 50,55 52,40
              "
            />
            {/* Greenland */}
            <polygon
              className={styles.continent}
              points="140,20 155,18 165,22 168,32 162,42 150,45 140,40 138,30"
            />
            {/* Central America & Caribbean */}
            <polygon
              className={styles.continent}
              points="80,125 90,128 95,135 100,140 95,145 85,148 78,142 72,135 75,128"
            />

            {/* South America */}
            <polygon
              className={styles.continent}
              points="
                95,150 105,148 115,152 120,162 122,175 120,190
                118,205 115,218 110,230 105,240 98,245
                90,240 85,230 82,215 80,200 82,185 85,170 88,158
              "
            />

            {/* Europe */}
            <polygon
              className={styles.continentHighlight}
              points="
                185,35 195,30 210,28 225,32 235,38 238,50
                235,60 230,68 225,78 218,85 210,88 200,85
                192,82 188,75 182,68 178,58 180,45
              "
            />

            {/* Africa */}
            <polygon
              className={styles.continentHighlight}
              points="
                195,100 205,95 218,93 228,95 235,102 240,115
                242,130 240,148 238,165 235,180 230,195 225,210
                218,225 210,230 202,228 196,218 192,205
                188,190 185,175 183,158 182,140 184,125
                186,112
              "
            />

            {/* Asia (large shape covering Middle East through East Asia) */}
            <polygon
              className={styles.continentHighlight}
              points="
                240,28 255,22 275,20 295,22 315,25 335,30
                350,35 365,38 375,42 380,55 378,68 370,78
                360,85 345,88 335,92 320,98 310,108 305,118
                298,125 290,130 282,128 275,122 268,115
                255,108 248,100 242,90 238,78 236,65
                235,50 236,38
              "
            />
            {/* Indian Subcontinent */}
            <polygon
              className={styles.continentHighlight}
              points="
                275,110 285,105 295,110 300,120 298,135
                292,148 285,155 278,150 272,140 270,128 272,118
              "
            />
            {/* Southeast Asia */}
            <polygon
              className={styles.continentHighlight}
              points="
                310,110 320,105 332,108 340,115 345,128
                342,140 335,150 328,158 320,162 312,158
                305,148 302,135 305,122
              "
            />
            {/* Japan / Korean Peninsula */}
            <polygon
              className={styles.continent}
              points="360,55 368,50 375,55 378,65 375,75 368,78 362,72 358,65"
            />

            {/* Australia */}
            <polygon
              className={styles.continent}
              points="
                330,190 345,185 360,188 372,195 378,208
                375,222 368,232 355,238 340,238 328,232
                320,225 318,215 322,202
              "
            />
            {/* New Zealand */}
            <polygon
              className={styles.continent}
              points="385,220 390,215 395,218 396,228 392,238 387,240 383,235 382,228"
            />

            {/* ── Dashed Trade Lines from India ── */}
            {exportDestinations.map((dest) => (
              <line
                key={`line-${dest.name}`}
                className={styles.dashedLine}
                x1={indiaDot.cx}
                y1={indiaDot.cy}
                x2={dest.cx}
                y2={dest.cy}
              />
            ))}

            {/* ── Export Destination Dots ── */}
            {exportDestinations.map((dest, i) => (
              <circle
                key={dest.name}
                className={styles.dot}
                cx={dest.cx}
                cy={dest.cy}
                r="3"
                style={{ animationDelay: `${(i * 0.3) % 2.4}s` }}
              >
                <title>{dest.name}</title>
              </circle>
            ))}

            {/* ── India / Mumbai Origin Dot ── */}
            {/* Glow ring */}
            <circle
              className={styles.indiaDotGlow}
              cx={indiaDot.cx}
              cy={indiaDot.cy}
              r="12"
            />
            {/* Main gold dot */}
            <circle
              className={styles.indiaDot}
              cx={indiaDot.cx}
              cy={indiaDot.cy}
              r="5"
            >
              <title>{indiaDot.name}</title>
            </circle>
            {/* Label */}
            <text
              className={styles.indiaLabel}
              x={indiaDot.cx + 10}
              y={indiaDot.cy + 3}
            >
              Mumbai, India
            </text>
          </svg>
        </div>

        {/* ── Region Pills ── */}
        <div className={styles.regionPills}>
          {regionPills.map((region) => (
            <span key={region.label} className={styles.pill}>
              {region.emoji} {region.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
