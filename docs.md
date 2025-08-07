# Aditya Vikram Portfolio - Project Documentation

## Overview
This is a modern, interactive portfolio website for **Aditya Vikram Mahendru**, built with Next.js and featuring advanced animations, smooth scrolling, and a sophisticated design system. The portfolio showcases projects, personal information, and professional experience through multiple interactive pages.

## 📁 Project Structure

```
AdityaVikramPortfolio/
├── .github/                    # GitHub Actions workflow
│   └── workflows/
│       └── main.yml           # Self-hosted deployment workflow
├── frontend/                   # Main Next.js application
│   ├── app/                   # Next.js app router pages
│   │   ├── layout.tsx         # Root layout with theme provider
│   │   ├── page.tsx           # Homepage with animated hero
│   │   ├── projects/          # Projects showcase
│   │   │   └── page.tsx
│   │   ├── whoami/            # About/personal page
│   │   │   └── page.tsx
│   │   ├── globals.css        # Global styles with CSS variables
│   │   └── favicon.ico
│   ├── components/            # Reusable React components
│   │   ├── ui/                # UI component library
│   │   │   ├── animated-testimonials.tsx
│   │   │   ├── floating-dock.tsx
│   │   │   ├── card-swipe.tsx
│   │   │   ├── mouse-follower.tsx
│   │   │   ├── lenis-smooth-scroll.tsx
│   │   │   ├── blur-vignette.tsx
│   │   │   ├── footer.tsx
│   │   │   └── [other UI components]
│   │   └── mvpblocks/
│   │       └── geometric-hero.tsx
│   ├── lib/
│   │   └── utils.ts           # Utility functions (cn helper)
│   ├── public/                # Static assets
│   │   ├── uploads/
│   │   │   └── Resume.pdf
│   │   ├── card/              # Project preview images
│   │   ├── testimonials/      # Testimonial profile images
│   │   └── [other assets]
│   ├── package.json           # Dependencies and scripts
│   ├── next.config.ts         # Next.js configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── components.json        # shadcn/ui configuration
│   ├── nixpacks.toml          # Deployment configuration
│   └── [config files]
├── TODO.md                    # Development roadmap
├── .gitignore
├── .gitattributes
└── docs.md                    # This documentation file
```

## 🚀 Technology Stack

### Core Framework
- **Next.js 15.4.5** - React framework with App Router
- **React 19.1.0** - Frontend library
- **TypeScript** - Type safety and developer experience

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Component library based on Radix UI
- **Framer Motion 12.23.12** - Animation library
- **CSS Variables** - Dynamic theming system

### Enhanced Features
- **Lenis** - Smooth scrolling library
- **Swiper.js** - Touch slider component
- **Lucide React** - Icon library
- **next-themes** - Dark/light mode support

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Geist & Azeret Mono** - Google Fonts integration

## 📱 Pages & Features

### 1. Homepage (`/`)
- **Animated Hero Section**: Features floating star shapes with gradient effects
- **Typography**: Custom fonts (Pacifico, Azeret Mono) with gradient text effects
- **Interactive Elements**: Framer Motion animations with staggered reveals
- **Geometric Animations**: SVG star shapes with rotation and floating effects

### 2. About Page (`/whoami`)
- **Smooth Scrolling**: Lenis integration for premium scroll experience
- **Testimonials Carousel**: Animated testimonials with image stacking effects
- **Skills Section**: Grid layout with technology badges
- **Profile Image**: Blur vignette effect overlay
- **Contact Links**: Email and project navigation

### 3. Projects Page (`/projects`)
- **Dual View System**: Toggle between card swipe and table view
- **Card Swiper**: 3D card stack effect using Swiper.js
- **Project Showcase**: Features 7 projects including:
  - Woxsen Student Council website
  - MUN Registration system
  - Laundry Management system
  - Spotify Analysis (GitHub project)
  - AI Slang Translator
  - CNN from Scratch (Rust)
  - NoteRefactor tool

### 4. Global Features
- **Floating Navigation Dock**: macOS-style dock with hover effects
- **Custom Mouse Cursor**: Multi-layer cursor with blend modes
- **Theme System**: Light/dark mode with smooth transitions
- **Social Links**: GitHub, LinkedIn, YouTube, Email integration
- **Resume Access**: PDF download functionality

## 🎨 Design System

### Color Palette
- **Light Mode**: White backgrounds with neutral grays
- **Dark Mode**: Deep blacks with subtle gradients
- **Accent Colors**: Primary neutral with rose and gradient overlays
- **Theme Variables**: OKLCH color space for consistent brightness

### Typography
- **Primary**: Geist Sans - Clean, modern sans-serif
- **Monospace**: Geist Mono - Code and technical content
- **Decorative**: Pacifico - Handwritten style for emphasis
- **Body**: Azeret Mono - Structured content with character

### Animation Principles
- **Easing**: Custom cubic-bezier curves for natural movement
- **Staggered Reveals**: Sequential content appearance
- **Hover States**: Subtle scale and glow effects
- **Page Transitions**: Smooth element choreography

## 🔧 Component Architecture

### Core UI Components

#### `FloatingDock`
- Magnetic hover effects with spring physics
- Responsive mobile/desktop variants
- Tooltip system with smooth reveals

