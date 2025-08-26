---
title: "LIVERPS & Scene Composition"
description: "A tutorial introduction to OpenUSD's composition arcs and scene composition"
pubDate: 2025-08-26
category: "application"
triadic_domain: "memory"
mathematical_content: false
tags: ["USD", "OpenUSD", "LIVERPS"]
author: "Nick Porcino"
draft: false
---

This article provides an introduction to understanding USD's scene construction and composition by examining the **LIVERPS** arcs and the stage composition algorithm.

## LIVERPS Introduction

The **LIVERPS** mnemonic orders the USD compositional arcs in order of strength from strongest to weakest (with the exception of relocates as will be shown later). The **LIVERPS** arcs may be grouped into four functional categories that work together to build composed stages. In the following explanations, the term "opinion" is often used. An opinion is just a piece of authored data about a prim or property, whether it comes from a layer, a reference, or an override.

### 1. **Local Foundation**
- **L** (Local): directly authored opinions in the current layer

### 2. **Content Accumulation**
- **I** (Inherits): Propagate opinions from base prims, using automatic upstream layer stack propagation
- **R** (References): Bring in an external layer stack and add its opinions beneath the referencing prim in the composed stage (e.g. referencing /B/C at /A results in /A/B/C)
- **P** (Payloads): Work like references, but their content is only loaded when requested. They keep scenes lighter by deferring heavy assets until needed.

### 3. **Content Modification**:
- **E** (Relocates): Map opinions from source paths to new paths using namespace remapping. Note that relocates transform the namespace topology effectively behaving as a preprocessing step before other arcs.
- **V** (Variants): Apply conditional selection among authored alternatives using deferred evaluation

### 4. **Global Hierarchy**
- **S** (Specializes): Create globally weak (base) opinions that can be overriden by all other composition arc opinions

The composition algorithm proceeds according to the **LIVERPS** strength ordering, with local opinions providing the strongest foundation. **Inherits** operate early in the process, propagating base prim opinions into derived prims. **Variants** require deferred evaluation—they are resolved only after all other composition arcs so they can make selections based on the fully composed opinion set. **Relocates** are applied as structural preprocessing, transforming namespace topology before opinion composition. **References** and **Payloads** gather external layer stacks and with payloads optionally unloaded for scalability. **Specializes** establish globally weak opinion relationships where all specialized opinions are subordinate to their specializing counterparts. The LIVERPS strength ordering thus ensures predictable resolution of conflicting opinions throughout the resolution process.

---

## Local Foundation

**Local** — the **L** in **LIVERPS** — refers to "local" opinions from the current layer stack, which are stronger than all "remote" opinions introduced via composition arcs authored in that layer stack.

**Layer Stacks** establish the foundational substrate for all composition. Every layer stack begins with a "root layer" as the strongest layer. Layer stacks form ordered lists where earlier layers are stronger and later layers are weaker, creating the fundamental strength ordering system that governs how all other arcs resolve their contributions.

**Sublayers** extend the layer mechanism by allowing one layer to include other layers in its `subLayers` field. These sublayers are added in strong-to-weak order, where the first sublayer listed is strongest and the last sublayer is weakest. Each sublayer becomes weaker than the layer that included it, but stronger than any weaker sibling sublayers. Sublayers enable modular authoring workflows where complex stages are built from multiple files — a "shot" layer might sublayer separate files for lighting, animation, and modeling, allowing different departments to contribute opinions while maintaining predictable override behavior.

**Sublayer Composition Safeguards**: The composition algorithm includes error handling for malformed sublayers (which are ignored) and cycle detection (preventing infinite sublayer inclusion loops). Each sublayer may have associated time offsets that apply numerical scaling to all time values in that sublayer and its descendants.

Unlike composition arcs that operate at the prim level and create "remote" opinions, sublayers operate at the layer composition level, flattening additional authored content directly into the existing layer stack namespace to create "local" opinions with predictable strength relationships.

---


## Content Accumulation

### Inherits

