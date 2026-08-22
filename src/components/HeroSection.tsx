import { Compass, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { SearchBar } from "@/components/SearchBar";
import heroImage from "@/assets/hero-travel.jpg";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={heroImage}
          alt="Coastal cliffs and winding road at golden hour"
          width={1920}
          height={1080}
          className="h-[440px] w-full object-cover sm:h-[520px]"
        />
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="absolute inset-0 flex flex-col justify-center gap-6 p-6 sm:p-10 lg:p-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground">
              <Compass className="size-3.5" /> Your next trip starts here
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-background sm:text-5xl lg:text-6xl">
              Plan your next adventure.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-background/85 sm:text-base">
              Discover places, organize your itinerary and make every trip memorable.
            </p>
          </div>

          <div className="max-w-3xl">
            <SearchBar />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="brand" size="lg" className="w-full rounded-full sm:w-auto">
              <Link to="/$feature" params={{ feature: "create" }}>
                <Plus /> Plan New Trip
              </Link>
            </Button>
            <Button asChild variant="heroGhost" size="lg" className="w-full rounded-full sm:w-auto">
              <Link to="/explore">
                <Compass /> Explore Destinations
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
