export default function DecorativeBackground() {
  return (
    <>
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative Corner Brackets */}
      <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 border-t-[6px] border-l-[6px] border-foreground" />
      <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-t-[6px] border-r-[6px] border-foreground" />
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 border-b-[6px] border-l-[6px] border-foreground" />
      <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-b-[6px] border-r-[6px] border-foreground" />

      {/* Floating Stamps */}
      <div className="absolute top-16 right-16 rotate-12 border-[5px] border-foreground bg-background px-6 py-3 text-base font-black tracking-[0.2em] shadow-[8px_8px_0px_0px_var(--foreground)] hidden lg:block">
        ★ GET IN TOUCH ★
      </div>

      <div className="absolute top-1/4 left-8 w-28 h-28 border-[6px] border-foreground bg-background rotate-45 shadow-[10px_10px_0px_0px_var(--foreground)] hidden md:block" />
      <div className="absolute bottom-1/3 right-16 w-32 h-32 border-[6px] border-foreground bg-primary rounded-full shadow-[12px_12px_0px_0px_var(--foreground)] hidden lg:block" />

      {/* Bottom Accent Bars */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-foreground" />
      <div className="absolute bottom-4 left-0 right-0 flex h-3">
        <div className="flex-1 bg-foreground" />
        <div className="flex-1 bg-muted" />
        <div className="flex-1 bg-foreground opacity-70" />
        <div className="flex-1 bg-muted" />
      </div>
    </>
  );
}