**Inherits** — the **I** in **LIVERPS** — establish persistent relationships between "derived" prims and "base" prims, creating base/derived relationships similar to inheritance patterns in programming. Unlike references which bring in external layer stacks and assets, inherits work within the same layer stack to provide semantic layering by propagating opinions from base prims to derived prims.

Inherits enable mass editing by propagating reusable composed opinions from base prims to all derived prims. Multiple inherits can be stacked, allowing you to build "classes" of prims (e.g., a default Prop definition) and specialize them in many places. The derived prim receives all of the overrides applied to the base prim anywhere in the composition. This makes inherits ideal for establishing shared attributes and conventions across multiple prims within the same layer stack.

Use references and payloads for cross-asset structural composition (bringing in geometry and full subtrees from external files), and inherits for semantic layering within your existing layer stack structure. For example, define "all props should have collision geometry enabled" through inherits on base class prims, while the actual prop geometry comes through references from external asset files.

```usda
// Simple example:
class Prop {
    bool enableCollision = true  // Base prim opinion
}

over "MyChair" (
    inherits = </Prop>       // Inherits collision setting
    references = @chair.usd@ // References geometry
)
```

Note that inherit arcs introduce opinions during composition and therefore inherit arcs within the same layer can require individual recomputation of composed opinions even when pulling from the same base prim. Accordingly, for efficiency, it's good practice that inherit arcs pull from other layers.

### References

**References** — the **R** in LIVERPS — are a key mechanism for bringing external content into a stage. A reference introduces a complete prim hierarchy from another layer or asset, creating a new subtree in the namespace while preserving the source hierarchy.

References can target entire layers or specific prims within a layer, making them versatile for assembling complex scenes. A single prop, environment section, or character can be referenced multiple times at different points in the stage. Each reference is processed individually, with the composition algorithm executed separately for each reference.

References are **unconditional**: once authored, they always participate in stage composition. This makes references essential for scene construction workflows where external assets must be integrated into the composed stage.

```usda
def Xform "World" {
    def Scope "Props" {
        def Xform "Chair" (
            references = @chairAsset.usd@
        )
    }
}
```

### Payloads

**Payloads** — the **P** in LIVERPS — are primarily a **scalability mechanism** for managing heavy or bulk data that doesn't always need to participate in composition. Unlike other composition arcs that are always active, payloads enable **on-demand loading** of content like dense geometry, simulation caches, or texture atlases.

Payloads provide **conditional content accumulation**. While references always bring in their target content, payloads maintain structural presence in the namespace but can selectively load or unload their opinion contributions based on workflow needs. This makes them ideal for scenarios where you need the option to work with lightweight proxies during editing but access full-resolution data for final rendering.

```usda
def Xform "World" {
    def Xform "Environment" (
        payload = @heavyForestAsset.usd@
    )
}
```

Payloads support scalable production pipelines where different stages require different levels of detail. Animators might work with unloaded payloads (seeing only proxy geometry), while lighting artists load the full payload data for accurate rendering.

---

## Content Modification

### Relocates

**Relocates** — the **E** in LIVERPS — enable non-destructive namespace transformation of prims from remote layer stacks. Unlike other composition arcs that merge opinions for existing prims, relocates map prim paths from composition sources to new locations in the local namespace, allowing reparenting and renaming without modifying the original scene description.

Relocates address situations where direct editing would be destructive — affecting all other contexts that reference the same assets. By specifying path mappings in layer metadata (`relocates = { </source/path> : </target/path> }`), you can reorganize referenced content while preserving the source assets unchanged.

During composition, relocates integrate with the LIVERPS strength ordering by providing additional namespace mappings that compose with other arcs' standard mappings. When a prim matches a relocates target path, USD composes opinions from the mapped source path, removes ancestral opinions (except variant arcs), and applies the namespace transformation to all descendant prims and their relationships.

Relocates perform **namespace remapping** rather than opinion accumulation. They transform "where things are" rather than "what things contain," enabling flexible asset organization patterns while maintaining composition arc semantics within the transformed namespace structure.

### VariantSets

**VariantSets** — the **V** in LIVERPS — enable conditional selection among alternate authored opinions within a prim. Unlike references or payloads that introduce external content, variants switch between different versions of content already authored within the same prim.

