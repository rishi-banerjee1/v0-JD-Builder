# Atlan JD Builder

AI-powered job description builder that generates outcome-focused, bias-free JDs aligned with Atlan's hiring standards.

---

## Why This Exists

- Writing quality JDs from scratch is slow and inconsistent across hiring managers
- Generic JD templates produce task-focused descriptions instead of outcome-focused ones
- Department role boundaries get blurred without explicit guardrails
- Biased or exclusionary language slips in without automated detection
- No feedback loop exists to measure JD quality before publishing

## Features

| Feature | What It Does |
|---------|-------------|
| **Dynamic Questionnaire** | 6-field intake form captures outcomes, mindset, strategic advantage, and trade-offs — not just title and requirements |
| **Document Upload** | Upload existing JDs (PDF, DOCX, TXT) for AI-powered analysis and enhancement |
| **Department Guardrails** | 11 departments with predefined ownership areas and boundaries — the AI respects what a role should and should not own |
| **Bias Detection** | Flags gender, age, cultural, and ableist language with suggested alternatives |
| **Sharpness Score** | 1-5 star rating quantifying clarity, inclusivity, and outcome-focus of each section |
| **Refinement Suggestions** | AI provides before/after improvements with reasoning for each section |
| **Offline Support** | Service worker caches assets; IndexedDB persists drafts — keep working without internet |
| **Auto-Save Drafts** | Form data saved to IndexedDB every 2 seconds with 24-hour recovery window |
| **Circuit Breaker** | API failures trigger exponential backoff with fallback JD generation — never a blank screen |

## Quick Start

> 2 minutes to get running

1. **Clone the repo**
   ```bash
   git clone https://github.com/rishi-banerjee1/v0-JD-Builder.git
   cd v0-JD-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Add your Google Gemini API key
   ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Usage

| Action | How |
|--------|-----|
| Create a JD from scratch | Home → fill the 6-field questionnaire → Generate |
| Enhance an existing JD | Home → "Enhance JD" tab → upload file → Generate |
| Upload a document for analysis | Home → "Upload Document" tab → drag/drop PDF, DOCX, or TXT |
| Refine a generated JD | After generation → click any section → apply AI suggestions |
| View Atlan's JD standards | Navbar → "Standards" |
| Recover a saved draft | On page load, accept the "Load draft?" prompt (if within 24 hours) |

## Environment Variables

Create a `.env.local` file:

```
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_GEMINI_API_KEY` | Yes | Google Gemini 2.0 Flash API key for JD generation |

## How It Works

**3-Step Builder Workflow:**

1. **Intake** — Choose between questionnaire, document upload, or JD enhancement. The questionnaire captures what makes this role unique: outcomes that define success, mindset of top performers, strategic advantage, and key trade-offs.

2. **Analysis & Refinement** — AI generates the JD using Gemini 2.0 Flash with department guardrails baked into the prompt. Each section gets a sharpness score and targeted suggestions. Toggle "Atlan Standard Mode" for automatic language improvements (active voice, outcome focus, clarity).

3. **Final Output** — Complete JD with Atlan company intro, strategic vision (optional), department guardrails (green = owns, amber = avoid), bias detection results, and equal opportunity statement.

<details>
<summary><strong>Department Guardrails System</strong></summary>

11 departments with predefined role boundaries enforced during generation:

| Department | Owns | Avoids |
|------------|------|--------|
| Engineering | System architecture, codebase, infrastructure, reliability | Product strategy, brand messaging, full UX ownership |
| Product Management | Product strategy, roadmap, feature definition | Design specifics, engineering estimates |
| Sales | Pipeline, revenue, deal strategy, CRM | Product feature commitments, legal review |
| Marketing | Brand voice, demand gen, website, employer brand | Product delivery, revenue ownership |
| Customer Experience | Onboarding, support, ticketing, NPS | Product roadmap, engineering priorities |
| Finance | Budgeting, forecasting, spend management | HR policies, talent decisions |
| People | HR systems, hiring strategy, candidate experience | Employer branding, talent sourcing metrics |
| Product Design | User journeys, wireframes, visual systems, UX research | Technical feasibility, product strategy |
| Legal | Contracts, regulatory compliance, IP, risk | Performance policies, procurement |
| IT & Security | Internal tools, access control, security policies | In-product security features, legal contracts |
| Founder's Office | Strategic initiatives, OKRs, cross-functional task forces | Full-time function ownership, talent decisions |

</details>

<details>
<summary><strong>AI & Prompt Architecture</strong></summary>

| Prompt | Purpose | Trigger |
|--------|---------|---------|
| JD Generation | Creates complete JD from questionnaire inputs | Form submission |
| Document Analysis | Extracts structured info from uploaded files | Document upload |
| JD Enhancement | Improves existing JD language and structure | Enhancement request |
| Refinement Suggestions | Section-specific improvement recommendations | Refinement mode |
| Bias Detection | Flags exclusionary language with alternatives | During generation |

**Model:** Google Gemini 2.0 Flash (temperature 0.7, 4096 max tokens)

**Caching:** 1-hour TTL for generated JDs, 30-minute TTL for suggestions. Rate limited at 1 request/second per endpoint.

**Fallback:** If the API is unavailable, a template-based generator produces department-aware JDs using local guardrail data.

</details>

<details>
<summary><strong>Offline & Storage Architecture</strong></summary>

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Service Worker | Native browser API | Cache HTML, CSS, JS, images for offline access |
| IndexedDB | Custom wrapper with circuit breaker | Persist drafts, generated JDs, uploaded content |
| Session Storage | Browser API | Store refined JDs and analyzed documents across navigation |
| Network Monitor | Online/offline event listeners | Real-time connection status with toast notifications |
| Background Sync | Service Worker Sync API | Re-sync when connection is restored |

</details>

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19, Radix UI primitives |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod validation |
| AI | Google Gemini 2.0 Flash |
| Document Parsing | Mammoth (DOCX), pdf.js (PDF) |
| Storage | IndexedDB + Session Storage |
| Offline | Service Worker |
| Icons | Lucide React |
| Resilience | Circuit breaker pattern, error boundaries |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `npm install` fails with peer dependency errors | Use `npm install --legacy-peer-deps` |
| JD generation returns fallback content | Check that `GOOGLE_GEMINI_API_KEY` is set in `.env.local` |
| DOCX upload stuck at 0% | Ensure Mammoth CDN script loads (check network tab for `mammoth.browser.min.js`) |
| Draft not loading on refresh | Drafts expire after 24 hours — check if the save is recent |
| Offline page showing when online | Clear service worker cache in DevTools → Application → Service Workers |
| Build warning about lockfiles | Remove `pnpm-lock.yaml` if you're using npm |

## License

MIT
