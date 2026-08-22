"use client";
/** @jsx React.createElement */

import React, { useState, useMemo } from "react";
import { ArrowRight, CalendarDays, MapPin, Type, Users } from 'lucide-react';
import { Badge } from '@/components/gt/badge';
import { Button } from '@/components/gt/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/gt/card';
import { Field, Input, Select } from '@/components/gt/field';
import { Stat, StatGrid } from '@/components/gt/stat';

// 1. Define a static, complete list of countries outside the component
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

export function TripForm() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [travellers, setTravellers] = useState('2');
  const [submitted, setSubmitted] = useState(false);

  // Notice: The useEffect and countries state have been completely removed!

  const nights = useMemo(() => {
    if (!start || !end) return null;
    const diff =
      (new Date(end).getTime() - new Date(start).getTime()) / 86_400_000;
    return Number.isFinite(diff) ? Math.round(diff) : null;
  }, [start, end]);

  const invalidRange = nights !== null && nights < 0;
  const canSubmit = Boolean(name && place && start && end) && !invalidRange;
  const cities = place ? 1 : 0;

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <div className="grid gap-1">
          <CardTitle id="plan-heading">Plan a new trip</CardTitle>
          <CardDescription>
            Set the essentials — you can add stops and bookings later.
          </CardDescription>
        </div>
        
        <Badge tone="blue">Step 1 of 3</Badge>
      </CardHeader>

      <form
        aria-labelledby="plan-heading"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSubmit) setSubmitted(true);
        }}
      >
        <CardContent className="grid gap-5 pt-5 sm:pt-6">
          <Field
            id="trip-name"
            label="Trip Name"
            icon={<Type />}
          >
            <Input
              id="trip-name"
              name="tripName"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="European Adventure"
              required
            />
          </Field>

          <Field
            id="place"
            label="Select a Place"
            icon={<MapPin />}
            hint="Start typing a city or country to see matches."
          >
            <Input
              id="place"
              name="place"
              list="destination-options"
              value={place}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPlace(e.target.value)
              }
              placeholder="Start typing a country..."
              required
            />
            {/* 2. Directly map over the static COUNTRIES array */}
            <datalist id="destination-options">
              {COUNTRIES.map((country) => (
                <option key={country} value={country} />
              ))}
            </datalist>
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="start-date" label="Start Date" icon={<CalendarDays />}>
              <Input
                id="start-date"
                name="startDate"
                type="date"
                value={start}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStart(e.target.value)
                }
                required
              />
            </Field>

            <Field
              id="end-date"
              label="End Date"
              icon={<CalendarDays />}
              error={
                invalidRange
                  ? 'Your end date falls before the start date.'
                  : undefined
              }
            >
              <Input
                id="end-date"
                name="endDate"
                type="date"
                min={start || undefined}
                value={end}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEnd(e.target.value)
                }
                aria-invalid={invalidRange}
                aria-describedby={invalidRange ? 'end-date-error' : undefined}
                required
              />
            </Field>
          </div>

          <Field id="travellers" label="Travellers" icon={<Users />}>
            <Select
              id="travellers"
              name="travellers"
              value={travellers}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setTravellers(e.target.value)
              }
            >
              {['1', '2', '3', '4', '5+'].map((value) => (
                <option key={value} value={value}>
                  {value} {value === '1' ? 'traveller' : 'travellers'}
                </option>
              ))}
            </Select>
          </Field>

          <StatGrid className="sm:grid-cols-3">
            <Stat
              label="Days"
              value={nights !== null && nights >= 0 ? nights + 1 : '—'}
            />
            <Stat label="Cities" value={cities || '—'} />
            <Stat label="Travellers" value={travellers} />
          </StatGrid>
        </CardContent>

        <CardFooter>
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {submitted ? (
              <span className="font-semibold text-success-foreground">
                Trip created — added to My Trips.
              </span>
            ) : nights !== null && nights >= 0 ? (
              <>
                <span className="font-semibold text-foreground">
                  {nights} {nights === 1 ? 'night' : 'nights'}
                </span>{' '}
                · {travellers} travelling
              </>
            ) : (
              'Pick your dates to see trip length.'
            )}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="secondary">Save Draft</Button>
            <Button type="submit" disabled={!canSubmit}>
              Create Trip
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}