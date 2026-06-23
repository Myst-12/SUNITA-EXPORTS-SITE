import styles from './WorldMap.module.css';

const exportDestinations = [
  { name: 'USA', cx: 85, cy: 110, labelDx: 12, labelDy: 13, labelAnchor: 'start' },
  { name: 'Canada', cx: 95, cy: 70, labelDx: -12, labelDy: -14, labelAnchor: 'end' },
  { name: 'UK', cx: 195, cy: 80, labelDx: -12, labelDy: -18, labelAnchor: 'end' },
  { name: 'Netherlands', cx: 200, cy: 75, labelDx: 14, labelDy: -22, labelAnchor: 'start' },
  { name: 'Germany', cx: 210, cy: 80, labelDx: 16, labelDy: 4, labelAnchor: 'start' },
  { name: 'UAE', cx: 260, cy: 125, labelDx: 14, labelDy: -16, labelAnchor: 'start' },
  { name: 'Saudi Arabia', cx: 250, cy: 125, labelDx: -14, labelDy: 18, labelAnchor: 'end' },
  { name: 'Nigeria', cx: 205, cy: 160, labelDx: -14, labelDy: 8, labelAnchor: 'end' },
  { name: 'South Africa', cx: 230, cy: 220, labelDx: -10, labelDy: 17, labelAnchor: 'end' },
  { name: 'Singapore', cx: 320, cy: 165, labelDx: 14, labelDy: -12, labelAnchor: 'start' },
  { name: 'Australia', cx: 350, cy: 210, labelDx: 12, labelDy: 14, labelAnchor: 'start' },
  { name: 'New Zealand', cx: 380, cy: 230, labelDx: -12, labelDy: 16, labelAnchor: 'end' },
];

const indiaOrigin = {
  name: 'Mumbai, India',
  cx: 285,
  cy: 135,
  labelDx: 16,
  labelDy: 18,
  labelAnchor: 'start',
};

const regionPills = [
  { emoji: '🇺🇸', label: 'Americas' },
  { emoji: '🇬🇧', label: 'Europe' },
  { emoji: '🇦🇪', label: 'Middle East' },
  { emoji: '🌍', label: 'Africa & Asia-Pacific' },
];

function buildTradePath(from, to) {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const distance = Math.hypot(dx, dy);
  const arcLift = Math.max(18, Math.min(54, distance * 0.18));
  const controlX = from.cx + dx * 0.5;
  const controlY = Math.min(from.cy, to.cy) - arcLift;

  return `M ${from.cx} ${from.cy} Q ${controlX} ${controlY} ${to.cx} ${to.cy}`;
}

function getLabelBox(location, isOrigin = false) {
  const fontSize = isOrigin ? 8.5 : location.name.length > 10 ? 8 : 8.5;
  const paddingX = isOrigin ? 7 : 6;
  const height = isOrigin ? 20 : 18;
  const width = Math.round(
    Math.max(38, location.name.length * (fontSize * 0.63) + paddingX * 2),
  );
  const edgeX = location.cx + location.labelDx;
  const edgeY = location.cy + location.labelDy;
  const x = location.labelAnchor === 'end' ? edgeX - width : edgeX;
  const textX = location.labelAnchor === 'end' ? edgeX - paddingX : edgeX + paddingX;

  return {
    fontSize,
    width,
    height,
    x,
    y: edgeY - height / 2,
    edgeX,
    edgeY,
    textX,
    textY: edgeY + 0.5,
    textAnchor: location.labelAnchor === 'end' ? 'end' : 'start',
  };
}

