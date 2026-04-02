import { useState } from "react";
import { startMatch, playCard, drawCard } from "./api/startMatch";
import { CardData, MatchState } from "./types";
import "./App.css";

const SHOT_LABELS: Record<string, string> = {
  short_serv: "Service court",
  long_serv: "Service long",
  clear: "Clear",
  drop: "Drop",
  smash: "Smash",
  lift: "Lift",
  slice: "Slice",
  drive: "Drive",
  block: "Block",
  attack: "Attaque",
  rush: "Rush",
  defense: "Defense",
  defence: "Defense",
};

const SPECIAL_LABELS: Record<string, string> = {
  winPoint: "Point Gagnant",
  calledOut: "Challenge Out",
  joker: "Joker",
  serveOut: "Faute de Service",
  winningSmash: "Smash Gagnant",
};

const SPECIAL_EMOJIS: Record<string, string> = {
  winPoint: "\u{1F3C6}",
  calledOut: "\u{1F6A9}",
  joker: "\u{1F0CF}",
  serveOut: "\u274C",
  winningSmash: "\u{1F4A5}",
};

const ZONE_LABELS: Record<string, string> = {
  shortLeft: "Court G",
  shortRight: "Court D",
  midLeft: "Mi-court G",
  midRight: "Mi-court D",
  longLeft: "Fond G",
  longRight: "Fond D",
  middleLeft: "Centre G",
  middleRight: "Centre D",
};

function formatShot(shot?: string): string {
  return shot ? SHOT_LABELS[shot] || shot : "";
}

function formatZone(zone?: string): string {
  return zone ? ZONE_LABELS[zone] || zone : "";
}

