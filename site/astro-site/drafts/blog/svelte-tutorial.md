# Building a force directed graph web app

## Prerequisites

- node.js
- npm

## Setup

This project will use SvelteKit. To get started, go into the directory you want to create the project in.

```sh
npm create svelte@latest force-directed-graph
```

You'll be prompted with a few options. For this tutorial, we recommend the following configuration:

- Which Svelte app template?
    - Select the Skeleton framework
- Add type checking with TypeScript?
    - Select Yes, using TypeScript syntax.
- Add Prettier for code formatting? 
    - Select Yes.
- Add ESLint for linting? 
    - Select Yes.
- Add Playwright for testing? 
    - Select No (we can skip this for now).

Once the project is created, navigate into it and install the base dependencies:

```sh
cd force-directed-graph
npm install
```

Next, install @xyflow/svelte, the library that provides the canvas, nodes, edges, and interaction primitives we need.

> Note: You might see older tutorials referencing `svelte-flow`. The library has been migrated to the `@xyflow` organization. `@xyflow/svelte` is the current, actively maintained package.

```sh
npm install @xyflow/svelte
```

## Understanding the Toolchain

Before writing code, let's briefly understand how these tools work together:

- *Svelte*: The UI framework we're using. It compiles our components into efficient vanilla JS, making animations and interactions buttery smooth.
- *Svelte-Flow*: (`@xyflow/svelte`): A headless-ish UI library specifically designed for node-based editors.
    - It provides the Flow component, which acts as the infinite canvas with built-in zoom, pan, and viewport management.
    - It handles Nodes (the items on the graph) and Edges (the connections between them).
    - It exposes a reactive store system, allowing Svelte to efficiently update the graph when data changes.

Svelte-Flow handles the rendering and interaction. For a force-directed graph, we'll need a physics engine to calculate node positions, which we'll feed into Svelte-Flow. We'll cover this integration in the next part.

## Creating the App.

Let's create a simple app that displays a single node with the text "Hello!" centered on the canvas.

Open `src/routes/+page.svelte` and replace its contents with the following code:

```js
<script lang="ts">
  import { Flow } from '@xyflow/svelte';
  import type { Node } from '@xyflow/svelte';

  // Define our initial node
  // Svelte-Flow nodes require an id, position, and data.
  const initialNodes: Node[] = [
    {
      id: 'hello-node',
      type: 'default',
      position: { x: 0, y: 0 },
      data: { label: 'Hello!' }
    }
  ];
</script>

<!-- 
  The Flow component provides the canvas.
  - nodes: Binds our node data.
  - fitView: Automatically centers and zooms the viewport to fit all nodes.
  - style: Ensures the canvas takes up the full viewport height.
-->
<Flow 
  nodes={initialNodes} 
  fitView 
  style="height: 100vh;" 
/>
```

### Notes:

**CSS Imports**: Depending on your SvelteKit setup, you might need to ensure Svelte-Flow styles are loaded. If the node looks unstyled, you may need to add import '@xyflow/svelte/dist/style.css'; to your `src/app.html` or a global CSS file. The code above assumes the default Svelte-Flow styling works out of the box, which is standard in recent versions.

**TypeScript**: The code block above includes lang="ts" and type definitions. This is a best practice and helps avoid common type errors with Node and Edge interfaces.

**FitView**: Using fitView ensures the "Hello!" is always centered regardless of window size.

## Run the app

Start the development server:

```sh
npm run dev
```

Open your browser to [http://localhost:5173]. You should see a clean, infinite canvas with a single node in the center displaying `Hello!`.

You can:

- Drag the node around.
- Scroll to zoom in and out.
- Click and drag the background to pan the canvas.


