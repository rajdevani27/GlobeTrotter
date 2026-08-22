import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, MapPin, Search, Star, Clock, Wallet, Compass, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cities, activities, trips, type City, type Activity } from "@/data/explore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Explore Destinations & Activities | GlobeTrotter" },
      {
        name: "description",
        content:
          "Search cities and activities, filter by budget, rating and duration, and add experiences to your GlobeTrotter trips.",
      },
      { property: "og:title", content: "Explore Destinations & Activities | GlobeTrotter" },
      {
        property: "og:description",
        content: "Discover destinations and experiences for your next adventure.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

const ANY = "any";

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
      <Star className="h-4 w-4 fill-accent text-accent" />
      {value.toFixed(1)}
    </span>
  );
}

function HeartButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "Remove from saved" : "Save"}
      aria-pressed={active}
      className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 shadow-sm backdrop-blur transition-colors hover:bg-card"
    >
      <Heart
        className={
          active ? "h-4 w-4 fill-destructive text-destructive" : "h-4 w-4 text-muted-foreground"
        }
      />
    </button>
  );
}

function ExplorePage() {
  const [tab, setTab] = useState<"cities" | "activities">("cities");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("recommended");
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  // city filters
  const [region, setRegion] = useState(ANY);
  const [country, setCountry] = useState(ANY);
  const [budget, setBudget] = useState(ANY);
  const [cityRating, setCityRating] = useState(ANY);

  // activity filters
  const [category, setCategory] = useState(ANY);
  const [price, setPrice] = useState(ANY);
  const [duration, setDuration] = useState(ANY);
  const [actRating, setActRating] = useState(ANY);

  const [detail, setDetail] = useState<City | null>(null);
  const [addTarget, setAddTarget] = useState<Activity | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<string>(trips[0]!);

  const toggleSave = (id: string) => setSaved((s) => ({ ...s, [id]: !s[id] }));

  const regions = useMemo(() => [...new Set(cities.map((c) => c.region))], []);
  const countries = useMemo(
    () =>
      [...new Set(cities.filter((c) => region === ANY || c.region === region).map((c) => c.country))],
    [region],
  );
  const categories = useMemo(() => [...new Set(activities.map((a) => a.category))], []);

  const resetAll = () => {
    setQuery("");
    setSort("recommended");
    setRegion(ANY);
    setCountry(ANY);
    setBudget(ANY);
    setCityRating(ANY);
    setCategory(ANY);
    setPrice(ANY);
    setDuration(ANY);
    setActRating(ANY);
  };

  const q = query.trim().toLowerCase();

  const cityResults = useMemo(() => {
    let list = cities.filter(
      (c) =>
        (!q ||
          c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)) &&
        (region === ANY || c.region === region) &&
        (country === ANY || c.country === country) &&
        (budget === ANY || c.budget === budget) &&
        (cityRating === ANY || c.rating >= Number(cityRating)),
    );
    list = [...list].sort((a, b) => {
      if (sort === "popular") return b.popularity - a.popularity;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "price") return a.costIndex - b.costIndex;
      return b.rating * 10 + b.popularity - (a.rating * 10 + a.popularity);
    });
    return list;
  }, [q, region, country, budget, cityRating, sort]);

  const activityResults = useMemo(() => {
    let list = activities.filter((a) => {
      const priceOk =
        price === ANY ||
        (price === "low" && a.cost < 50) ||
        (price === "mid" && a.cost >= 50 && a.cost <= 100) ||
        (price === "high" && a.cost > 100);
      const durOk =
        duration === ANY ||
        (duration === "short" && a.duration <= 2) ||
        (duration === "half" && a.duration > 2 && a.duration <= 5) ||
        (duration === "full" && a.duration > 5);
      return (
        (!q ||
          a.name.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)) &&
        (category === ANY || a.category === category) &&
        priceOk &&
        durOk &&
        (actRating === ANY || a.rating >= Number(actRating))
      );
    });
    list = [...list].sort((x, y) => {
      if (sort === "popular") return y.popularity - x.popularity;
      if (sort === "rating") return y.rating - x.rating;
      if (sort === "price") return x.cost - y.cost;
      return y.rating * 10 + y.popularity - (x.rating * 10 + x.popularity);
    });
    return list;
  }, [q, category, price, duration, actRating, sort]);

  const empty = tab === "cities" ? cityResults.length === 0 : activityResults.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Compass className="h-5 w-5 text-primary" />
            GlobeTrotter
          </div>
          <Button variant="secondary" size="sm">
            My Trips
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Explore
        </h1>
        <p className="mt-2 text-muted-foreground">
          Discover destinations and experiences for your next adventure.
        </p>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cities, destinations or activities..."
              className="h-14 rounded-2xl pl-12 text-base shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                <TabsTrigger value="cities">Cities</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={resetAll}>
                <RotateCcw className="mr-1 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tab === "cities" ? (
              <>
                <FilterSelect
                  value={region}
                  onChange={(v) => {
                    setRegion(v);
                    setCountry(ANY);
                  }}
                  label="Region"
                  options={regions}
                />
                <FilterSelect value={country} onChange={setCountry} label="Country" options={countries} />
                <FilterSelect
                  value={budget}
                  onChange={setBudget}
                  label="Budget"
                  options={["Budget", "Moderate", "Luxury"]}
                />
                <FilterSelect
                  value={cityRating}
                  onChange={setCityRating}
                  label="Rating"
                  options={[
                    { value: "4.5", label: "4.5+" },
                    { value: "4.7", label: "4.7+" },
                  ]}
                />
              </>
            ) : (
              <>
                <FilterSelect value={category} onChange={setCategory} label="Category" options={categories} />
                <FilterSelect
                  value={price}
                  onChange={setPrice}
                  label="Price"
                  options={[
                    { value: "low", label: "Under $50" },
                    { value: "mid", label: "$50 – $100" },
                    { value: "high", label: "Over $100" },
                  ]}
                />
                <FilterSelect
                  value={duration}
                  onChange={setDuration}
                  label="Duration"
                  options={[
                    { value: "short", label: "Up to 2h" },
                    { value: "half", label: "Half day" },
                    { value: "full", label: "Full day" },
                  ]}
                />
                <FilterSelect
                  value={actRating}
                  onChange={setActRating}
                  label="Rating"
                  options={[
                    { value: "4.5", label: "4.5+" },
                    { value: "4.7", label: "4.7+" },
                  ]}
                />
              </>
            )}
          </div>
        </div>

        {empty ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
            <Search className="mx-auto h-8 w-8 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">No results found</h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Try a different search term or clear your filters to see everything again.
            </p>
            <Button className="mt-5" onClick={resetAll}>
              Reset search & filters
            </Button>
          </div>
        ) : (
          <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tab === "cities"
              ? cityResults.map((c) => (
                  <Card key={c.id} className="overflow-hidden py-0 shadow-sm">
                    <div className="relative">
                      <img
                        src={c.image}
                        alt={`${c.name}, ${c.country}`}
                        loading="lazy"
                        className="h-44 w-full object-cover"
                      />
                      <HeartButton active={!!saved[c.id]} onClick={() => toggleSave(c.id)} />
                    </div>
                    <CardContent className="space-y-3 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{c.name}</h3>
                          <p className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" /> {c.country}
                          </p>
                        </div>
                        <Stars value={c.rating} />
                      </div>
                      <Badge variant="secondary">{c.budget}</Badge>
                      <p className="text-sm text-muted-foreground">{c.description}</p>
                      <Button className="w-full" onClick={() => setDetail(c)}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))
              : activityResults.map((a) => (
                  <Card key={a.id} className="overflow-hidden py-0 shadow-sm">
                    <div className="relative">
                      <img
                        src={a.image}
                        alt={a.name}
                        loading="lazy"
                        className="h-44 w-full object-cover"
                      />
                      <HeartButton active={!!saved[a.id]} onClick={() => toggleSave(a.id)} />
                    </div>
                    <CardContent className="space-y-3 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{a.name}</h3>
                          <p className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" /> {a.city}
                          </p>
                        </div>
                        <Stars value={a.rating} />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary">{a.category}</Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {a.duration}h
                        </span>
                        <span className="flex items-center gap-1">
                          <Wallet className="h-3.5 w-3.5" /> ${a.cost}
                        </span>
                      </div>
                      <Button className="w-full" onClick={() => setAddTarget(a)}>
                        Add to Trip
                      </Button>
                    </CardContent>
                  </Card>
                ))}
          </section>
        )}
      </main>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent>
          {detail && (
            <>
              <img
                src={detail.image}
                alt={detail.name}
                className="h-44 w-full rounded-xl object-cover"
              />
              <DialogHeader>
                <DialogTitle>
                  {detail.name}, {detail.country}
                </DialogTitle>
                <DialogDescription>{detail.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Stars value={detail.rating} />
                <Badge variant="secondary">{detail.budget}</Badge>
                <span>{detail.region}</span>
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setDetail(null)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!addTarget} onOpenChange={(o) => !o && setAddTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Trip</DialogTitle>
            <DialogDescription>
              Choose a trip for “{addTarget?.name}”.
            </DialogDescription>
          </DialogHeader>
          <RadioGroup value={selectedTrip} onValueChange={setSelectedTrip} className="gap-3">
            {trips.map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <RadioGroupItem value={t} id={t} />
                <Label htmlFor={t} className="cursor-pointer">
                  {t}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAddTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setAddTarget(null);
                toast.success("Activity added to your trip.");
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: (string | { value: string; label: string })[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ANY}>{`All ${label}s`}</SelectItem>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value;
          const l = typeof o === "string" ? o : o.label;
          return (
            <SelectItem key={v} value={v}>
              {l}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
