"use client";

import { useId, useState, type FormEvent } from "react";
import { Send } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";

/**
 * Drafts an email in the visitor's own mail client via a `mailto:` link.
 * Keeps the site backend-free — no form service, no stored messages.
 */
export function ContactComposer({ email }: { email: string }) {
  const id = useId();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = name ? `${message}\n\n— ${name}` : message;
    const params = new URLSearchParams({ subject: subject || `Hello from ${name || "your portfolio"}`, body });
    // URLSearchParams encodes spaces as "+", which some mail clients show literally.
    window.location.href = `mailto:${email}?${params.toString().replace(/\+/g, "%20")}`;
  }

  const field =
    "w-full rounded-xl border border-line bg-base-2/70 px-4 py-3 text-fg placeholder:text-muted/70 transition-colors " +
    "hover:border-line-strong focus:border-primary-soft focus:outline-none focus:ring-3 focus:ring-primary/25";

  return (
    <form onSubmit={onSubmit} className="grid gap-4" aria-describedby={`${id}-note`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`${id}-name`} className="text-sm text-fg-2">
            Your name
          </label>
          <input id={`${id}-name`} name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-subject`} className="text-sm text-fg-2">
            Subject
          </label>
          <input id={`${id}-subject`} name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={field} />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-message`} className="text-sm text-fg-2">
          Message <span className="text-accent-soft">*</span>
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} resize-y`}
        />
      </div>
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="text-xs leading-relaxed text-muted">
          Opens your email app with the message ready to send.
        </p>
        <button type="submit" className={buttonClasses({ className: "w-full sm:w-auto" })}>
          <Send size={16} />
          Compose email
        </button>
      </div>
    </form>
  );
}
