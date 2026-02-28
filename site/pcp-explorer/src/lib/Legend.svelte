<script lang="ts">
  const phases = [
    { key: 'entry',      color: '#4a90d9', label: 'Entry / Public API' },
    { key: 'bootstrap',  color: '#5c6bc0', label: 'Bootstrap & Ancestor Clone' },
    { key: 'relocation', color: '#e67e22', label: 'Relocation (tasks 1–2)' },
    { key: 'arc',        color: '#27ae60', label: 'Arc Expansion (tasks 3–8)' },
    { key: 'variant',    color: '#8e44ad', label: 'Variant / Payload Selection (tasks 9–18)' },
    { key: 'resolution', color: '#16a085', label: 'Finalization & Value Resolution' },
    { key: 'output',     color: '#2c3e50', label: 'Output (PcpPrimIndex)' },
  ];
</script>

<div class="legend">
  <h3>Phase Legend</h3>
  <ul>
    {#each phases as p}
      <li>
        <span class="dot" style="background:{p.color}"></span>
        <span class="phase-label">{p.label}</span>
      </li>
    {/each}
  </ul>
  <p class="tip">Click any node to expand source links &amp; description.</p>
  <p class="tip">Animated edge = phase boundary.</p>
</div>

<style>
  .legend {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(24, 24, 37, 0.92);
    border: 1px solid #313244;
    border-radius: 8px;
    padding: 12px 16px;
    color: #cdd6f4;
    font-family: system-ui, sans-serif;
    font-size: 12px;
    z-index: 10;
    min-width: 270px;
    backdrop-filter: blur(4px);
  }

  h3 {
    margin: 0 0 10px;
    font-size: 13px;
    font-weight: 700;
    color: #89dceb;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .phase-label {
    color: #bac2de;
  }

  .tip {
    margin: 4px 0 0;
    font-size: 10px;
    color: #6c7086;
  }
</style>