Variants function as conditional branches in the composition process. When a variant set contains multiple options (e.g., "summer" and "winter" versions of a tree), the composition engine selects one branch based on the current variant selection, then proceeds as if only that branch had been authored.

Variants operate entirely on pre-authored content — all variant options must be written into the layer beforehand. This makes them ideal for authored alternatives like different materials, LOD levels, or seasonal variations of the same asset.

Variant evaluation is deferred until after all other composition arcs have been processed. This ensures that all sources of opinions are available when computing which variant should be selected, allowing the variant selection itself to be influenced by the complete composed opinion set.

Variant branches can themselves contain other composition arcs. References, payloads, or sublayers authored within a variant branch only take effect when that variant is selected, while arcs outside the variant set apply unconditionally to whichever branch gets chosen.

```usda
def Xform "Tree" {
    variantSet "Season" = {
        "Summer" {
            def Sphere "Leaves" { float size = 1.0 }
        }
        "Winter" {
            def Sphere "Leaves" { float size = 0.2 }
        }
    }
}
```

---

## Global Hierarchy

### Specializes

**Specializes** — the **S** in LIVERPS — provide a mechanism for establishing base class relationships, similar to class inheritance in object-oriented programming. Specializes create "is-a" relationships where a prim can specialize another prim, inheriting its base characteristics.

Specializes arcs are weaker than inherits arcs in the composition strength ordering, meaning inherited opinions will override specialized ones when they conflict. This creates a clear hierarchy: specializes establish foundational base classes, while inherits provide more targeted opinion injection that can override those base definitions.

Specializes are particularly useful for creating foundational class hierarchies. For example, you might have a base "Vehicle" class that defines common attributes, and specific vehicle prims specialize from this base. Then, inherits can be used to apply more specific overrides or modifications to individual vehicles while maintaining the specialized base relationship.

The strength relationship **Inherits** > **Specializes** ensures that more targeted inherited opinions take precedence over general specialized base classes, providing a predictable override mechanism where specific modifications can fine-tune general base definitions.

---

## LIVERPS Composition Strength Ordering

USD's composition system resolves opinion conflicts through the **LIVERPS** strength ordering, where each composition arc type has a specific position in the hierarchy:

### **The LIVERPS Hierarchy (Strongest to Weakest):**

1. **Local** — Opinions authored directly in the current layer stack
2. **Inherits** — Class inheritance relationships, adding targeted opinion injection
3. **Variants** — Conditional selection among pre-authored alternatives (deferred evaluation)
4. **rElocates** — Namespace topology transformation (structural preprocessing, not strength-ranked in the same sense as other arcs)
5. **References** — External content inclusion through asset composition
6. **Payloads** — Conditionally loaded external content for memory management
7. **Specializes** — Base class relationships with globally weak opinions

### **Key Strength Relationships:**

- **Local > All Arcs:** Direct authoring always wins over composed content
- **Inherits > Specializes:** Targeted inheritance overrides foundational base classes, enabling specific modifications to fine-tune general base definitions
- **Variants > External Content:** Variant selections can meaningfully modify content brought in by references and payloads
- **Preprocessing Sequence:** Relocates transform the namespace topology before other arcs operate on the transformed space

### **Special Behaviors:**

- **Specializes Global Weakness:** If prim A specializes prim B, then ALL opinions for prim A are stronger than ALL opinions for prim B, creating true hierarchical inheritance
- **Variant Deferred Evaluation:** Variants are processed after all other arcs to ensure complete opinion availability for selection computation
- **Relocates Structural Preprocessing:** Applied once per layer stack, transforming addressing space before opinion composition begins

This strength ordering ensures predictable composition behavior where local authoring takes precedence, inheritance relationships work intuitively, and structural transformations occur at the appropriate processing stage.

---

## Conclusion

LIVERPS is a framework for predicting opinion strength, understanding evaluation order, and debugging complex stage assemblies. This introduction to LIVERPS and USD's composition engine provides a conceptual foundation to build upon in the exploration of compositional topics, performance optimization, and real-world production patterns.
