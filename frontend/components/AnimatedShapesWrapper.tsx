// components/AnimatedShapesWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// now `ssr: false` is allowed because THIS file is a Client Component
const AnimatedShapes = dynamic(() => import("./AnimatedShapes"), {
  ssr: false,
});

export default function AnimatedShapesWrapper() {
  return <AnimatedShapes />;
}
