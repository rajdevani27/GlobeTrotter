"use client"

import { useEffect, useState } from "react"
import { Copy, Check, Link2, Mail, Share2, FileDown, Loader2, FileCheck2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal } from "./modal"
import { inputClass } from "./fields"
import { cn } from "@/lib/utils"

export function ShareDialog({
  open,
  onClose,
  destination,
}: {
  open: boolean
  onClose: () => void
  destination: string
}) {
  const [copied, setCopied] = useState(false)
  const slug = (destination || "trip").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  const link = `https://globetrotter.app/i/${slug || "trip"}-8f3a2`

  async function copy() {
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      /* clipboard may be blocked in sandbox */
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Share itinerary"
      description="Anyone with this link can view your trip plan."
    >
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Shareable link
      </label>
      <div className="mt-2 flex items-center gap-2">
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input readOnly value={link} className={cn(inputClass, "pl-9 pr-3")} />
        </div>
        <Button onClick={copy} className="h-11 shrink-0 px-4">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary">
          <Mail className="size-4" />
          Email
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary">
          <Share2 className="size-4" />
          More apps
        </button>
      </div>
    </Modal>
  )
}

export function ExportDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [stage, setStage] = useState<"idle" | "working" | "done">("idle")

  useEffect(() => {
    if (!open) {
      setStage("idle")
      return
    }
    setStage("working")
    const t = setTimeout(() => setStage("done"), 1600)
    return () => clearTimeout(t)
  }, [open])

  return (
    <Modal open={open} onClose={onClose} title="Export as PDF" description="Generating a printable copy of your itinerary.">
      <div className="flex flex-col items-center py-6 text-center">
        {stage === "done" ? (
          <>
            <span className="flex size-16 items-center justify-center rounded-2xl bg-accent text-primary">
              <FileCheck2 className="size-8" />
            </span>
            <p className="mt-4 font-display text-lg font-bold text-foreground">Your PDF is ready</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              GlobeTrotter-Itinerary.pdf has been prepared. In the live app this downloads instantly.
            </p>
            <Button className="mt-5 h-10 px-5" onClick={onClose}>
              <FileDown className="size-4" />
              Download PDF
            </Button>
          </>
        ) : (
          <>
            <span className="flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Loader2 className="size-8 animate-spin" />
            </span>
            <p className="mt-4 font-display text-lg font-bold text-foreground">Preparing your itinerary…</p>
            <p className="mt-1 text-sm text-muted-foreground">Laying out days, budget and map.</p>
          </>
        )}
      </div>
    </Modal>
  )
}
