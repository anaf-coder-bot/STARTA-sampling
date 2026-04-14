# Advanced Statistical Sampling & Bias Analysis Application

This plan outlines the steps to build a high-performance Next.js web application for statistical sampling simulation and bias analysis. It replaces the existing minimal Vite setup with a full Next.js App Router project as requested.

## User Review Required

> [!WARNING]
> Your directory `c:\Users\anafc\Documents\sampling` currently contains an empty/basic React Vite template. 
> To align with your request for **Next.js 14/15 App Router with TypeScript**, I will delete the existing Vite files and bootstrap a new Next.js project in this directory before starting development. Please confirm this is acceptable.

## Proposed Changes

### Setup & Infrastructure
1. Clear the `c:\Users\anafc\Documents\sampling` directory.
2. Bootstrap Next.js 15 with App Router, TypeScript, and Tailwind CSS.
3. Install dependencies: `mathjs`, `recharts`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, `shadcn/ui` components (Card, Button, Slider, Select, Table, Progress).
4. Configure "Cyber-Academic" Theme (slate backgrounds `#0f172a`, neon indigo/cyan accents in `tailwind.config.ts`).
5. Install `react-latex-next` or similar for rendering LaTeX equations.

### Features & Components

#### 1. Core Logic & Math (`src/lib/math.ts` & Sampling Hooks)
- **Synthetic Population Generator**: Generates 1,000+ objects with `id`, `income` (normal distribution), `ageGroup` (categories), and `userType`.
- **Sampling Methods**:
  - *Simple Random Sampling*
  - *Stratified Sampling* (stratified by `userType` or `ageGroup`)
  - *Systematic Sampling* ($k = N/n$)
  - *Reservoir Sampling* (simulating processing over a stream)
- **Analytics Calculator**: Calculates KL Divergence & MSE between the population income distribution and sample income distribution. Calculates Standard Error live.

#### 2. UI Components (`src/components/`)
- **`MathHeader.tsx`**: Uses LaTeX to display mathematical formulas for the current selected sampling method.
- **`SamplingControls.tsx`**: Sidebar component with Sliders for Sample Size ($n$), Confidence Interval, and Method selectors.
- **`BiasMeter.tsx`**: A dashboard widget displaying the Representativeness Score and showing statistical bias on a radial scale.
- **`DataVisualizer.tsx`**: The main Framer Motion + Recharts stage.
  - *Population Map*: Grid of 1,000 dots using Canvas/SVG (Framer Motion might be heavy for 1,000 animated dots, but we will optimize with a lightweight virtualization or grid layout where sampled dots glow).
  - *Comparison Histogram*: Bell curves of Population vs. Sample distributions (Recharts).
- **`DataTable.tsx`**: Uses shadcn `Table` to display the actual raw sample.

#### 3. Main Dashboard (`src/app/page.tsx`)
- The primary layout:
  - Header: Application Title and `MathHeader.tsx`.
  - Sidebar: `SamplingControls.tsx`
  - Main Body: `BiasMeter.tsx` summary cards, `DataVisualizer.tsx` (Grid & Histogram), and `DataTable.tsx`.

## Open Questions

- Rendering 1,000 Framer Motion animated elements simultaneously could be severely resource-intensive in standard React. For the **Population Map**, I'll use raw CSS transitions or `div` grid mapped efficiently, with sampled entries activating a CSS driven "glow" rather than fully mounting Framer Motion on 1,000 nodes. Are you okay with this slight performance optimization?
- For the `MathHeader`, I plan to use `katex` (via `react-latex-next`) for beautiful LaTeX formula rendering.

## Verification Plan

### Automated Tests
- Validate that the math for Reservoir, Stratified, Systematic, and Simple Random sampling correctly produces the specified $n$ records out of $N$.
- Validate the "Bias Meter" actually changes based on the sample accuracy.

### Manual Verification
- Start the server (`npm run dev`) and visually verify the "Cyber-Academic" theme, the animations of the dot matrix, the sliders functioning correctly, and the histogram updating realistically as sample sizes are reduced.