export default function WorldMap() {
  const originLabel = getLabelBox(indiaOrigin, true);

  return (
    <section className={styles.section} id="global-reach">
      <div className={styles.container}>
        <p className={styles.label}>GLOBAL REACH</p>
        <h2 className={styles.title}>Trusted Across 40+ Nations</h2>
        <p className={styles.subtitle}>
          From Mumbai to the world, we ship certified Indian agri-products to
          importers, distributors, and retailers across key trade corridors.
        </p>

        <div className={styles.mapCard}>
          <div className={styles.mapHeader}>
            <div>
              <p className={styles.mapEyebrow}>Export corridors from Mumbai</p>
              <p className={styles.mapCopy}>
                Every highlighted market is labeled directly on the map for
                faster scanning during buyer conversations.
              </p>
            </div>
            <span className={styles.mapBadge}>12 flagship destinations</span>
          </div>

          <div className={styles.mapWrapper}>
            <svg
              className={styles.mapSvg}
              viewBox="0 0 450 280"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="World map showing Sunita Agri Exports trade routes from Mumbai to key export destinations"
              role="img"
            >
              <desc>
                Stylized world map with Mumbai, India as the origin and named
                destination markers across the Americas, Europe, the Middle
                East, Africa, and Asia-Pacific.
              </desc>

              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f9fdf8" />
                  <stop offset="55%" stopColor="#eef7ec" />
                  <stop offset="100%" stopColor="#e5f1e2" />
                </linearGradient>
                <radialGradient id="originAura" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#c8922a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#c8922a" stopOpacity="0" />
                </radialGradient>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              <rect x="8" y="8" width="434" height="264" rx="26" fill="url(#oceanGradient)" />

              <path className={styles.mapGrid} d="M28 62H422" />
              <path className={styles.mapGrid} d="M28 110H422" />
              <path className={styles.mapGrid} d="M28 158H422" />
              <path className={styles.mapGrid} d="M28 206H422" />
              <path className={styles.mapGrid} d="M94 28V252" />
              <path className={styles.mapGrid} d="M175 28V252" />
              <path className={styles.mapGrid} d="M256 28V252" />
              <path className={styles.mapGrid} d="M337 28V252" />

              <circle
                cx={indiaOrigin.cx}
                cy={indiaOrigin.cy}
                r="72"
                fill="url(#originAura)"
                filter="url(#softGlow)"
              />

              <polygon
                className={styles.continent}
                points="
                  55,30 70,25 90,22 110,25 125,30 130,40 128,55
                  130,65 125,80 115,95 105,110 95,120 80,125
                  70,120 62,115 55,105 50,90 48,75 50,55 52,40
                "
              />
              <polygon
                className={styles.continent}
                points="140,20 155,18 165,22 168,32 162,42 150,45 140,40 138,30"
              />
              <polygon
                className={styles.continent}
                points="80,125 90,128 95,135 100,140 95,145 85,148 78,142 72,135 75,128"
              />
              <polygon
                className={styles.continent}
                points="
                  95,150 105,148 115,152 120,162 122,175 120,190
                  118,205 115,218 110,230 105,240 98,245
                  90,240 85,230 82,215 80,200 82,185 85,170 88,158
                "
              />
              <polygon
                className={styles.continentHighlight}
                points="
                  185,35 195,30 210,28 225,32 235,38 238,50
                  235,60 230,68 225,78 218,85 210,88 200,85
                  192,82 188,75 182,68 178,58 180,45
                "
              />
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
              <polygon
                className={styles.continentHighlight}
                points="
                  275,110 285,105 295,110 300,120 298,135
                  292,148 285,155 278,150 272,140 270,128 272,118
                "
              />
              <polygon
                className={styles.continentHighlight}
                points="
                  310,110 320,105 332,108 340,115 345,128
                  342,140 335,150 328,158 320,162 312,158
                  305,148 302,135 305,122
                "
              />
              <polygon
                className={styles.continent}
                points="360,55 368,50 375,55 378,65 375,75 368,78 362,72 358,65"
              />
              <polygon
                className={styles.continent}
                points="
                  330,190 345,185 360,188 372,195 378,208
                  375,222 368,232 355,238 340,238 328,232
                  320,225 318,215 322,202
                "
              />
              <polygon
                className={styles.continent}
                points="385,220 390,215 395,218 396,228 392,238 387,240 383,235 382,228"
              />

              {exportDestinations.map((dest, index) => (
                <path
                  key={`route-${dest.name}`}
                  className={styles.tradeRoute}
                  d={buildTradePath(indiaOrigin, dest)}
                  style={{ animationDelay: `-${index * 0.7}s` }}
                />
              ))}

              {exportDestinations.map((dest) => {
                const labelBox = getLabelBox(dest);

                return (
                  <g key={dest.name} className={styles.destinationGroup}>
                    <line
                      className={styles.labelConnector}
                      x1={dest.cx}
                      y1={dest.cy}
                      x2={labelBox.edgeX}
                      y2={labelBox.edgeY}
                    />
                    <circle className={styles.destinationHalo} cx={dest.cx} cy={dest.cy} r="7" />
                    <circle className={styles.dot} cx={dest.cx} cy={dest.cy} r="4">
                      <title>{dest.name}</title>
                    </circle>
                    <rect
                      className={styles.destinationLabelBox}
                      x={labelBox.x}
                      y={labelBox.y}
                      width={labelBox.width}
                      height={labelBox.height}
                      rx="9"
                    />
                    <text
                      className={styles.destinationLabel}
                      x={labelBox.textX}
                      y={labelBox.textY}
                      textAnchor={labelBox.textAnchor}
                      dominantBaseline="middle"
                      style={{ fontSize: labelBox.fontSize }}
                    >
                      {dest.name}
                    </text>
                  </g>
                );
              })}

              <line
                className={styles.originConnector}
                x1={indiaOrigin.cx}
                y1={indiaOrigin.cy}
                x2={originLabel.edgeX}
                y2={originLabel.edgeY}
              />
              <circle className={styles.indiaDotGlow} cx={indiaOrigin.cx} cy={indiaOrigin.cy} r="14" />
              <circle className={styles.indiaDot} cx={indiaOrigin.cx} cy={indiaOrigin.cy} r="5.5">
                <title>{indiaOrigin.name}</title>
              </circle>
              <rect
                className={styles.originLabelBox}
                x={originLabel.x}
                y={originLabel.y}
                width={originLabel.width}
                height={originLabel.height}
                rx="10"
              />
              <text
                className={styles.originLabel}
                x={originLabel.textX}
                y={originLabel.textY}
                textAnchor={originLabel.textAnchor}
                dominantBaseline="middle"
                style={{ fontSize: originLabel.fontSize }}
              >
                {indiaOrigin.name}
              </text>
            </svg>
          </div>

          <div className={styles.regionPills}>
            {regionPills.map((region) => (
              <span key={region.label} className={styles.pill}>
                {region.emoji} {region.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
