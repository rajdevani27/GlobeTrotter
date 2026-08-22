import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "./modal";
import { Field, inputClass } from "./fields";
import {
  CATEGORIES,
  makeId,
  type Activity,
  type Category,
  type TravelMode,
} from "@/lib/itinerary-data";

interface ActivityDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (activity: Activity) => void;
  editing: Activity | null;
  numDays: number;
  defaultDay: number;
}

const EMPTY = {
  time: "10:00",
  name: "",
  category: "Sightseeing" as Category,
  location: "",
  duration: "1 hr",
  travelTime: "15 min",
  travelMode: "car" as TravelMode,
  estimatedCost: 0,
};

export function ActivityDialog({
  open,
  onClose,
  onSave,
  editing,
  numDays,
  defaultDay,
}: ActivityDialogProps) {
  const [day, setDay] = useState(defaultDay);
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setDay(editing.day);
      setForm({
        time: editing.time,
        name: editing.name,
        category: editing.category,
        location: editing.location,
        duration: editing.duration,
        travelTime: editing.travelTime,
        travelMode: editing.travelMode,
        estimatedCost: editing.estimatedCost,
      });
    } else {
      setDay(defaultDay);
      setForm(EMPTY);
    }
  }, [open, editing, defaultDay]);

  function handleSave() {
    if (!form.name.trim()) return;
    onSave({
      id: editing?.id ?? makeId(),
      day,
      ...form,
    });
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? "Edit activity" : "Add activity"}
      description={
        editing ? "Update the details of this stop." : "Add a new stop to your itinerary."
      }
      footer={
        <>
          <Button variant="outline" size="lg" className="h-10" onClick={onClose}>
            Cancel
          </Button>
          <Button size="lg" className="h-10" onClick={handleSave} disabled={!form.name.trim()}>
            {editing ? "Save changes" : "Add activity"}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Activity name" htmlFor="a-name" className="sm:col-span-2">
          <input
            id="a-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Eiffel Tower Visit"
            className={inputClass}
          />
        </Field>

        <Field label="Day" htmlFor="a-day">
          <select
            id="a-day"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className={inputClass}
          >
            {Array.from({ length: numDays }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Time" htmlFor="a-time">
          <input
            id="a-time"
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field label="Location" htmlFor="a-location" className="sm:col-span-2">
          <input
            id="a-location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Champ de Mars, Paris"
            className={inputClass}
          />
        </Field>

        <Field label="Category" htmlFor="a-category">
          <select
            id="a-category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Duration" htmlFor="a-duration">
          <input
            id="a-duration"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            placeholder="e.g. 2 hrs"
            className={inputClass}
          />
        </Field>

        <Field label="Travel time" htmlFor="a-travel">
          <input
            id="a-travel"
            value={form.travelTime}
            onChange={(e) => setForm({ ...form, travelTime: e.target.value })}
            placeholder="e.g. 25 min"
            className={inputClass}
          />
        </Field>

        <Field label="Travel mode" htmlFor="a-mode">
          <select
            id="a-mode"
            value={form.travelMode}
            onChange={(e) => setForm({ ...form, travelMode: e.target.value as TravelMode })}
            className={inputClass}
          >
            <option value="car">Car</option>
            <option value="walk">Walk</option>
            <option value="metro">Metro</option>
            <option value="flight">Flight</option>
          </select>
        </Field>

        <Field label="Estimated cost (₹)" htmlFor="a-cost" className="sm:col-span-2">
          <input
            id="a-cost"
            type="number"
            min={0}
            step={100}
            value={form.estimatedCost}
            onChange={(e) =>
              setForm({ ...form, estimatedCost: Math.max(0, Number(e.target.value) || 0) })
            }
            className={inputClass}
          />
        </Field>
      </div>
    </Modal>
  );
}
