import { COLOR } from '../lib/colors';
import { fmtRange, fmtYear } from '../lib/format';
import type { SelectedItem } from '../data/types';
import { KnowledgeBaseStubs } from './KnowledgeBaseStubs';

interface RelatedItem {
  id: string;
  kind: SelectedItem['kind'];
  title: string;
  year: number | null;
  start: number | null;
  onPick: () => void;
}

interface DetailPanelProps {
  item: SelectedItem | null;
  related: RelatedItem[];
  onClose: () => void;
}

const KIND_LABEL: Record<SelectedItem['kind'], string> = {
  dynasty:    'Dynasty',
  concurrent: 'Concurrent state',
  event:      'Event',
  figure:     'Figure',
  culture:    'Cultural anchor',
  invention:  'Invention',
  global:     'Global context',
  era:        'Era',
};

const KIND_DOT_CLASS: Record<SelectedItem['kind'], string> = {
  dynasty:    'kind-dynasty',
  concurrent: 'kind-concurrent',
  event:      'kind-event',
  figure:     'kind-figure',
  culture:    'kind-culture',
  invention:  'kind-invention',
  global:     'kind-global',
  era:        'kind-era',
};

export function DetailPanel({ item, related, onClose }: DetailPanelProps) {
  if (!item) {
    return (
      <aside className="detail empty">
        <div className="detail-empty-art">
          <svg viewBox="0 0 100 100" width="80" height="80" aria-hidden>
            <circle cx="50" cy="50" r="38" fill="none" stroke={COLOR.ruleStrong} strokeWidth="1" />
            <circle cx="50" cy="50" r="3" fill={COLOR.vermillion} />
            <text x="50" y="92" fontFamily="Spectral, serif" fontSize="9" fill={COLOR.ink2} textAnchor="middle">
              select an item
            </text>
          </svg>
        </div>
        <div className="detail-empty-msg">
          Click any dynasty bar, event dot, or marker on the timeline to read its entry here.
        </div>
      </aside>
    );
  }

  const yearStr =
    item.start != null && item.end != null
      ? fmtRange(item.start, item.end)
      : item.year != null
      ? fmtYear(item.year)
      : '';

  const isSpan = item.start != null && item.end != null;

  return (
    <aside className="detail">
      <div className="detail-head">
        <div className="detail-kind">{KIND_LABEL[item.kind]}</div>
        <button className="detail-close" onClick={onClose} aria-label="Close detail panel">×</button>
      </div>
      <div className="detail-title">{item.title}</div>
      <div className="detail-year">{yearStr}</div>

      <div className="detail-plate">
        <div className="plate-frame">
          <div className="plate-stripes" />
          <div className="plate-caption">[ illustration ] {item.title}</div>
        </div>
      </div>

      <div className="detail-blurb">{item.summary || 'No description on file.'}</div>

      {isSpan && item.duration != null && item.importance != null && (
        <div className="detail-stats">
          <div><span>Duration</span><b>{item.duration} yrs</b></div>
          <div><span>Importance</span><b>{'★'.repeat(item.importance)}</b></div>
        </div>
      )}

      {related.length > 0 && (
        <>
          <div className="detail-rel-label">Related</div>
          <div className="detail-related">
            {related.map(r => (
              <button key={`${r.id}-${r.kind}`} className="rel-chip" onClick={r.onPick}>
                <span className={`kind-dot ${KIND_DOT_CLASS[r.kind]}`} />
                <span>{r.title}</span>
                <span className="rel-year">
                  {r.start != null ? fmtYear(r.start) : r.year != null ? fmtYear(r.year) : ''}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <KnowledgeBaseStubs id={item.id} title={item.title} />
    </aside>
  );
}
