---
title: "Measuring Light: A Comprehensive Guide to Photometry and Radiometry"
description: "A technical exploration of radiometric and photometric units, covering the physical measurement of light energy and human perception of illumination"
pubDate: 2025-07-20
category: "application"
triadic_domain: "memory"
mathematical_content: true
tags: ["optics", "radiometry", "photometry", "physics", "light measurement", "computer graphics", "illumination", "electromagnetic spectrum"]
author: "Nick Porcino"
draft: false
---

# Measuring Light

Light is measured in two ways. Radiometry measures the energy impinging on a sensor, and photometry attempts to qualitatively measure light to represent how a human observer experiences light. Radiometry is important when physical metrics must be preserved, such as in simulation tasks, and photometry is important in subjective tasks, such as selecting lights to illuminate a street.
___

# Radiometric Units

Radiometric units measure the physical properties of light, independent of human perception. These units are based on the total energy or power of light across all wavelengths.

To better understand how these radiometric units are related, imagine a conceptual "cube" where each axis represents a dimension of measurement integration:

- **Area ($A$)**: Represents the surface over which the radiation is measured or emitted.

- **Solid Angle ($\Omega$)**: Represents the directionality of the radiation, capturing how energy is distributed across different directions.

- **Wavelength ($\lambda$)**: Represents the specific portion of the electromagnetic spectrum being considered.

In this model, each corner of the cube corresponds to a specific radiometric quantity. The position of a corner within the cube reflects whether and how the measurement integrates over these three dimensions:

- If a quantity is not integrated over an axis, it remains "differential" with respect to that dimension (e.g., **Spectral Irradiance** remains differential with respect to wavelength).
- As we integrate over one or more axes, the quantity becomes broader in scope (e.g., integrating over wavelength converts **Spectral Radiant Exitance** to **Radiant Exitance**).

While each corner of the cube represents a unique combination of these integrations, some quantities may share the same units because they measure energy in similar ways but under different conditions (e.g., incoming vs. outgoing radiation).

The following sections will explore each of these radiometric quantities in detail, with reference to their corresponding position within the cube. To help track these relationships, we'll assign a binary code to each corner, where each bit represents the integration over one of the cube's axes.

| Code | $\int\int\int$ | Radiometric Quantity           | Unit |
|-------------|---------------------------|---------------------------------|---|
| 000 | --- | **Spectral Radiance** | $\frac{W}{sr·m²·nm}$ |
| 001 | -- $\lambda$ | **Radiance** | $\frac{W}{sr·m²}$ |
| 010 | - $\Omega$ - | **Spectral Irradiance** | $\frac{W}{m²·nm}$ |
| 010 | - $\Omega$ - | **Spectral Radiant Exitance** | $\frac{W}{m²·nm}$ |
| 011 | - $\Omega\lambda$ | **Irradiance** | $\frac{W}{m²}$ |
| 011 | - $\Omega\lambda$ | **Radiant Exitance** | $\frac{W}{m²}$ |
| 100 | $A$ -- | **Spectral Radiant Intensity**  | $\frac{W}{sr·nm}$ |
| 101 | $A$ - $\lambda$ | **Radiant Intensity** | $\frac{W}{sr}$ |
| 110 | $A\Omega$ - | **Spectral Radiant Flux** | $\frac{W}{nm}$ |
| 111 | $A\lambda\Omega$ | **Radiant Flux** | $W$ |

In the equations that follow, these terms frequently appear:

$E_\lambda$ is the spectral radiant exitance,
$d\Phi_\lambda(\lambda)$ represents the differential radiant flux at a specific wavelength,
$dA$ is the differential area of the emitting surface.
$d\lambda$ is the differential wavelength

## 000 Spectral Radiance 
Symbol: $L_\lambda$
 
### Unit: Watt per steradian per square meter per nanometer $(\frac{W}{sr·m²·nm})$

Spectral Radiance measures the power emitted by a surface in a specific direction, per unit area, per unit solid angle, and per unit wavelength. It is a differential quantity with respect to wavelength, describing how radiance varies across the spectrum at a particular wavelength.