/* ===== SVG Badminton Court ===== */
function CourtSVG() {
  // Court viewed from above, horizontal layout
  // Real proportions: 13.4m x 6.1m (singles: 5.18m wide)
  const w = 1000;
  const h = 460;
  const pad = 20;
  const cx = w / 2;
  const cy = h / 2;
  // Court rect
  const cLeft = pad;
  const cRight = w - pad;
  const cTop = pad;
  const cBottom = h - pad;
  const cW = cRight - cLeft;
  const cH = cBottom - cTop;
  // Service lines (short service: ~1.98m from net = ~15% of half court)
  const shortServeOffset = cH * 0.15;
  // Long service (doubles): ~0.76m from back = ~5.7% of half
  const longServeOffset = cH * 0.057;
  // Center line
  const centerX = cx;

  const lineColor = "rgba(255,255,255,0.55)";
  const lineWidth = 2;
  const netColor = "rgba(255,255,255,0.8)";

  return (
    <svg className="court-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {/* Court surface */}
      <defs>
        <linearGradient id="courtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a7d3f" />
          <stop offset="48%" stopColor="#236e35" />
          <stop offset="52%" stopColor="#1f6030" />
          <stop offset="100%" stopColor="#2a7d3f" />
        </linearGradient>
        {/* Net pattern */}
        <pattern id="netPattern" width="12" height="12" patternUnits="userSpaceOnUse">
          <line x1="0" y1="6" x2="12" y2="6" stroke={netColor} strokeWidth="0.5" />
          <line x1="6" y1="0" x2="6" y2="12" stroke={netColor} strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect x="0" y="0" width={w} height={h} fill="url(#courtGrad)" />

      {/* Outer boundary */}
      <rect
        x={cLeft} y={cTop} width={cW} height={cH}
        fill="none" stroke={lineColor} strokeWidth={lineWidth + 1}
      />

      {/* Net area (thick band across center) */}
      <rect x={cLeft} y={cy - 4} width={cW} height={8} fill="url(#netPattern)" opacity="0.6" />
      <line x1={cLeft} y1={cy} x2={cRight} y2={cy} stroke={netColor} strokeWidth={3} />
      {/* Net posts */}
      <circle cx={cLeft - 2} cy={cy} r={5} fill={netColor} opacity="0.6" />
      <circle cx={cRight + 2} cy={cy} r={5} fill={netColor} opacity="0.6" />

      {/* Center line (divides left/right service courts) - top half */}
      <line
        x1={centerX} y1={cTop + shortServeOffset}
        x2={centerX} y2={cy}
        stroke={lineColor} strokeWidth={lineWidth}
      />
      {/* Center line - bottom half */}
      <line
        x1={centerX} y1={cy}
        x2={centerX} y2={cBottom - shortServeOffset}
        stroke={lineColor} strokeWidth={lineWidth}
      />

      {/* Short service line - top */}
      <line
        x1={cLeft} y1={cTop + shortServeOffset}
        x2={cRight} y2={cTop + shortServeOffset}
        stroke={lineColor} strokeWidth={lineWidth}
      />
      {/* Short service line - bottom */}
      <line
        x1={cLeft} y1={cBottom - shortServeOffset}
        x2={cRight} y2={cBottom - shortServeOffset}
        stroke={lineColor} strokeWidth={lineWidth}
      />

      {/* Long service line (doubles) - top */}
      <line
        x1={cLeft} y1={cTop + longServeOffset}
        x2={cRight} y2={cTop + longServeOffset}
        stroke={lineColor} strokeWidth={1} strokeDasharray="6,4"
      />
      {/* Long service line (doubles) - bottom */}
      <line
        x1={cLeft} y1={cBottom - longServeOffset}
        x2={cRight} y2={cBottom - longServeOffset}
        stroke={lineColor} strokeWidth={1} strokeDasharray="6,4"
      />

      {/* Singles sidelines (inner) */}
      <line
        x1={cLeft + cW * 0.07} y1={cTop}
        x2={cLeft + cW * 0.07} y2={cBottom}
        stroke={lineColor} strokeWidth={1} opacity="0.4"
      />
      <line
        x1={cRight - cW * 0.07} y1={cTop}
        x2={cRight - cW * 0.07} y2={cBottom}
        stroke={lineColor} strokeWidth={1} opacity="0.4"
      />

      {/* Zone labels */}
      <text x={centerX - cW * 0.2} y={cTop + shortServeOffset / 2 + 4} fill="rgba(255,255,255,0.15)" fontSize="14" textAnchor="middle" fontWeight="600">FOND G</text>
      <text x={centerX + cW * 0.2} y={cTop + shortServeOffset / 2 + 4} fill="rgba(255,255,255,0.15)" fontSize="14" textAnchor="middle" fontWeight="600">FOND D</text>
      <text x={centerX - cW * 0.2} y={cy - cH * 0.15} fill="rgba(255,255,255,0.12)" fontSize="13" textAnchor="middle" fontWeight="600">MI-COURT G</text>
      <text x={centerX + cW * 0.2} y={cy - cH * 0.15} fill="rgba(255,255,255,0.12)" fontSize="13" textAnchor="middle" fontWeight="600">MI-COURT D</text>
      <text x={centerX - cW * 0.2} y={cy + cH * 0.18} fill="rgba(255,255,255,0.12)" fontSize="13" textAnchor="middle" fontWeight="600">MI-COURT G</text>
      <text x={centerX + cW * 0.2} y={cy + cH * 0.18} fill="rgba(255,255,255,0.12)" fontSize="13" textAnchor="middle" fontWeight="600">MI-COURT D</text>
      <text x={centerX - cW * 0.2} y={cBottom - shortServeOffset / 2 + 4} fill="rgba(255,255,255,0.15)" fontSize="14" textAnchor="middle" fontWeight="600">FOND G</text>
      <text x={centerX + cW * 0.2} y={cBottom - shortServeOffset / 2 + 4} fill="rgba(255,255,255,0.15)" fontSize="14" textAnchor="middle" fontWeight="600">FOND D</text>
    </svg>
  );
}

