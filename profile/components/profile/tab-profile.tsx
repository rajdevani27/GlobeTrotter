"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { BadgeCheck, Camera, Pencil, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, Section } from "@/components/profile/controls"
import { initialProfile } from "@/lib/profile-data"

export function TabProfile() {
  const [profile, setProfile] = useState(initialProfile)
  const [avatar, setAvatar] = useState(initialProfile.avatar)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({})
  const fileRef = useRef<HTMLInputElement>(null)

  function update(key: keyof typeof profile, value: string) {
    setProfile((p) => ({ ...p, [key]: value }))
    setSaved(false)
  }

  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setAvatar(URL.createObjectURL(file))
      setSaved(false)
    }
  }

  function validate() {
    const next: typeof errors = {}
    if (!profile.fullName.trim()) next.fullName = "Full name is required."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) next.email = "Enter a valid email address."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onSave() {
    if (!validate()) return
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <Section
      title="Basic Profile"
      description="Update your personal details and profile photo."
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <div className="size-24 overflow-hidden rounded-full border border-border bg-muted shadow-sm">
            <Image
              src={avatar || "/placeholder.svg"}
              alt="Profile photo"
              width={96}
              height={96}
              priority
              className="size-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Change profile photo"
            className="absolute -bottom-1 -right-1 grid size-8 place-items-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105"
          >
            <Camera className="size-4" />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={onPickImage} />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">{profile.fullName}</p>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => fileRef.current?.click()}>
            <Camera className="size-4" />
            Upload new photo
          </Button>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          value={profile.fullName}
          disabled={!editing}
          onChange={(v) => update("fullName", v)}
          error={errors.fullName}
        />
        <div className="flex flex-col gap-1.5">
          <Field
            label="Email"
            type="email"
            value={profile.email}
            disabled={!editing}
            onChange={(v) => update("email", v)}
            error={errors.email}
          />
          {profile.emailVerified ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              <BadgeCheck className="size-3.5" /> Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-destructive">
              <TriangleAlert className="size-3.5" /> Not verified
            </span>
          )}
        </div>
        <Field
          label="Phone Number"
          type="tel"
          value={profile.phone}
          disabled={!editing}
          onChange={(v) => update("phone", v)}
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-border pt-5">
        {!editing ? (
          <Button variant="outline" onClick={() => setEditing(true)}>
            <Pencil className="size-4" />
            Edit Profile
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        )}
        <Button onClick={onSave} disabled={!editing}>
          Save Changes
        </Button>
        {saved ? (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            <BadgeCheck className="size-4" /> Saved
          </span>
        ) : null}
      </div>
    </Section>
  )
}
