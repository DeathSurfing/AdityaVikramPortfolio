import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * One section of the page. The label rail is sticky on desktop and becomes a
 * compact header on mobile. The visible label drops the old `//` prefix, while
 * the heading text keeps it for assistive technology and the document outline.
 */
export function Section({ id, label, children, className }: SectionProps) {
  const visible = label.replace(/^\/\/\s*/, '');
  const prefixed = visible !== label;

  return (
    <section id={id} className={`section${className ? ` ${className}` : ''}`}>
      <div className="section-rail">
        <h2 className="section-label">
          {prefixed && <span className="sr-only">{"// "}</span>}
          {visible}
        </h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
