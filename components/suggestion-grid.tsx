'use client'

import { Check, Clock, Compass, MapPin, Plus, Star } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/gt/badge'
import { Button } from '@/components/gt/button'
import { Card } from '@/components/gt/card'
import { SearchInput } from '@/components/gt/field'
import { CardMedia } from '@/components/gt/media'
import { SectionHeader } from '@/components/gt/page-header'
import { EmptyState } from '@/components/gt/states'
import { suggestions } from '@/lib/suggestions'

const filters = ['All', 'Place', 'Activity'] as const
const filterLabels: Record<(typeof filters)[number], string> = {
  All: 'All',
  Place: 'Places',
  Activity: 'Activities',
}

export function SuggestionGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [query, setQuery] = useState('')
  const [added, setAdded] = useState<string[]>([])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return suggestions.filter((item) => {
      const matchesKind = filter === 'All' || item.kind === filter
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q)
      return matchesKind && matchesQuery
    })
  }, [filter, query])

  function toggle(id: string) {
    setAdded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  return (
    <section aria-labelledby="suggestions-heading" className="grid gap-5">
      <SectionHeader
        id="suggestions-heading"
        title="Suggestions for places to visit"
        description="Places and activities travellers loved on similar itineraries."
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, cities or activities..."
          aria-label="Search suggestions"
          containerClassName="sm:max-w-sm sm:flex-1"
        />
        <div
          role="tablist"
          aria-label="Filter suggestions"
          className="flex gap-1 self-start rounded-full border border-border bg-card p-1"
        >
          {filters.map((option) => (
            <button
              key={option}
              role="tab"
              type="button"
              aria-selected={filter === option}
              onClick={() => setFilter(option)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                filter === option
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-soft hover:text-foreground'
              }`}
            >
              {filterLabels[option]}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={<Compass />}
          title="No matches yet"
          description="Try a different search term or switch filters to see more places and activities."
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery('')
                setFilter('All')
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => {
            const isAdded = added.includes(item.id)
            return (
              <li key={item.id}>
                <Card interactive className="group h-full overflow-hidden">
                  <CardMedia
                    src={item.image}
                    alt={`${item.name} in ${item.region}`}
                    icon={item.kind === 'Activity' ? <Compass /> : <MapPin />}
                    label={item.kind === 'Activity' ? 'Activity' : 'Place'}
                  >
                    <Badge tone="overlay" size="sm" className="absolute left-3 top-3">
                      {item.tag}
                    </Badge>
                  </CardMedia>

                  <div className="grid gap-3 p-4">
                    <div className="grid gap-1">
                      <h3 className="text-[15px] font-bold leading-snug text-pretty text-foreground">
                        {item.name}
                      </h3>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {item.region}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-soft px-3 py-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                        <Star
                          className="size-3.5 fill-highlight text-highlight"
                          aria-hidden="true"
                        />
                        {item.rating}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" aria-hidden="true" />
                        {item.duration}
                      </span>
                      <span className="ml-auto font-bold text-foreground">
                        {item.price}
                      </span>
                    </div>

                    <Button
                      variant={isAdded ? 'secondary' : 'primary'}
                      size="sm"
                      block
                      aria-pressed={isAdded}
                      onClick={() => toggle(item.id)}
                    >
                      {isAdded ? (
                        <>
                          <Check className="size-4" aria-hidden="true" />
                          Added to trip
                        </>
                      ) : (
                        <>
                          <Plus className="size-4" aria-hidden="true" />
                          Add Activity
                        </>
                      )}
                      <span className="sr-only"> — {item.name}</span>
                    </Button>
                  </div>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
