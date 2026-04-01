import React from "react";

// Strip trailing emojis from titles so screens don't need to be edited individually
function stripEmoji(text: string): string {
  return text.replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA9F}]|[⬆⬆]/gu, "").trim();
}

// ─── ScreenHeader ─────────────────────────────────────────────────────────
interface ScreenHeaderProps {
  moduleId: number;
  label: string;
  title: string;
  subtitle?: string;
  moduleColor?: string;
}

export function ScreenHeader({ label, title, subtitle }: ScreenHeaderProps) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#9CA3AF" }}>
        {label}
      </p>
      <h1 className="text-2xl font-bold mb-2" style={{ color: "#111827", lineHeight: "1.3" }}>
        {stripEmoji(title)}
      </h1>
      {subtitle && (
        <p className="text-sm" style={{ color: "#6B7280", lineHeight: "1.6" }}>
          {stripEmoji(subtitle)}
        </p>
      )}
    </div>
  );
}

// ─── TypeBadge ─────────────────────────────────────────────────────────────
interface TypeBadgeProps {
  label: string;
  color?: string;
  filled?: boolean;
}

export function TypeBadge({ label, filled = false }: TypeBadgeProps) {
  return (
    <span
      className="px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wide"
      style={
        filled
          ? { backgroundColor: "#111827", color: "#FFFFFF" }
          : { backgroundColor: "#F3F4F6", color: "#374151", border: "1px solid #E5E7EB" }
      }>
      {label}
    </span>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────
// Clean white card used as a base everywhere
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-white ${className}`} style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      {children}
    </div>
  );
}

// ─── PowerBICallout ─────────────────────────────────────────────────────────
interface PowerBICalloutProps {
  title?: string;
  items: string[];
}

export function PowerBICallout({ title = "In Power BI, this looks like…", items }: PowerBICalloutProps) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}>
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#9CA3AF" }}>
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="text-xs px-3 py-1 rounded-md font-medium"
            style={{ backgroundColor: "#FFFFFF", color: "#374151", border: "1px solid #E5E7EB" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── ConceptCard ────────────────────────────────────────────────────────────
interface ConceptCardProps {
  icon: string;
  title: string;
  body: string;
  color?: string;
  tag?: string;
  onClick?: () => void;
  selected?: boolean;
}

export function ConceptCard({ icon, title, body, tag, onClick, selected }: ConceptCardProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`flex items-start gap-4 p-4 rounded-xl text-left w-full transition-all ${onClick ? "cursor-pointer" : ""}`}
      style={{
        backgroundColor: "#FFFFFF",
        border: selected ? "1.5px solid #2563EB" : "1px solid #E5E7EB",
        boxShadow: selected ? "0 0 0 3px rgba(37,99,235,0.08)" : "0 1px 3px rgba(0,0,0,0.05)",
      }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
        style={{ backgroundColor: "#F3F4F6" }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm" style={{ color: "#111827" }}>{title}</span>
          {tag && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded"
              style={{ backgroundColor: "#EFF6FF", color: "#2563EB" }}>
              {tag}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{body}</p>
      </div>
    </Tag>
  );
}

// ─── ModuleComplete ──────────────────────────────────────────────────────────
interface ModuleCompleteProps {
  moduleId: number;
  title: string;
  topics: string[];
  nextModuleId: number;
  nextModuleTitle: string;
  nextModuleIcon: string;
  nextModuleColor?: string;
  flavorEmoji?: string;
  flavorLabel: string;
}

export function ModuleComplete({ moduleId, title, topics, nextModuleId, nextModuleTitle, nextModuleIcon, flavorLabel }: ModuleCompleteProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl p-6 bg-white" style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#9CA3AF" }}>Module {moduleId} complete</p>
        <h2 className="text-xl font-bold mb-4" style={{ color: "#111827" }}>{title}</h2>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <span key={t} className="text-xs px-3 py-1 rounded-md font-medium"
              style={{ backgroundColor: "#F3F4F6", color: "#374151", border: "1px solid #E5E7EB" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-4 bg-white flex items-center gap-4" style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: "#F3F4F6" }}>
          {nextModuleIcon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#9CA3AF" }}>
            Up next — Module {nextModuleId}
          </p>
          <p className="font-semibold text-sm" style={{ color: "#111827" }}>{nextModuleTitle}</p>
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{flavorLabel} data throughout</p>
        </div>
      </div>
    </div>
  );
}

// ─── FlavorExample ──────────────────────────────────────────────────────────
interface FlavorExampleProps {
  flavorEmoji?: string;
  flavorLabel: string;
  title: string;
  children: React.ReactNode;
  color?: string;
}

export function FlavorExample({ flavorEmoji, flavorLabel, title, children }: FlavorExampleProps) {
  return (
    <div className="rounded-xl p-5 mb-5 bg-white" style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center gap-3 mb-4">
        
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>{flavorLabel} example</p>
          <p className="font-semibold text-sm" style={{ color: "#111827" }}>{title}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── CodeBlock ──────────────────────────────────────────────────────────────
interface CodeBlockProps {
  code: string;
  label?: string;
  color?: string;
}

export function CodeBlock({ code, label }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #2D2D3A" }}>
      {label && (
        <div className="px-4 py-2 text-xs font-medium" style={{ backgroundColor: "#1E1E2E", color: "#6B7280", borderBottom: "1px solid #2D2D3A" }}>
          {label}
        </div>
      )}
      <pre className="px-4 py-3.5 text-sm leading-relaxed overflow-x-auto font-mono" style={{ backgroundColor: "#1A1B26", color: "#C0CAF5" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── ScreenshotNote ──────────────────────────────────────────────────────────
export function ScreenshotNote({ flavorLabel, hint }: { flavorLabel: string; hint: string }) {
  return (
    <div className="flex items-start gap-2 mt-2 mb-1 px-3 py-2 rounded-xl"
      style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A" }}>
      <span className="text-xs flex-shrink-0" style={{ color: "#92400E" }}>&#128248;</span>
      <p className="text-xs leading-snug" style={{ color: "#92400E" }}>
        <strong>Generic screenshot</strong> &middot; In your <strong>{flavorLabel}</strong> dataset, {hint}
      </p>
    </div>
  );
}