$$
L_\lambda = \Phi_\lambda
$$

## 001 Radiance 

Symbol: $L$


### Unit: Watt per steradian per square meter $(\frac{W}{sr·m²})$

Radiance integrates spectral radiance over wavelength ($\lambda). It measures the amount of power emitted by a surface in a specific direction, per unit area and per unit solid angle.

There is no direct perceptual counterpart, though it can be related to brightness when filtered by human sensitivity curves.

Radiance can be obtained from Spectral Radiance by integrating over the portion of the spectrum of interest:

$$
L = \int L_\lambda d\lambda
$$

## 010 Spectral Irradiance 

Symbol: $E_\lambda$

### Unit: Watt per square meter per nanometer $(\frac{W}{m²·nm})$
 
Measures the power of electromagnetic radiation incident on a surface at a specific wavelength per unit area; in other words it is a differential quantity dependent on area and wavelength.

$$
E_\lambda = \int L_\lambda dA
$$


## 010 Spectral Radiant Exitance 

Symbol: $E_\lambda$

### Unit: Watt per square meter per nanometer $(\frac{W}{m²·nm})$

Measures the power of electromagnetic radiation emitted by a surface per unit area at a specific wavelength. This quantity provides a detailed understanding of how the energy is distributed across the spectrum at a particular surface.

Spectral Radiant Exitance is a differential quantity, meaning it describes the rate of radiant flux emitted per unit area at a specific wavelength. It is especially useful in applications where the spectral distribution of the emitted radiation is important, such as in spectroscopy or surface emissivity studies.

$$
E_\lambda = \int L_\lambda d\Omega
$$

## 011 Irradiance 

Symbol: $E$

### Unit: Watt per square meter $(\frac{W}{m²})$

Measures the power of incoming electromagnetic radiation incident on a surface per unit area. It describes how much energy from a light source arrives at a surface, independent of direction.

$$
E = \int \int E_\lambda(\lambda) d\Omega d\lambda
$$

It can be related to photometric quantities like illuminance through the human sensitivity curve.


## 011 Radiant Exitance 

Symbol: $E$

### Unit: Watt per square meter $(\frac{W}{m²})$

Measures the total outgoing power of electromagnetic radiation emitted by a surface per unit area, integrated over all wavelengths. This quantity is useful in determining the overall energy output of a surface, regardless of the specific distribution of that energy across the spectrum.

Radiant Exitance is obtained by integrating the Spectral Radiant Exitance over the entire wavelength range of interest:

$$
E = \int \int E_\lambda(\lambda) d\Omega d\lambda
$$


## 100 Spectral Radiant Intensity 

Symbol: $I_\lambda$

### Unit: Watt per steradian per nanometer $(\frac{W}{sr·nm})$
 
Measures the power emitted by a source in a specific direction at a particular wavelength per unit solid angle. Radiant Intensity is a differential quantity with respect to solid angle.

$$
I_\lambda = \int L_\lambda dA
$$

## 101 Radiant Intensity

Symbol: $I$

### Unit: Watt per steradian $(\frac{W}{sr})$

Measures the power emitted by a source in a specific direction per unit solid angle. This unit quantifies how much energy is radiated in a particular direction, making it useful for understanding directional emission patterns.

$$
I_\lambda = \int \int L_\lambda dA d\lambda
$$

## 110 Spectral Radiant Flux 

Symbol: $Φ_\lambda$
 
### Unit: Watt per nanometer $(\frac{W}{nm})$
 
**Spectral Radiant Flux** measures the power of electromagnetic radiation at a specific wavelength. It is a differential quantity with respect to wavelength and provides detailed information about how the power is distributed across the spectrum.

Radiant Flux can be obtained by integrating Spectral Radiant Flux over the entire wavelength range:

$$
\Phi_\lambda = \int \int L_\lambda dA d\Omega
$$



## 111 Radiant Flux

Symbol: $Φ$

### Unit: Watt ($W$)

