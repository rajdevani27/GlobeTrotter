import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const [query, setQuery] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast(query ? `Searching for "${query}"` : "Type a destination to search");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-2 rounded-3xl bg-card/95 p-2 shadow-card backdrop-blur sm:flex-row sm:items-center sm:rounded-full"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, cities or activities..."
          className="w-full min-w-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <Button type="submit" variant="hero" size="lg" className="rounded-full">
        Search
      </Button>
    </form>
  );
}
