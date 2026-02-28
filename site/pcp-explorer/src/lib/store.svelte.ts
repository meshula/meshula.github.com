export interface OutlineEntry {
  depth: number;
  text: string;
  id: string;
}

export const outline = $state<OutlineEntry[]>([]);

export interface FocusState {
  nodeId: string | null;
  paperAnchor: string | null;
  codeRange: { start: number; end: number } | null;
}

export const focus = $state<FocusState>({
  nodeId: null,
  paperAnchor: null,
  codeRange: null,
});

export interface PanelState {
  outlineCollapsed: boolean;
  flowCollapsed: boolean;
  codeCollapsed: boolean;
}

export const panels = $state<PanelState>({
  outlineCollapsed: false,
  flowCollapsed: false,
  codeCollapsed: false,
});
