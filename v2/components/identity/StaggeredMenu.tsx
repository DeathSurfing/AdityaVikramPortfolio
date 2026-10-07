'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import './StaggeredMenu.css';

// gsap drives the menu's open/close choreography, but nothing on initial paint
// depends on it: the panel, prelayers, and panel labels all start hidden via
// CSS, and gsap only animates them once the toggle is used. Loading gsap with
// the initial bundle cost ~81 KB of JS on every page view for an interaction
// most visitors never trigger, so it is fetched on first interaction instead.
// See initialise() for the first-paint state, which must stay in sync with
// the .staggered-menu-panel / .sm-prelayers / .sm-prelayer rules in the CSS.
import type { gsap as GsapInstance } from 'gsap';

type Gsap = typeof GsapInstance;

let gsapPromise: Promise<Gsap> | null = null;
function loadGsap(): Promise<Gsap> {
  gsapPromise ??= import('gsap').then((m) => m.gsap);
  return gsapPromise;
}

interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export function StaggeredMenu({
  position = 'right',
  colors = ['var(--primary)', 'var(--muted-foreground)'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/AFavicon.ico',
  menuButtonColor = '#e5e5e5',
  openMenuButtonColor = '#e5e5e5',
  accentColor = '#ffcc00',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<Element[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const textWrapRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);
  const router = useRouter();

  const openTlRef = useRef<Gsap['timeline'] extends (...a: never[]) => infer R ? R : never | null>(null);
  const closeTweenRef = useRef<Gsap['to'] extends (...a: never[]) => infer R ? R : never | null>(null);
  const spinTweenRef = useRef<Gsap['to'] extends (...a: never[]) => infer R ? R : never | null>(null);
  const textCycleAnimRef = useRef<Gsap['to'] extends (...a: never[]) => infer R ? R : never | null>(null);
  const colorTweenRef = useRef<Gsap['to'] extends (...a: never[]) => infer R ? R : never | null>(null);
  const itemEntranceTweenRef = useRef<Gsap['to'] extends (...a: never[]) => infer R ? R : never | null>(null);
  const busyRef = useRef(false);
  const gsapRef = useRef<Gsap | null>(null);

  // Applies the state gsap would have set at first paint. Everything here is
  // already hidden by CSS, so this is a no-op visually; it exists so the
  // animations start from the same values they did when gsap was eager.
  const initialise = useCallback((gsap: Gsap) => {
    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const icon = iconRef.current;
    const textInner = textInnerRef.current;
    const toggleBtn = toggleBtnRef.current;
    if (!panel || !plusH || !plusV || !icon || !textInner) return;

    const preLayers: Element[] = preContainer
      ? Array.from(preContainer.querySelectorAll('.sm-prelayer'))
      : [];
    preLayerElsRef.current = preLayers;

    const offscreen = position === 'left' ? -100 : 100;
    gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
    if (preContainer) {
      gsap.set(preContainer, { xPercent: 0, opacity: 1 });
    }
    gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
    gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
    gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
    gsap.set(textInner, { yPercent: 0 });
    if (toggleBtn) gsap.set(toggleBtn, { color: menuButtonColor });
  }, [menuButtonColor, position]);

  // gsap is only needed once the user actually interacts with the menu.
  const ensureGsap = useCallback(async (): Promise<Gsap> => {
    if (gsapRef.current) return gsapRef.current;
    const gsap = await loadGsap();
    gsapRef.current = gsap;
    initialise(gsap);
    return gsap;
  }, [initialise]);

  // Re-apply the gsap baseline if config changes after gsap has loaded.
  // Before that, CSS already holds the correct first-paint state.
  useLayoutEffect(() => {
    const gsap = gsapRef.current;
    if (!gsap) return;
    const ctx = gsap.context(() => {
      initialise(gsap);
    });
    return () => ctx.revert();
  }, [initialise]);

  const buildOpenTimeline = useCallback((gsap: Gsap) => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
    );
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(itemEls, {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: { each: 0.1, from: 'start' },
      }, itemsStart);
      if (numberEls.length) {
        tl.to(numberEls, {
          duration: 0.6,
          ease: 'power2.out',
          '--sm-num-opacity': 1,
          stagger: { each: 0.08, from: 'start' },
        }, itemsStart + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(socialLinks, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' },
          onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' }),
        }, socialsStart + 0.04);
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback((gsap: Gsap) => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline(gsap);
    if (tl) {
      tl.eventCallback('onComplete', () => { busyRef.current = false; });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback((gsap: Gsap) => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'),
        );
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((gsap: Gsap, opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }, []);

  const animateColor = useCallback(
    (gsap: Gsap, opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  useEffect(() => {
    const gsap = gsapRef.current;
    const btn = toggleBtnRef.current;
    if (!gsap || !btn) return;
    if (changeMenuColorOnOpen) {
      const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
      gsap.set(btn, { color: targetColor });
    } else {
      gsap.set(btn, { color: menuButtonColor });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((gsap: Gsap, opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out',
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    void ensureGsap().then((gsap) => {
      if (target) {
        onMenuOpen?.();
        playOpen(gsap);
      } else {
        onMenuClose?.();
        playClose(gsap);
      }
      animateIcon(gsap, target);
      animateColor(gsap, target);
      animateText(gsap, target);
    });
  }, [
    ensureGsap,
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    void ensureGsap().then((gsap) => {
      onMenuClose?.();
      playClose(gsap);
      animateIcon(gsap, false);
      animateColor(gsap, false);
      animateText(gsap, false);
    });
  }, [ensureGsap, playClose, animateIcon, animateColor, animateText, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={
        (className ? className + ' ' : '') +
        'staggered-menu-wrapper' +
        (isFixed ? ' fixed-wrapper' : '')
      }
      style={
        accentColor
          ? ({ '--sm-accent': accentColor } as React.CSSProperties)
          : undefined
      }
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw =
            colors && colors.length
              ? colors.slice(0, 4)
              : ['#1e1e22', '#35353c'];
          const arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => (
            <div key={i} className="sm-prelayer" style={{ background: c }} />
          ));
        })()}
      </div>
      <header className="staggered-menu-header">
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-label="Main navigation"
        aria-hidden={!open}
        // aria-hidden alone leaves the links focusable, which is an
        // axe "aria-hidden-focus" violation and yields a malformed tree.
        inert={!open}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a
                    className="sm-panel-item"
                    href={it.link}
                    aria-label={it.ariaLabel}
                    data-index={idx + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      closeMenu();
                      setTimeout(() => router.push(it.link), 320);
                    }}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <p className="sm-socials-title">Socials</p>
              <ul className="sm-socials-list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default StaggeredMenu;
