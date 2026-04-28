import { backbonePath, type SnakeGeometry } from '../../lib/snake-path';
import { COLOR } from '../../lib/colors';

interface SnakeBackboneProps {
  geometry: SnakeGeometry;
}

export function SnakeBackbone({ geometry }: SnakeBackboneProps) {
  const d = backbonePath(geometry);
  return (
    <path
      d={d}
      fill="none"
      stroke={COLOR.ruleStrong}
      strokeWidth={1.5}
      strokeLinecap="round"
      opacity={0.35}
      data-testid="snake-backbone"
    />
  );
}
