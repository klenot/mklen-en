"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { trackEvent } from "@/lib/mixpanel";

const AREA_OPTIONS = [
  { value: "ai", label: "AI" },
  { value: "applications", label: "Applications" },
  { value: "business", label: "Business" },
  { value: "dev", label: "Dev" },
  { value: "events", label: "Events" },
  { value: "marketing", label: "Marketing" },
  { value: "startup", label: "Startup" },
  { value: "websites", label: "Websites" },
] as const;

type AreaValue = (typeof AREA_OPTIONS)[number]["value"];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  industry: string;
  helpWith: string;
  area: AreaValue | "";
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  industry: "",
  helpWith: "",
  area: "",
};

const PANEL_TRANSITION = { duration: 0.42, ease: [0.32, 0.72, 0, 1] as const };

function AreaSelect({
  value,
  onChange,
  disabled,
  tabIndex = 0,
}: {
  value: AreaValue | "";
  onChange: (value: AreaValue) => void;
  disabled?: boolean;
  tabIndex?: number;
}) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selectedLabel =
    AREA_OPTIONS.find((option) => option.value === value)?.label ?? null;

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name="area" value={value} required={!disabled} tabIndex={-1} />

      <button
        type="button"
        tabIndex={tabIndex}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        data-open={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="form-input form-select-trigger"
      >
        <span className={selectedLabel ? undefined : "form-select-placeholder"}>
          {selectedLabel ?? "Select an area..."}
        </span>
        <svg
          aria-hidden
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className="form-select-chevron"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul id={listboxId} role="listbox" aria-label="Area" className="form-select-menu">
          {AREA_OPTIONS.map((option) => (
            <li key={option.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={value === option.value}
                data-selected={value === option.value}
                className="form-select-option"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type ProBonoModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ProBonoModal({ open, onClose }: ProBonoModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleClose = useCallback(() => {
    if (status === "submitting") return;
    onClose();
  }, [onClose, status]);

  useEffect(() => {
    panelRef.current?.getBoundingClientRect();
  }, []);

  useEffect(() => {
    if (!open) return;

    trackEvent("pro_bono_form_opened");
    setStatus("idle");
    setErrorMessage("");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("input, textarea, select")?.focus();
    }, 320);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/pro-bono", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      trackEvent("pro_bono_form_submitted", { area: form.area, industry: form.industry });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal={open}
      aria-hidden={!open}
      aria-labelledby={titleId}
      inert={!open ? true : undefined}
      initial={false}
      animate={{ x: open ? "0%" : "100%" }}
      transition={PANEL_TRANSITION}
      onAnimationComplete={() => {
        if (!open) {
          setForm(EMPTY_FORM);
          setStatus("idle");
          setErrorMessage("");
        }
      }}
      className={`fixed inset-0 z-100 flex flex-col bg-white will-change-transform ${
        open ? "" : "pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close pro bono form"
        tabIndex={open ? 0 : -1}
        className="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center font-mono text-2xl leading-none text-black/50 transition-colors hover:text-black md:right-6 md:top-6"
      >
        ×
      </button>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-10 pt-16 md:px-8 md:pb-16 md:pt-20">
        <div className="mx-auto flex w-full max-w-[640px] flex-col gap-8">
          <header className="flex flex-col gap-3">
            <h2 id={titleId} className="font-mono text-3xl font-bold text-black md:text-4xl">
              Pro bono
            </h2>
            <p className="font-mono text-sm font-light leading-relaxed text-black/60">
              Share a project you&apos;d like help with. I review pro bono requests when
              capacity allows.
            </p>
          </header>

          {status === "success" ? (
            <div className="flex flex-col gap-4 py-8">
              <p className="font-mono text-base text-black">Thanks — your request is in.</p>
              <p className="font-mono text-sm font-light text-black/60">
                I&apos;ll get back to you if it&apos;s a fit.
              </p>
              <button
                type="button"
                onClick={handleClose}
                tabIndex={open ? 0 : -1}
                className="mt-4 w-fit font-mono text-sm text-black underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="form-label">Name</span>
                  <input
                    type="text"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    tabIndex={open ? 0 : -1}
                    value={form.firstName}
                    onChange={(event) => updateField("firstName", event.target.value)}
                    placeholder="Jane"
                    className="form-input"
                  />
                </label>

                <label className="block">
                  <span className="form-label">Surname</span>
                  <input
                    type="text"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    tabIndex={open ? 0 : -1}
                    value={form.lastName}
                    onChange={(event) => updateField("lastName", event.target.value)}
                    placeholder="Doe"
                    className="form-input"
                  />
                </label>
              </div>

              <label className="block">
                <span className="form-label">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  tabIndex={open ? 0 : -1}
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="jane@example.com"
                  className="form-input"
                />
              </label>

              <label className="block">
                <span className="form-label">Industry</span>
                <input
                  type="text"
                  name="industry"
                  required
                  tabIndex={open ? 0 : -1}
                  value={form.industry}
                  onChange={(event) => updateField("industry", event.target.value)}
                  placeholder="Non-profit, education, climate..."
                  className="form-input"
                />
              </label>

              <div className="block">
                <span className="form-label">Area</span>
                <AreaSelect
                  value={form.area}
                  onChange={(value) => updateField("area", value)}
                  disabled={!open}
                  tabIndex={open ? 0 : -1}
                />
              </div>

              <label className="block">
                <span className="form-label">What I need help with</span>
                <textarea
                  name="helpWith"
                  required
                  rows={5}
                  tabIndex={open ? 0 : -1}
                  value={form.helpWith}
                  onChange={(event) => updateField("helpWith", event.target.value)}
                  placeholder="Describe the project, goals, and where you're stuck..."
                  className="form-input form-textarea"
                />
              </label>

              {status === "error" && errorMessage ? (
                <p className="font-mono text-sm text-red-600" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <div className="relative mt-2 w-fit">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 translate-x-px translate-y-[4px] rounded-full border-2 border-black"
                  style={{
                    background: "linear-gradient(to right, #0082FF, #110058)",
                  }}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  tabIndex={open ? 0 : -1}
                  className={`relative cursor-pointer rounded-full bg-black px-5 py-2.5 font-mono text-xs text-white transition-transform duration-150 ease-out disabled:cursor-not-allowed disabled:opacity-60 ${
                    status === "submitting"
                      ? "translate-x-[2px] translate-y-[4px]"
                      : "hover:translate-x-[2px] hover:translate-y-[4px] active:translate-x-[2px] active:translate-y-[4px]"
                  }`}
                >
                  {status === "submitting" ? "Sending..." : "Send request"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
