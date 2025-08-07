export type AnimationVariant = 
  | "circle" 
  | "circle-blur" 
  | "polygon" 
  | "gif"
  | "slide-horizontal"
  | "slide-vertical"
  | "fade-blur"
  | "spiral"
  | "diamond"
  | "wave"

export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"

interface Animation {
  name: string
  css: string
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" }
    case "top-right":
      return { cx: "40", cy: "0" }
    case "bottom-left":
      return { cx: "0", cy: "40" }
    case "bottom-right":
      return { cx: "40", cy: "40" }
  }
}

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (start === "center") return

  const positionCoords = getPositionCoords(start)
  if (!positionCoords) {
    throw new Error(`Invalid start position: ${start}`)
  }
  const { cx, cy } = positionCoords

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`
  }

  if (variant === "circle-blur") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`
  }

  return ""
}

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return "top left"
    case "top-right":
      return "top right"
    case "bottom-left":
      return "bottom left"
    case "bottom-right":
      return "bottom right"
  }
}

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart,
  url?: string
): Animation => {
  const svg = generateSVG(variant, start)
  const transformOrigin = getTransformOrigin(start)

  if (variant === "polygon") {
    return {
      name: `${variant}-${start}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark;
      }

      @keyframes reveal-dark {
        from {
          clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%);
        }
        to {
          clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%);
        }
      }

      @keyframes reveal-light {
        from {
          clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%);
        }
        to {
          clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%);
        }
      }
      `,
    }
  }
  if (variant === "circle" && start == "center") {
    return {
      name: `${variant}-${start}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light;
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark;
      }

      @keyframes reveal-dark {
        from {
          clip-path: circle(0% at 50% 50%);
        }
        to {
          clip-path: circle(100.0% at 50% 50%);
        }
      }

      @keyframes reveal-light {
        from {
           clip-path: circle(0% at 50% 50%);
        }
        to {
          clip-path: circle(100.0% at 50% 50%);
        }
      }
      `,
    }
  }
  if (variant === "gif") {
    return {
      name: `${variant}-${start}`,
      css: `
      ::view-transition-group(root) {
  animation-timing-function: var(--expo-in);
}

::view-transition-new(root) {
  mask: url('${url}') center / 0 no-repeat;
  animation: scale 3s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: scale 3s;
}

@keyframes scale {
  0% {
    mask-size: 0;
  }
  10% {
    mask-size: 50vmax;
  }
  90% {
    mask-size: 50vmax;
  }
  100% {
    mask-size: 2000vmax;
  }
}`,
    }
  }

  // New animation variants
  if (variant === "slide-horizontal") {
    const direction = start === "left" ? "-100%" : "100%";
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) {
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        ::view-transition-new(root) {
          animation-name: slide-in-${start};
        }
        ::view-transition-old(root) {
          animation-name: slide-out-${start};
        }
        @keyframes slide-in-${start} {
          from {
            transform: translateX(${direction});
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-out-${start} {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(${direction === "-100%" ? "100%" : "-100%"});
            opacity: 0;
          }
        }
      `,
    }
  }

  if (variant === "slide-vertical") {
    const direction = start === "top" ? "-100%" : "100%";
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) {
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        ::view-transition-new(root) {
          animation-name: slide-in-vertical-${start};
        }
        ::view-transition-old(root) {
          animation-name: slide-out-vertical-${start};
        }
        @keyframes slide-in-vertical-${start} {
          from {
            transform: translateY(${direction});
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-out-vertical-${start} {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(${direction === "-100%" ? "100%" : "-100%"});
            opacity: 0;
          }
        }
      `,
    }
  }

  if (variant === "fade-blur") {
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) {
          animation-duration: 1s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        ::view-transition-new(root) {
          animation-name: fade-blur-in;
        }
        ::view-transition-old(root) {
          animation-name: fade-blur-out;
        }
        @keyframes fade-blur-in {
          from {
            opacity: 0;
            filter: blur(10px) brightness(1.2);
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            filter: blur(0px) brightness(1);
            transform: scale(1);
          }
        }
        @keyframes fade-blur-out {
          from {
            opacity: 1;
            filter: blur(0px) brightness(1);
            transform: scale(1);
          }
          to {
            opacity: 0;
            filter: blur(10px) brightness(0.8);
            transform: scale(0.95);
          }
        }
      `,
    }
  }

  if (variant === "spiral") {
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) {
          animation-duration: 1.2s;
          animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        ::view-transition-new(root) {
          animation-name: spiral-in;
        }
        ::view-transition-old(root) {
          animation-name: spiral-out;
        }
        @keyframes spiral-in {
          from {
            opacity: 0;
            transform: rotate(-720deg) scale(0);
            filter: blur(5px);
          }
          50% {
            opacity: 0.8;
            transform: rotate(-360deg) scale(0.8);
            filter: blur(2px);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes spiral-out {
          from {
            opacity: 1;
            transform: rotate(0deg) scale(1);
            filter: blur(0px);
          }
          50% {
            opacity: 0.8;
            transform: rotate(360deg) scale(0.8);
            filter: blur(2px);
          }
          to {
            opacity: 0;
            transform: rotate(720deg) scale(0);
            filter: blur(5px);
          }
        }
      `,
    }
  }

  if (variant === "diamond") {
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) {
          animation-duration: 0.9s;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        ::view-transition-new(root) {
          animation-name: diamond-reveal;
        }
        ::view-transition-old(root) {
          animation: none;
          z-index: -1;
        }
        @keyframes diamond-reveal {
          from {
            clip-path: polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%);
          }
          25% {
            clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
            transform: scale(0.8);
          }
          50% {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            transform: scale(1.05);
          }
          to {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            transform: scale(1);
          }
        }
      `,
    }
  }

  if (variant === "wave") {
    return {
      name: `${variant}-${start}`,
      css: `
        ::view-transition-group(root) {
          animation-duration: 1.1s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        ::view-transition-new(root) {
          animation-name: wave-reveal;
        }
        ::view-transition-old(root) {
          animation: none;
          z-index: -1;
        }
        @keyframes wave-reveal {
          0% {
            clip-path: polygon(
              0% 100%,
              5% 95%,
              10% 100%,
              15% 95%,
              20% 100%,
              25% 95%,
              30% 100%,
              35% 95%,
              40% 100%,
              45% 95%,
              50% 100%,
              55% 95%,
              60% 100%,
              65% 95%,
              70% 100%,
              75% 95%,
              80% 100%,
              85% 95%,
              90% 100%,
              95% 95%,
              100% 100%,
              100% 100%,
              0% 100%
            );
          }
          50% {
            clip-path: polygon(
              0% 60%,
              5% 45%,
              10% 60%,
              15% 45%,
              20% 60%,
              25% 45%,
              30% 60%,
              35% 45%,
              40% 60%,
              45% 45%,
              50% 60%,
              55% 45%,
              60% 60%,
              65% 45%,
              70% 60%,
              75% 45%,
              80% 60%,
              85% 45%,
              90% 60%,
              95% 45%,
              100% 60%,
              100% 100%,
              0% 100%
            );
          }
          100% {
            clip-path: polygon(
              0% 0%,
              5% 0%,
              10% 0%,
              15% 0%,
              20% 0%,
              25% 0%,
              30% 0%,
              35% 0%,
              40% 0%,
              45% 0%,
              50% 0%,
              55% 0%,
              60% 0%,
              65% 0%,
              70% 0%,
              75% 0%,
              80% 0%,
              85% 0%,
              90% 0%,
              95% 0%,
              100% 0%,
              100% 100%,
              0% 100%
            );
          }
        }
      `,
    }
  }

  return {
    name: `${variant}-${start}`,
    css: `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-out);
      }
      ::view-transition-new(root) {
        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale-${start} 1s;
        transform-origin: ${transformOrigin};
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale-${start} 1s;
        transform-origin: ${transformOrigin};
        z-index: -1;
      }
      @keyframes scale-${start} {
        to {
          mask-size: 350vmax;
        }
      }
    `,
  }
}