/* ===== Card Component ===== */
function CardComponent({
  card,
  onClick,
  isCurrentPlayer,
}: {
  card: CardData;
  onClick?: () => void;
  isCurrentPlayer: boolean;
}) {
  const canClick = isCurrentPlayer && card.isPlayable && onClick;
  const classes = [
    "card",
    card.type,
    card.class === "SpecialCard" ? card.description || "" : "",
    canClick ? "playable" : "",
    isCurrentPlayer && !card.isPlayable ? "inactive" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (card.class === "SpecialCard") {
    return (
      <div className={classes} onClick={canClick ? onClick : undefined}>
        <span className="card-type-badge">Special</span>
        <div className="card-emoji">{SPECIAL_EMOJIS[card.description || ""] || "\u2728"}</div>
        <div className="card-description">
          {SPECIAL_LABELS[card.description || ""] || card.description}
        </div>
      </div>
    );
  }

  return (
    <div className={classes} onClick={canClick ? onClick : undefined}>
      <span className="card-type-badge">{card.type === "serve" ? "Service" : "Technique"}</span>
      <div className="card-side">
        <span className="card-side-label">Option A</span>
        <span className="card-shot">{formatShot(card.first_shot)}</span>
        <span className="card-position">
          {formatZone(card.first_position)} \u2192 {formatZone(card.first_target)}
        </span>
      </div>
      <div className="card-divider" />
      <div className="card-side">
        <span className="card-side-label">Option B</span>
        <span className="card-shot">{formatShot(card.second_shot)}</span>
        <span className="card-position">
          {formatZone(card.second_position)} \u2192 {formatZone(card.second_target)}
        </span>
      </div>
    </div>
  );
}

/* ===== Main App ===== */
function App() {
  const [state, setState] = useState<MatchState | null>(null);
  const [p1Name, setP1Name] = useState("Joueur 1");
  const [p2Name, setP2Name] = useState("Joueur 2");
  const [choosing, setChoosing] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    setLoading(true);
    try {
      const data = await startMatch(p1Name, p2Name);
      setState(data);
    } finally {
      setLoading(false);
    }
  }

  async function handlePlayCard(card: CardData) {
    if (!state) return;

    if (card.class === "SpecialCard") {
      setLoading(true);
      try {
        const data = await playCard(state.matchId, card.id, "first");
        setState(data);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (card.first_shot === card.second_shot) {
      setLoading(true);
      try {
        const data = await playCard(state.matchId, card.id, "first");
        setState(data);
      } finally {
        setLoading(false);
      }
      return;
    }

    setChoosing(card);
  }

  async function handleSideChoice(side: "first" | "second") {
    if (!state || !choosing) return;
    setLoading(true);
    setChoosing(null);
    try {
      const data = await playCard(state.matchId, choosing.id, side);
      setState(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDraw() {
    if (!state) return;
    setLoading(true);
    try {
      const data = await drawCard(state.matchId);
      setState(data);
    } finally {
      setLoading(false);
    }
  }

  // Start screen
  if (!state) {
    return (
      <div className="start-screen">
        <div className="shuttlecock-icon">{"\u{1F3F8}"}</div>
        <h1>
          Badminton <span>Card Game</span>
        </h1>
        <div className="start-form">
          <input
            placeholder="Joueur 1"
            value={p1Name}
            onChange={(e) => setP1Name(e.target.value)}
          />
          <input
            placeholder="Joueur 2"
            value={p2Name}
            onChange={(e) => setP2Name(e.target.value)}
          />
          <button onClick={handleStart} disabled={loading}>
            {loading ? "Chargement..." : "Commencer le match"}
          </button>
        </div>
      </div>
    );
  }

  const player1 = state.players[0];
  const player2 = state.players[1];
  const topCard = state.middleDeckTopCard;

  return (
    <div className="game-container">
      {/* Winner overlay */}
      {state.winner && (
        <div className="winner-overlay">
          <h2>{"\u{1F3C6}"} Victoire !</h2>
          <p>{state.winner} remporte le match !</p>
          <p className="final-score">
            {player1.score} - {player2.score}
          </p>
          <button onClick={() => setState(null)}>Nouvelle partie</button>
        </div>
      )}

      {/* Side choice modal */}
      {choosing && (
        <div className="side-choice-overlay" onClick={() => setChoosing(null)}>
          <div className="side-choice-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Choisissez votre coup</h3>
            <div className="side-choice-options">
              <button className="side-choice-btn" onClick={() => handleSideChoice("first")}>
                <span className="shot-name">{formatShot(choosing.first_shot)}</span>
                <span className="shot-detail">
                  {formatZone(choosing.first_position)} {"\u2192"} {formatZone(choosing.first_target)}
                </span>
              </button>
              <button className="side-choice-btn" onClick={() => handleSideChoice("second")}>
                <span className="shot-name">{formatShot(choosing.second_shot)}</span>
                <span className="shot-detail">
                  {formatZone(choosing.second_position)} {"\u2192"} {formatZone(choosing.second_target)}
                </span>
              </button>
            </div>
            <button className="side-choice-cancel" onClick={() => setChoosing(null)}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Player 1 (top) */}
      <div className={`player-area top ${state.currentPlayerId === player1.id ? "active" : ""}`}>
        <div className="player-header">
          <span className={`player-name ${state.currentPlayerId === player1.id ? "active" : ""}`}>
            {player1.name}
            {state.currentPlayerId === player1.id && <span className="turn-badge">A vous</span>}
          </span>
          <span className="player-score">{player1.score}</span>
        </div>
        <div className="hand">
          {player1.hand.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              isCurrentPlayer={state.currentPlayerId === player1.id}
              onClick={() => handlePlayCard(card)}
            />
          ))}
        </div>
      </div>

      {/* Court area with SVG */}
      <div className="court-area">
        <CourtSVG />

        <div className="court-content">
          {/* Scoreboard */}
          <div className="scoreboard">
            <div className="score-row">
              <div className="score-item">
                <div className="score-name">{player1.name}</div>
                <div className="score-value">{player1.score}</div>
              </div>
              <div className="score-separator">:</div>
              <div className="score-item">
                <div className="score-name">{player2.name}</div>
                <div className="score-value">{player2.score}</div>
              </div>
            </div>
          </div>

          {/* Played card + shot indicator */}
          <div className="played-card-area">
            {topCard ? (
              <>
                <div className="played-card-wrapper">
                  <CardComponent card={topCard} isCurrentPlayer={false} />
                </div>
                {topCard.current_shot && (
                  <div className="current-shot-indicator">
                    <div className="current-shot-label">Coup joue</div>
                    <div className="current-shot-name">{formatShot(topCard.current_shot)}</div>
                    {topCard.target && (
                      <div className="current-shot-target">
                        {"\u2192"} {formatZone(topCard.target)}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="no-card-placeholder">En attente...</div>
            )}
          </div>

          {/* Right panel */}
          <div className="court-right-panel">
            <div className="court-message">{state.message}</div>

            {state.canDraw && !state.winner && (
              <div className="action-bar">
                <button
                  className="btn-draw"
                  onClick={handleDraw}
                  disabled={loading || state.drawsRemaining <= 0}
                >
                  Piocher ({state.drawsRemaining})
                </button>
              </div>
            )}

            <div className="court-info">
              <span>Pioche: {state.mainDeckCount}</span>
              <span>Services: {state.serveDeckCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Player 2 (bottom) */}
      <div className={`player-area bottom ${state.currentPlayerId === player2.id ? "active" : ""}`}>
        <div className="player-header">
          <span className={`player-name ${state.currentPlayerId === player2.id ? "active" : ""}`}>
            {player2.name}
            {state.currentPlayerId === player2.id && <span className="turn-badge">A vous</span>}
          </span>
          <span className="player-score">{player2.score}</span>
        </div>
        <div className="hand">
          {player2.hand.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              isCurrentPlayer={state.currentPlayerId === player2.id}
              onClick={() => handlePlayCard(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