#### `AnimatedTestimonials`
- Image stacking with pseudo-random rotations
- Word-by-word text reveals with blur effects
- Navigation controls with icon animations

#### `CardSwipe`
- 3D card stack using Swiper.js Effects
- Autoplay functionality with pause on interaction
- Badge system for project categorization

#### `MouseFollower`
- Multi-layer cursor system
- Blend mode effects for universal visibility
- Hover state detection and scaling
- Mobile device exclusion

#### `LenisSmoothScroll`
- Configurable scroll physics
- Custom easing functions
- Touch and mouse multiplier controls

### Utility Systems

#### `cn` Function
- Combines clsx and tailwind-merge
- Handles conditional and dynamic classes
- Prevents Tailwind conflicts

#### Theme Provider
- Next-themes integration
- System theme detection
- Persistent user preferences

## 🚀 Deployment & CI/CD

### Self-Hosted Setup
- **Platform**: GitHub Actions with self-hosted runner
- **Builder**: Nixpacks for container creation
- **Port**: Application runs on port 8594
- **Domain**: Custom domain with reverse proxy

### Deployment Flow
1. **Trigger**: Push to main branch
2. **Checkout**: Latest code retrieval
3. **Container Management**: Stop existing containers
4. **Build Process**: Nixpacks containerization
5. **Launch**: New container deployment

### Build Configuration
```toml
# nixpacks.toml
[phases.setup]
nixPkgs = ["nodejs_22"]

[phases.build]
cmds = ["npm install", "npm run build"]

[phases.start]
cmd = "npm start"
```

## 📦 Package Dependencies

### Production Dependencies
- **@radix-ui/*** - Accessible UI primitives
- **@studio-freight/lenis** - Smooth scrolling
- **@tabler/icons-react** - Icon library
- **framer-motion** - Animation framework
- **next-themes** - Theme management
- **swiper** - Touch sliders
- **tailwind-merge** - Class merging utility

### Development Dependencies
- **@tailwindcss/postcss** - CSS processing
- **@types/*** - TypeScript definitions
- **eslint** - Code quality
- **tw-animate-css** - Animation utilities

## 🎯 Performance Optimizations

### Image Handling
- **Next.js Image Component**: Automatic optimization
- **WebP Format**: Modern image compression
- **Lazy Loading**: Viewport-based loading
- **Responsive Images**: Device-appropriate sizing

### Code Splitting
- **App Router**: Automatic route-based splitting
- **Dynamic Imports**: Component-level splitting
- **Bundle Analysis**: Webpack bundle optimization

### Animation Performance
- **Transform-based Animations**: GPU acceleration
- **RequestAnimationFrame**: Smooth 60fps animations
- **Intersection Observer**: Viewport-based triggers
- **Motion Reduction**: Respects user preferences

## 🔮 Future Enhancements (TODO.md)

### Planned Improvements
1. **Component Upgrades**:
   - Replace card stack with hover-expand effects
   - Implement draggable card system
   - Add text effect flipper for social section

2. **UI Enhancements**:
   - Expandable card table view
   - Enhanced project showcase
   - Priority: Experience page addition

3. **Performance**:
   - Further bundle optimization
   - Advanced caching strategies
   - Progressive image loading

## 🛠️ Development Workflow

### Getting Started
```bash
cd frontend
npm install
npm run dev
```

### Build Process
```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Code quality check
```

### Key Scripts
- `dev`: Development server with Turbopack
- `build`: Production optimization
- `start`: Production server
- `lint`: ESLint validation

## 🎨 Design Patterns

### Component Composition
- **Compound Components**: Complex UI building blocks
- **Render Props**: Flexible component interfaces
- **Custom Hooks**: Shared stateful logic
- **Context Providers**: Global state management

### State Management
- **Local State**: useState for component-specific data
- **Theme State**: next-themes for preferences
- **Animation State**: Framer Motion's built-in state
- **Scroll State**: Lenis scroll position tracking

### Styling Approach
- **Utility-First**: Tailwind CSS methodology
- **Component Variants**: Class variance authority
- **CSS Variables**: Runtime theme switching
- **Responsive Design**: Mobile-first breakpoints

## 📊 Analytics & Monitoring

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS optimization
- **Bundle Size**: Webpack bundle analyzer
- **Runtime Performance**: React DevTools profiler
- **User Experience**: Lighthouse scoring

### Error Handling
- **TypeScript**: Compile-time error prevention
- **ESLint**: Runtime error catching
- **Next.js**: Built-in error boundaries
- **Graceful Degradation**: Progressive enhancement

---

## 🤝 Contact & Social Links

- **Email**: jobs.aditya.vikram.mahendru@gmail.com
- **GitHub**: [DeathSurfing](https://github.com/DeathSurfing)
- **LinkedIn**: [aditya-vikram-mahendru](https://www.linkedin.com/in/aditya-vikram-mahendru/)
- **YouTube**: [@VikramMahendru](https://www.youtube.com/@VikramMahendru)

---

*This documentation provides a comprehensive overview of the Aditya Vikram Portfolio project. For specific implementation details, refer to the individual component files and configuration documentation.*
