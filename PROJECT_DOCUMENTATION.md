# Project Documentation - Subham Tomar Portfolio

Welcome to the official developer documentation for the premium, high-performance, Awwwards-style portfolio of **Subham Tomar**. This documentation is designed to be highly accessible and beginner-friendly, while serving as a comprehensive technical guide for developers, recruiters, and interviewers.

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Technologies Used](#3-technologies-used)
4. [Code Flow](#4-code-flow)
5. [Component Explanations](#5-component-explanations)
6. [State Management](#6-state-management)
7. [Animations](#7-animations)
8. [Styling Guide](#8-styling-guide)
9. [Assets](#9-assets)
10. [How to Edit Everything](#10-how-to-edit-everything)
11. [How to Add a New Project](#11-how-to-add-a-new-project)
12. [How to Add a New Skill](#12-how-to-add-a-new-skill)
13. [How to Change Colors](#13-how-to-change-colors)
14. [How to Change Fonts](#14-how-to-change-fonts)
15. [How to Replace Images](#15-how-to-replace-images)
16. [How to Deploy](#16-how-to-deploy)
17. [Future Improvements](#17-future-improvements)
18. [AI Integration Guide](#18-ai-integration-guide)
19. [Performance Optimization](#19-performance-optimization)
20. [SEO Guide](#20-seo-guide)
21. [Security](#21-security)
22. [Interview Guide](#22-interview-guide)
23. [Code Walkthrough Script](#23-if-interviewer-opens-code)
24. [Frequently Asked Interview Questions](#24-frequently-asked-interview-questions)
25. [Future Roadmap](#25-future-roadmap)

---

## 1. Project Overview

### What This Project Is
This project is an immersive, highly interactive personal portfolio website for **Subham Tomar**, a Software Engineer and Artificial Intelligence/Machine Learning enthusiast.

### Purpose
- Showcase technical credentials, achievements, education, and skills.
- Impress technical recruiters and engineering managers from top companies (e.g., Google, Microsoft, Amazon, OpenAI) and leading AI startups.
- Serve as a production-grade demonstration of high-end frontend architecture, scroll-driven interactive rendering, micro-interactions, and visual storytelling.

### Main Features
- **Cinematic Canvas Scrollytelling**: A 3D-like, scroll-driven image sequence playing at 60fps linked directly to page scroll.
- **Premium Loading Sequence**: Preloader with progressive counter and path-drawing logo animation.
- **Interactive Custom Cursor**: Dual-element magnetic glowing mouse-follower.
- **Dynamic API Integrations**: Live GitHub statistics fetched directly from GitHub REST API.
- **Awwwards Aesthetics**: Glassmorphism cards, glowing boundaries, dark futuristic theme, and micro-interactions.
- **Full SEO & Accessibility**: Robots.txt, dynamic Sitemap generation, Open Graph, and Twitter Cards built-in.

### Tech Stack
- **Core Framework**: Next.js 16 (App Router)
- **UI & Logic**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, PostCSS
- **Animations**: Framer Motion v12, GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React & Custom Brand SVG Components

---

## 2. Folder Structure

Below is an overview of the directory organization:

```
portfolio/
├── .next/                   # Next.js build compilation outputs (git ignored)
├── node_modules/            # NPM dependencies (git ignored)
├── public/                  # Static assets served directly
│   ├── sequence/            # 120 high-quality frames for the scrolly hero sequence
│   ├── avatar.png           # Professional developer profile image
│   ├── cert_oracle.png      # Oracle OCI Generative AI credential badge
│   ├── cert_google_prompt.png # Google Prompting Essentials credential badge
│   ├── cert_google_ai.png   # Google AI Essentials credential badge
│   └── resume.pdf           # Downloadable PDF Resume file
├── src/                     # Source directory
│   ├── app/                 # Next.js App Router routing entrypoints
│   │   ├── globals.css      # Tailwind v4 import and global custom definitions
│   │   ├── layout.tsx       # Root document layout wrapping global components
│   │   ├── page.tsx         # Landing page compiling all core sections
│   │   ├── robots.ts        # Dynamic robots.txt SEO rules
│   │   └── sitemap.ts       # Dynamic sitemap XML URL generator
│   └── components/          # Reusable UI component modules
│       ├── About.tsx        # About Me container with GSAP Scroll parallax
│       ├── Achievements.tsx # Metric count card counters
│       ├── Certifications.tsx # Certification grid cards
│       ├── Contact.tsx      # Contact form with status animations
│       ├── Cursor.tsx       # Custom cursor and magnetic wrapper
│       ├── Education.tsx    # timeline education history details
│       ├── FloatingResumeButton.tsx # Fixed corner download trigger
│       ├── Footer.tsx       # Social links and scroll to top button
│       ├── GithubDashboard.tsx # GitHub API stats and contribution grid
│       ├── Loader.tsx       # Animated entrance preloader screen
│       ├── Navbar.tsx       # Auto-hiding sticky glassmorphic navigation
│       ├── Overlay.tsx      # Multi-slide text panels overlaying scrolly canvas
│       ├── ParticlesBackground.tsx # GPU accelerated background particle canvas
│       ├── Projects.tsx     # 3D Tilt project cards list
│       ├── ScrollyCanvas.tsx # Handles canvas drawing of scroll-bound sequences
│       └── SocialIcons.tsx  # Custom SVG social brand vectors
├── package.json             # Build commands and dependency listings
└── tsconfig.json            # TypeScript compiler configuration options
```

---

## 3. Technologies Used

| Technology | Why It Is Used | Where It Is Used | Alternative Options |
| :--- | :--- | :--- | :--- |
| **Next.js** | Provides routing, SSR, static page optimization, SEO benefits, and asset optimization out of the box. | Project skeleton, layout routing, SEO configurations. | Remix, Vite + React, Astro. |
| **React** | Component-driven architecture allows isolating UI states (e.g. loader progress, project filters, form status). | Entire interface logic. | Vue.js, Svelte, SolidJS. |
| **TypeScript** | Enforces static type checking, preventing bugs during compilation. | All source files under `src/`. | Vanilla JavaScript, JSDoc. |
| **Tailwind CSS v4** | Instant styling with utility classes, theme customization, and automatic unused CSS purging. | Every UI component for styling. | Sass, Styled Components. |
| **Framer Motion** | Declarative animation syntax that integrates cleanly with React state updates. | Entrance reveals, transitions, cursor tracking, loaders. | Motion One, Anime.js. |
| **GSAP** | Unmatched performance for scroll-bound animations, scrubbing, and timeline calculations. | Scroll parallax on profile image. | ScrollMagic, Framer Motion Scroll. |
| **Lucide Icons** | High-quality, clean SVG icons that can be customized easily via classes. | Component labels and buttons. | FontAwesome, React Icons. |

---

## 4. Code Flow

The flow of execution when a browser loads the website:

```
[Browser Request]
       ↓
[Next.js App Router] (Loads dynamic metadata, robots.txt, sitemap.ts)
       ↓
[RootLayout] (Imports globals.css, mounts custom Cursor)
       ↓
[Home Page] (page.tsx)
       ↓
[Loader Component] (Starts progress 0-100%, page content is hidden)
       ↓ (After 2 seconds)
[Fade In Home Content] (Fades out Loader)
       ↓
[Render Global Helpers] (ParticlesBackground, Navbar, FloatingResumeButton)
       ↓
[Hero Section] (ScrollyCanvas rendering image sequence + scroll-bound text Overlay)
       ↓ (User Scrolls Down)
[Sequential Sections] (About -> Skills -> Projects -> Github -> Certs -> Achievements -> Education -> Contact -> Footer)
```

---

## 5. Component Explanations

### About
- **Purpose**: Displays a professional summary, photo, and skills.
- **Props**: None.
- **Hooks Used**: `useRef` (references for GSAP ScrollTrigger), `useEffect` (registers parallax timeline).
- **Animations**: GSAP ScrollTrigger moves the profile image along the Y-axis (`y: 35` to `y: -35`) at a different scroll speed than the text container.
- **How to Modify**: Edit the bio text strings or tags inside the `exploringSkills` array.
- **Common Mistakes**: Forgetting to wrap GSAP updates inside `useEffect`, causing hydration errors.

### Skills
- **Purpose**: Categorized skill levels with progressive metrics.
- **Props**: None.
- **Hooks Used**: `useState` (controls category tab filtering).
- **Animations**: Framer Motion progress bars animate from `width: 0%` to their target level when scrolled into view.
- **How to Modify**: Add or update entries in the `skillCategories` array.

### Projects
- **Purpose**: Displays real engineering projects with detailed metadata.
- **Props**: None.
- **Hooks Used**: `useRef` (card dimensions), `useMotionValue` / `useSpring` (mouse tracking coordinates).
- **Animations**: Custom 3D tilt rotation cards reacting to the relative mouse position inside the box.
- **How to Modify**: Update projects in the `projects` static list.
- **Common Mistakes**: Not checking if target URLs are valid, causing dead anchors.

### GithubDashboard
- **Purpose**: Fetches real-time profile metrics from the GitHub API and renders a simulated activity map.
- **Props**: None.
- **Hooks Used**: `useState` (stores stats), `useEffect` (fetches from API).
- **Animations**: Sequential staggered scale reveals for contribution squares.
- **How to Modify**: Update the username string `tomar-subham` to match your own.
- **Common Mistakes**: Hardcoding API URLs without fallback data, which leads to blank cards if offline or rate-limited.

### Certifications
- **Purpose**: Displays professional certifications with external links.
- **Props**: None.
- **Hooks Used**: None.
- **Animations**: Staggered scroll entrance reveals and hover card scaling.
- **How to Modify**: Modify the `certifications` array data.

### Achievements
- **Purpose**: Displays achievements with incremental counters.
- **Props**: None.
- **Hooks Used**: `useState` (keeps count), `useEffect` (increments numbers), `useInView` (triggers counting only when visible).
- **Animations**: Counts up from 0 to the target number when visible.

### Education
- **Purpose**: Academic timeline card displaying institute and score details.
- **Props**: None.
- **Hooks Used**: None.
- **Animations**: Timeline vertical line expansion on scroll.

### Contact
- **Purpose**: Contact information and form submission.
- **Props**: None.
- **Hooks Used**: `useState` (inputs), `AnimatePresence` (success transition toggle).
- **Animations**: Fades form fields in/out, scales success checkmark on submit.
- **Common Mistakes**: Not setting `type="button"` on non-submit buttons, triggering unwanted form reloads.

### Footer
- **Purpose**: Logo, links, and back-to-top button.
- **Props**: None.
- **Hooks Used**: None.
- **Animations**: Back to Top shifts upward on hover, and smoothly scrolls to top.

### Cursor
- **Purpose**: Renders the custom glowing cursor.
- **Props**: None.
- **Hooks Used**: `useMotionValue` / `useSpring` (tracks cursor coordinates).
- **Animations**: Scale shifts on links; outline follows coordinates with a spring lag.
- **Common Mistakes**: Forgetting to apply `pointer-events: none`, which blocks clicks on underlying content.

### FloatingResumeButton
- **Purpose**: Fixed shortcut to download your resume.
- **Props**: None.
- **Animations**: Scales up on load, expands text on hover.

---

## 6. State Management

This portfolio relies on React's local state management hooks to keep the application lightweight:

- **`useState`**: Used in `page.tsx` for loading states, `Navbar.tsx` for scroll visibility, `Contact.tsx` for form inputs, and `GithubDashboard.tsx` for stats.
- **`useEffect`**: Used to register event listeners (e.g. mouse movements in `Cursor.tsx`, window resize in `ParticlesBackground.tsx`, API calls in `GithubDashboard.tsx`, and GSAP hooks in `About.tsx`).
- **`useRef`**: References DOM nodes without triggering re-renders (used in canvas drawings, scroll wrappers, and GSAP triggers).

---

## 7. Animations

### Framer Motion
- **Scroll Reveals**: Uses `whileInView` and `viewport={{ once: true }}` to animate components into view as the user scrolls.
- **Staggered Animations**: Implemented by adding `delay: index * 0.1` to the transition config.
- **Exit Transitions**: Wrapped in `<AnimatePresence>` to animate components out of the DOM before they unmount.

### GSAP
- **Scroll Parallax**: Binds an element's position directly to the page scroll progress using `gsap.fromTo` and `ScrollTrigger`. Setting `scrub: true` aligns the animation progress with the scrollbar position.

---

## 8. Styling Guide

- **Tailwind CSS v4**: Global styles are declared in `src/app/globals.css`. It uses the modern `@import "tailwindcss";` syntax.
- **Theme Configurations**: Custom variables (e.g., `--background`, `--foreground`) are defined in `:root` and linked under `@theme inline { ... }` in CSS.
- **Aesthetic System**: 
  - **Colors**: Monochromatic black `#000000` base, with accent colors like purple `rgba(168, 85, 247)` and emerald `rgba(52, 211, 153)`.
  - **Glassmorphism**: Achieved using `bg-white/5 border border-white/10 backdrop-blur-md`.
  - **Responsiveness**: Responsive utility classes like `md:` (min-width: 768px) and `lg:` (min-width: 1024px) are used to adjust grid layouts for different screen sizes.

---

## 9. Assets

Assets are located in the `public/` directory:

| Asset Path | Type | Use Case | How to Replace |
| :--- | :--- | :--- | :--- |
| `public/sequence/` | WebP Images | Hero background animation frames | Replace with 120 sequentially named images. |
| `public/avatar.png` | PNG Image | Bio photo in About section | Replace with your profile photo named `avatar.png`. |
| `public/cert_oracle.png` | PNG Image | Oracle Certification Badge | Replace with another credential badge named `cert_oracle.png`. |
| `public/cert_google_ai.png` | PNG Image | Google AI Badge | Replace with another credential badge named `cert_google_ai.png`. |
| `public/cert_google_prompt.png` | PNG Image | Google Prompting Badge | Replace with another credential badge named `cert_google_prompt.png`. |
| `public/resume.pdf` | PDF Document | Downloadable Resume | Replace with your PDF resume named `resume.pdf`. |

---

## 10. How to Edit Everything

Here is how to edit the text and links in each section:

1. **Hero Text**: Open `src/components/Overlay.tsx` and modify the text in the `h1` and `h2` elements.
2. **Navbar Links**: Open `src/components/Navbar.tsx` and modify the `navLinks` array.
3. **About Text & Tags**: Open `src/components/About.tsx` and edit the biography strings or the elements in the `exploringSkills` array.
4. **Technical Skills**: Open `src/components/Skills.tsx` and edit the skills inside the `skillCategories` array.
5. **Projects**: Open `src/components/Projects.tsx` and update the titles, descriptions, and links in the `projects` array.
6. **Certifications**: Open `src/components/Certifications.tsx` and edit the credentials in the `certifications` array.
7. **Achievements Counters**: Open `src/components/Achievements.tsx` and update the milestones in the `achievements` array.
8. **Education details**: Open `src/components/Education.tsx` and update the institute name, degree details, and CGPA.
9. **Contact Info & Socials**: Open `src/components/Contact.tsx` and update the values in the `contacts` array.

---

## 11. How to Add a New Project

To add a new project card:
1. Open `src/components/Projects.tsx`.
2. Locate the `projects` array of objects (lines 19-60).
3. Add a new project object to the array following this format:
```typescript
{
  id: 5,
  title: "New Project Name",
  desc: "Brief description of the project.",
  tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  features: ["Key Feature A", "Key Feature B", "Key Feature C"],
  demoUrl: "https://demo.link",
  githubUrl: "https://github.com/username/project",
  gradient: "from-purple-600 via-pink-600 to-rose-600",
}
```
4. Save the file. The new card will render automatically.

---

## 12. How to Add a New Skill

To add a new skill to the skills grid:
1. Open `src/components/Skills.tsx`.
2. Locate the category where the skill belongs in the `skillCategories` array.
3. Add a new skill object to the `skills` array of that category:
```typescript
{ name: "My New Skill", level: 85 }
```
4. Save the file. The progress bar for the new skill will render automatically.

---

## 13. How to Change Colors

To update the global color theme:
1. Open `src/app/globals.css`.
2. Locate the `:root` variables:
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```
3. Update the hex values for background and text.
4. To change the accent gradients, search for `from-purple-500` or `to-pink-500` inside your components and replace them with other Tailwind color classes (e.g. `from-blue-500 to-cyan-500`).

---

## 14. How to Change Fonts

Next.js handles fonts dynamically to prevent layout shifts. To change fonts:
1. Open `src/app/layout.tsx`.
2. Import your preferred font from `next/font/google`:
```typescript
import { Inter, Outfit } from "next/font/google";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});
```
3. Pass the new font variables into the root layout's `<html>` element:
```tsx
<html lang="en" className={`${outfit.variable} h-full antialiased`}>
```
4. Open `src/app/globals.css` and map the font variable under `@theme inline`:
```css
@theme inline {
  --font-sans: var(--font-outfit);
}
```

---

## 15. How to Replace Images

1. **Profile Image**: Replace `public/avatar.png` with your new image. Ensure it is named exactly `avatar.png`.
2. **Certification Badges**: Replace the files `cert_oracle.png`, `cert_google_prompt.png`, or `cert_google_ai.png` in the `public` directory.
3. **Hero Scrollytelling Sequence**: 
   - Delete the files inside `public/sequence/`.
   - Add your new sequence frames. Make sure you name them sequentially (e.g. `frame_000_delay-0.066s.webp` to `frame_119_delay-0.066s.webp`).
   - If the number of frames changes, update `TOTAL_FRAMES` in `src/components/ScrollyCanvas.tsx` to match.

---

## 16. How to Deploy

### Deploying on Vercel (Recommended)
1. Push your code repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Leave the build settings as default.
5. Click **Deploy**. Vercel will build and host your portfolio automatically.

### Deploying on Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish directory**: `.next`
3. Click **Deploy**.

---

## 17. Future Improvements

To expand your portfolio into a larger platform:

- **CMS Integration**: Integrate headless CMS platforms like Sanity.io or Contentful to manage project details or write blog posts without editing code.
- **Dynamic Blogs**: Create a `/blog` route in the `src/app` directory. Fetch posts from markdown files or a CMS and render them statically for better performance.
- **Multilingual Support (i18n)**: Implement translations using packages like `next-intl` to support multiple languages.

---

## 18. AI Integration Guide

Adding AI features to your portfolio can set it apart for technical recruiters. Here is an overview of how to build and integrate an interactive chatbot assistant:

### Portfolio AI Assistant Architecture

```
                                [Client UI Chatbox]
                                         ↕ (WebSocket / SSE API Route)
                                  [API Route] (Next.js server-side)
                                         ↕
                                 [Orchestrator] (LangChain / LlamaIndex Agent)
                                         ↕
         ┌───────────────────────────────┼──────────────────────────────┐
         ↓                               ↓                              ↓
  [OpenAI / Claude LLM]        [Vector Database]                [Tool Integrations]
  (Core reasoning model)       (RAG: About Me context)          (e.g., Send email tool,
                                                                 GitHub fetch tool)
```

### Dynamic Code implementation:
You can build a route at `src/app/api/chat/route.ts` that runs on edge runtime and queries an LLM:

```typescript
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: messages,
    systemInstruction: "You are Subham Tomar's Portfolio AI Agent. Answer questions about his skills, experience, and projects.",
  });
  
  return Response.json({ response: response.text });
}
```

---

## 19. Performance Optimization

### Static Page Generation (SSG)
Next.js prerenders pages as static HTML at build time, which speeds up initial page load times and improves SEO.

### Lazy Loading & Code Splitting
Break up the bundle size by lazy loading heavy client-side components so they only load when they are scrolled into view:
```typescript
import dynamic from "next/dynamic";
const GithubDashboard = dynamic(() => import("@/components/GithubDashboard"), { ssr: false });
```

### Image Optimization
Always use the Next.js `<Image />` component. It automatically resizes images, converts them to modern formats (like WebP), and lazy-loads them to improve performance.

---

## 20. SEO Guide

SEO configurations are managed through two main files:

- **Robots.txt** (`src/app/robots.ts`): Guides search engine crawlers on which pages to index and links to the sitemap:
```typescript
import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://subhamtomar.dev/sitemap.xml",
  };
}
```
- **Sitemap** (`src/app/sitemap.ts`): Lists page URLs, update frequency, and index priority.
- **Open Graph / Twitter Cards**: Configured inside `layout.tsx` metadata. This controls how the portfolio preview looks when shared on social platforms.

---

## 21. Security

- **Environment Variables**: Store sensitive values (like API tokens) in `.env.local`. Never commit this file to GitHub.
- **API Protection**: Keep API queries server-side to hide keys from client-side network inspectors.
- **Rate Limiting**: Implement rate limiting on API endpoints (like the contact form submit route) to prevent abuse and spam.

---

## 22. Interview Guide

### 1-Minute Pitch
> "I built an Awwwards-style developer portfolio using Next.js, React, and TypeScript. The goal was to create an immersive, high-performance experience that demonstrates clean code, strong styling, and complex scroll-bound canvas animations. It features interactive custom cursors, dynamic integration with the GitHub API, and a custom loading animation, all while maintaining excellent performance and SEO best practices."

### 3-Minute Explanation
> "My portfolio is built on the Next.js App Router for server-side optimization and dynamic routing. To showcase my projects and skills in an engaging way, I built a scrollytelling canvas that plays a 60fps image sequence synchronized with the page scroll progress. I also built interactive custom cursor followers, a sticky autohiding navigation bar, and canvas-based drifting background particles.
> 
> On the backend, I integrated a dashboard that fetches my real-time profile metrics from the GitHub API and handles rate limits gracefully. The site is optimized for performance using lazy-loaded modules, optimized WebP images, and static page builds, ensuring fast load times and a smooth user experience. It also includes robots.txt and sitemap configurations to follow SEO best practices."

### 10-Minute Walkthrough (Architecture & Deep Dive)
- **Framework Choice**: Explain that Next.js was selected for its App Router structure and static page generation, which provides fast load times and SEO benefits.
- **Scrollytelling Engine**: Explain how the image sequence canvas is drawn on the screen based on scroll coordinates tracked by Framer Motion, matching the frame count to the scroll percentage.
- **Performance Trade-offs**: Discuss how using lightweight canvas elements instead of large animation packages (like tsParticles) helped keep the bundle size small and performance scores high.
- **Troubleshooting**: Explain how you resolved issues with overlays blocking click events by applying `pointer-events: none` to the transparent containers, letting events pass through to interactive elements below.

---

## 23. If Interviewer Opens Code

When walking an interviewer through the codebase, follow this structured script:

```
[Start at the Folder Structure]
   "First, I organized the codebase into a standard Next.js App Router structure.
    Static assets are located in /public, and modular components are isolated in /src/components."
                                 ↓
[Go to layout.tsx]
   "Next, layout.tsx wraps the app with global fonts and styles, configures metadata
    for search engines, and mounts the custom Cursor component so it works globally."
                                 ↓
[Go to page.tsx]
   "This is the entry point of the landing page. It manages the loading screen state.
    Once loading finishes, it fades in the navbar, particle background, hero canvas,
    and sections."
                                 ↓
[Go to ScrollyCanvas.tsx & Overlay.tsx]
   "Here is where the scroll-driven hero sequence is managed.
    The canvas updates frames dynamically based on scroll progress tracked by Framer Motion."
                                 ↓
[Go to Components (Projects, GithubDashboard)]
   "These show how I build clean UI cards and manage states.
    For example, GithubDashboard fetches dynamic metrics with a reliable fallback,
    and the Project cards apply a 3D tilt effect on hover."
```

---

## 24. Frequently Asked Interview Questions

#### Q1: Why did you choose Next.js over simple React?
Next.js provides server-side rendering, static site generation, and optimized image processing out of the box, which improves SEO and performance compared to client-side React apps.

#### Q2: How did you implement the custom cursor?
I used Framer Motion's `useMotionValue` to track coordinates and `useSpring` to add a smooth lag effect to the cursor follower.

#### Q3: Why does the custom cursor use `pointer-events: none`?
To allow click events to pass through the custom cursor elements and reach the links and buttons underneath.

#### Q4: How is the scrollytelling canvas animated?
Framer Motion's `useScroll` tracks page scroll progress (from 0 to 1). This progress value is mapped to the corresponding frame index of the 120-image sequence, which is then drawn onto the canvas at 60fps.

#### Q5: What happens if the GitHub API rate limit is exceeded?
The dashboard catches the API error and falls back to a clean mock data dataset, ensuring the website continues to load and display stats without breaking.

---

## 25. Future Roadmap

1. **Interactive Sandbox**: Add an interactive sandbox environment where visitors can play with AI models and visualize neural networks directly in the browser.
2. **SaaS Dashboard**: Expand the projects section into an admin panel that tracks site analytics and form submissions.
3. **Voice Command System**: Integrate a voice recognition assistant that lets visitors navigate the portfolio using voice commands.