**Radiant Flux** is the total power of electromagnetic radiation emitted, transferred, or received by a source. Unlike the other radiometric quantities discussed in this tutorial, Radiant Flux represents the total energy without considering the distribution over area, direction, or wavelength.

Radiant Flux serves as a foundational quantity in radiometry, from which other more specific quantities are derived. These derived quantities break down Radiant Flux by considering how power is distributed across different dimensions like area, solid angle, and wavelength.

$$
\Phi = \int \int \int L_\lambda dA d\Omega d\lambda
$$

___

# Photometric Units

Photometric units measure light with consideration to how it is perceived by the human eye. The eye responds differently to different wavelengths, with a greater sensitivity to certain parts of the spectrum, like green, than to others, like blue or red. As such, photometric measurements are tailored to vision, rather than representing a light's total energy.

Photometric units are commonly employed in design tasks because they are easily accessible to artists and other practitioners.

Metamerism refers to the phenomenon is color perception where different spectral distributions of light can appear identical to the eye. As an example this characteristic enables color display on a monitor with limited spectral output. This concept highlights how a description of a light, such as 900 lumen, 6500K, does not really provide the information necessary to deduce radiometric values.


## Luminous Flux 

Symbol: $Φ_v$

### Unit: Lumen $(lm)$

Measures the perceived power of light. It's the radiometric radiant flux weighted by theluminosity function, which reflects the sensitivity of the human eye to different wavelengths.

Mapped from radiant flux using the luminosity function, which accounts for human eyesensitivity. It suffers from metamerism, where different spectral compositions can appear the same to the human eye.

## Luminous Intensity

Symbol: $I_v$

### Unit: Candela $(cd)$

Measures the perceived power emitted by a source in a specific direction, adjusted for human visual sensitivity.

Mapping: Derived from radiant intensity via the luminosity function. It also experiences metamerism.

## Luminance

Symbol: $L_v$

### Unit: Candela per square meter $(\frac{cd}{m²})$

Measures the perceived brightness of a surface, considering the area and direction.

Candelas quantify the intensity of light in aspecific direction, while nits measure the perceived brightness of surfaces or displays.

Mapping: Related to radiance by the luminosity function. It reflects the perceived brightness of asource, not its physical energy.

## Illuminance

Symbol: $E_v$

### Unit: Lux $(lx)$

Measures the perceived power incident on a surface, analogous to irradiance but adjusted for human vision.

Mapping: Derived from irradiance by weighting the power with the luminosity function. It is also subject to metamerism.


# Standard Observers and Conditions in Photometry

Photometry relies on standardized conditions to ensure consistency and comparability of measurements.  The human visual system is complex and varies under different lighting conditions, specifically:

- photopic: well lit daylight conditions,
- scotopic: low light conditions
- mesopic: intermediate lighting conditions
 
## The CIE Standard Observers

The International Commission on Illumination (CIE) has defined **standard observers** to model the average human visual response.

### CIE 1931 2° Standard Observer

Represents the average human response to light within a 2° field of view, primarily for photopic vision; typically brighter than 3 cd/m²; in other words, daylight vision. The corresponding luminosity function, $V(\lambda)$, peaks at 555 nm, respresenting sensitivity to green light in bright conditions. Lumens, lux, and candelas are based on this observer.

### CIE 1951 Scotopic Luminosity Function

For scotopic (low light) conditions, typically below 0.01 cd/m², this function, $V'(\lambda)$ is used, shifting sensitivity to 507nm, corresponding to blue-green light.

### CIE 2001 Mespoic Vision Model

This model covers vision in conditions from 0.01 to 3 cd/m² - conditions that are neither as bright as daylight, nor as dark as night. The model provides a way to blend photopic and scotopic functions based on light levels.

## Adapting to Different Lighting Conditions

Photometric measurements must account for different lighting conditions. The standard photometric observer is typically based on photopic vision, as this is the condition most relevant for everyday activities. However, under low-light (scotopic) or intermediate (mesopic) conditions, the human eye’s sensitivity shifts, and different luminosity functions, such as the scotopic luminosity function $V'(\lambda)$, are used.

## Ensuring Consistent Measurements

