import { z } from 'zod';

// ---------- Source dataset shape (matches china-history.json) ----------

export const entityTypeSchema = z.enum([
  'macro_system',
  'regime',
  'event',
  'figure',
  'cultural_anchor',
  'global_context',
]);
export type EntityType = z.infer<typeof entityTypeSchema>;

export const sourceLaneSchema = z.enum([
  'main', 'north', 'west', 'south',
  'event', 'figure', 'anchor', 'global',
]);
export type SourceLane = z.infer<typeof sourceLaneSchema>;

export const importanceSchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5),
]);
export type Importance = z.infer<typeof importanceSchema>;

const baseEntityFields = {
  id: z.string(),
  type: entityTypeSchema,
  systemId: z.string().nullable(),
  name: z.string(),
  parentId: z.string().nullable(),
  lane: sourceLaneSchema,
  importance: importanceSchema,
  summary: z.string(),
};

export const spanEntitySchema = z.object({
  ...baseEntityFields,
  startYear: z.number(),
  endYear: z.number(),
  year: z.null(),
  isPoint: z.literal(false),
  duration: z.number(),
});
export type SourceSpanEntity = z.infer<typeof spanEntitySchema>;

export const pointEntitySchema = z.object({
  ...baseEntityFields,
  startYear: z.null(),
  endYear: z.null(),
  year: z.number(),
  isPoint: z.literal(true),
  duration: z.literal(0),
});
export type SourcePointEntity = z.infer<typeof pointEntitySchema>;

export const anyEntitySchema = z.union([spanEntitySchema, pointEntitySchema]);
export type SourceEntity = z.infer<typeof anyEntitySchema>;

export const rawDatasetSchema = z.object({
  systems: z.array(spanEntitySchema),
  regimes: z.array(spanEntitySchema),
  events: z.array(pointEntitySchema),
  figures: z.array(pointEntitySchema),
  culturalAnchors: z.array(pointEntitySchema),
  culturalWorks: z.array(pointEntitySchema),
  innovations: z.array(pointEntitySchema),
  globalContext: z.array(pointEntitySchema),
  all: z.array(anyEntitySchema),
  meta: z.object({
    sourceWorkbook: z.string(),
    recordCount: z.number(),
    errorCount: z.number(),
    version: z.number().optional(),
  }),
});
export type RawDataset = z.infer<typeof rawDatasetSchema>;

// ---------- Normalized shape (used by the renderer) ----------

export type RenderLane =
  | 'main' | 'above' | 'above2' | 'below' | 'below2'
  | 'event' | 'figure' | 'anchor' | 'global';

export interface NormalizedSpanItem {
  id: string;
  type: EntityType;
  name: string;
  start: number;
  end: number;
  duration: number;
  importance: Importance;
  systemId: string | null;
  parentId: string | null;
  sourceLane: SourceLane;
  renderLane: RenderLane;
  summary: string;
}

export interface NormalizedPointItem {
  id: string;
  type: EntityType;
  name: string;
  year: number;
  importance: Importance;
  systemId: string | null;
  parentId: string | null;
  renderLane: RenderLane;
  summary: string;
}

export interface NormalizedSystem {
  id: string;
  systemId: string;
  name: string;
  start: number;
  end: number;
  summary: string;
}

export interface SearchEntry {
  id: string;
  type: EntityType;
  name: string;
  summary: string;
  year: number | null;
  startYear: number | null;
  endYear: number | null;
}

export interface NormalizedData {
  primary: NormalizedSpanItem[];        // main lane regimes
  concurrent: NormalizedSpanItem[];     // north / west / south regimes
  systems: NormalizedSystem[];          // era bands
  events: NormalizedPointItem[];
  figures: NormalizedPointItem[];
  culture: NormalizedPointItem[];       // cultural anchors
  inventions: NormalizedPointItem[];
  global: NormalizedPointItem[];
  childrenByParent: Map<string, NormalizedPointItem[]>;
  searchIndex: SearchEntry[];
}

export interface SelectedItem {
  kind: 'dynasty' | 'concurrent' | 'event' | 'figure' | 'culture' | 'invention' | 'global' | 'era';
  id: string;
  title: string;
  year: number | null;
  start: number | null;
  end: number | null;
  summary: string;
  importance?: Importance;
  duration?: number;
  systemId?: string | null;
  parentId?: string | null;
}

export interface LayerToggles {
  dynasties: boolean;
  events: boolean;
  figures: boolean;
  culture: boolean;
  inventions: boolean;
  global: boolean;
  sources: boolean;
}

export const defaultLayers: LayerToggles = {
  dynasties: true,
  events: true,
  figures: true,
  culture: true,
  inventions: true,
  global: true,
  sources: true,
};