To ensure that photometric measurements are meaningful and comparable, instruments like light meters are calibrated against the standard observer's response. These instruments often integrate the measured light with the photopic luminosity function to provide readings in units like lumens or lux, which are weighted according to human perception.

By standardizing the observer and conditions, the CIE and other standards bodies provide a framework that enables consistent and reliable photometric measurements, ensuring that different observers and instruments can produce comparable results.

Despite the existence of such frameworks, in practice, it is difficult to translate between photometric and radiometric units, and inconsistencies often exist between similar measurements by different groups or companies, and even within the same company.

___

# Summary

Radiometric Units measure total energy and are independent of perception.

Photometric Units are derived from radiometric units by applying the human eye’s sensitivity, but the transformation from photometric units to radiometric units is not strictly possible without more information than the photometric measurements alone provide. Practical approximations can be derived, but they yield plausible, not true reconstructions.

The variability of the application of photometric standards between organizations, and even within a single organization leads us to conclude that although it is necessary to consider methods of using photometric data if none else is available, it is recommended instead that radiometric data be obtained first hand, and used directly in simulation if at all possible.

---

# Part Two: A Geometric Algebra Formalization of the Radiometric Measurement Cube

---

## 1. Introduction

In Part One, we introduced the radiometric measurement cube: a conceptual framework capturing light measurement quantities as integrals over three axes — **Area (A)**, **Solid Angle (Ω)**, and **Wavelength (λ)**.

In this section, we provide a **geometric algebra (GA)** formalization of this cube, revealing a natural correspondence between radiometric quantities and multivector grades. This algebraic viewpoint clarifies the structure of radiometric units and enables elegant representations of their interrelations and transformations.

---

## 2. Measurement Cube Axes as Multivector Blades

We assign each axis of the measurement cube a corresponding **geometric algebra blade**:

| Measurement Axis | Symbol    | GA Blade Representation                     | Grade           |
| ---------------- | --------- | ------------------------------------------- | --------------- |
| Area             | $A$       | Bivector $\mathbf{A} = e_1 \wedge e_2$      | 2 (bivector)    |
| Solid Angle      | $\Omega$  | Bivector $\mathbf{\Omega} = e_3 \wedge e_4$ | 2 (bivector)    |
| Wavelength       | $\lambda$ | Vector $e_\lambda$ or scalar parameter      | 1 (vector) or 0 |

* The **area** blade $\mathbf{A}$ represents oriented surface elements.
* The **solid angle** blade $\mathbf{\Omega}$ represents oriented patches on the unit sphere, encoding directional dependence.
* The **wavelength** $\lambda$ is treated as either a scalar parameter or an additional basis vector $e_\lambda$.

---

## 3. Spectral Radiance as a Multivector Field

Define **spectral radiance** $L_\lambda$ as a function over position $x$, direction $\hat{n}$, and wavelength $\lambda$, naturally associated with the 4-blade:

$$
L_\lambda(x, \hat{n}, \lambda) \quad \leftrightarrow \quad L_\lambda = f(x, \hat{n}, \lambda) \, \mathbf{A} \wedge \mathbf{\Omega} \wedge e_\lambda
$$

* Here $L_\lambda$ is a **grade-5 multivector** if $e_\lambda$ is a vector.
* If $\lambda$ is treated as a scalar parameter, $L_\lambda$ is a **grade-4 multivector** (area and solid angle blades) parameterized over $\lambda$.

---

## 4. Integration as Grade Reduction via Contraction

Radiometric quantities arise from integration over subsets of the cube's axes. In GA, integration corresponds to **contraction** (also called the left interior product) with the corresponding blades, which reduces the grade of the multivector.

Define the **grade reduction operators**:

* **Integrate over Area $A$:**

$$
\mathcal{I}_A(L) = L \lrcorner \mathbf{A}
$$

* **Integrate over Solid Angle $\Omega$:**

$$
\mathcal{I}_\Omega(L) = L \lrcorner \mathbf{\Omega}
$$

* **Integrate over Wavelength $\lambda$:**

$$
\mathcal{I}_\lambda(L) = \int L \, d\lambda
$$

where the last is an integral over the scalar spectral parameter.

---

## 5. Radiometric Quantities as Grade-Reduced Multivectors

The full set of radiometric quantities corresponds to sequential grade reductions indicated by the binary cube code $(A, \Omega, \lambda)$, where bit 0 = differential (no integration), bit 1 = integration:

| Code | GA Expression                                                                 | Radiometric Quantity       | Grade after Integration                       |
| ---- | ----------------------------------------------------------------------------- | -------------------------- | --------------------------------------------- |
| 000  | $L_\lambda$                                                                   | Spectral Radiance          | Grade 4 (area ∧ solid angle + spectral param) |
| 001  | $\mathcal{I}_\lambda(L_\lambda)$                                              | Radiance                   | Grade 4 (area ∧ solid angle)                  |
| 010  | $\mathcal{I}_\Omega(L_\lambda)$                                               | Spectral Irradiance        | Grade 2 (area + spectral param)               |
| 011  | $\mathcal{I}_\Omega \circ \mathcal{I}_\lambda(L_\lambda)$                     | Irradiance                 | Grade 2 (area)                                |
| 100  | $\mathcal{I}_A(L_\lambda)$                                                    | Spectral Radiant Intensity | Grade 2 (solid angle + spectral param)        |
| 101  | $\mathcal{I}_A \circ \mathcal{I}_\lambda(L_\lambda)$                          | Radiant Intensity          | Grade 2 (solid angle)                         |
| 110  | $\mathcal{I}_A \circ \mathcal{I}_\Omega(L_\lambda)$                           | Spectral Radiant Flux      | Grade 0 (scalar + spectral param)             |
| 111  | $\mathcal{I}_A \circ \mathcal{I}_\Omega \circ \mathcal{I}_\lambda(L_\lambda)$ | Radiant Flux               | Grade 0 (scalar)                              |

---

## 6. Photometric Weighting as a Spectral Metric

Photometric quantities are weighted integrals of radiometric quantities using the **luminosity function** $V(\lambda)$, modeling human visual sensitivity:

$$
L_v = \int L_\lambda(\lambda) V(\lambda) \, d\lambda
$$

From the GA perspective, this is a **weighted inner product** or metric over the spectral axis:

$$
\mathcal{W}(L_\lambda) = \langle L_\lambda, g \rangle_\lambda = \int L_\lambda(\lambda) V(\lambda) \, d\lambda
$$

where $g(\lambda)$ encodes the luminosity function as a spectral metric.

---

## 7. Example: Spectral Radiant Flux in GA

Spectral radiant flux $\Phi_\lambda$ is obtained by integrating spectral radiance over area and solid angle:

$$
\Phi_\lambda = \iint L_\lambda \, dA \, d\Omega \quad \leftrightarrow \quad \Phi_\lambda = L_\lambda \lrcorner (\mathbf{A} \wedge \mathbf{\Omega})
$$

This is a **grade-0 scalar function** parameterized over $\lambda$.

---

## 8. Advantages of the GA Formalism

* **Unified representation** of radiometric quantities as graded multivectors and their interrelations as grade reductions.
* **Geometric clarity** linking physical domains (area, direction, spectrum) to algebraic blades.
* **Extensible** to incorporate directional geometry via conformal GA, polarization, and other complex optics phenomena.
* **Computational implementation** using existing GA libraries enables symbolic and numeric manipulation of radiometric data.
* **Elegant expression** of photometric weighting as a spectral inner product.

---

## 9. Conclusion and Outlook

This geometric algebra framework recasts the classical radiometric measurement cube into a structured multivector lattice, with grade reductions representing physical integration steps.

Future work may:

* Extend this framework to **conformal geometric algebra** to model light directions and scene geometry precisely.
* Explore the **algebra of radiometric transformations**, including scattering and reflection, as rotor operations.
* Implement the framework in symbolic algebra systems for **simulation and rendering pipelines**.

---

## Acknowledgements

Author: Nick Porcino
The cube framework is due to Matthias Goerner.
Thanks to all the reviewers.