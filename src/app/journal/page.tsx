"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface JournalEntry {
  id: string;
  entryTitle: string;
  entryDate: string;
  medicationsTaken?: string;
  symptomsHad?: string;
  sleep?: number;
  otherNotes?: string;
}

const JournalEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState({ entryTitle: "", otherNotes: "" });
  const [open, setOpen] = useState(false);

  // Fetch journal entries for the current user
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/(api)/api/journal-entries");
        if (!response.ok) throw new Error("Failed to fetch journal entries.");
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEntries();
  }, []);

  // Handle form submission
  const handleAddEntry = async () => {
    try {
      const response = await fetch("/api/journal-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) throw new Error("Failed to add entry.");

      const addedEntry = await response.json();
      setEntries([...entries, addedEntry]); // Update UI
      setNewEntry({ entryTitle: "", otherNotes: "" }); // Clear input
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Journal Entries</h1>

      {/* Add Journal Entry Button */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="solid">Add New Entry</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <Label>Title</Label>
            <Input
              value={newEntry.entryTitle}
              onChange={(e) => setNewEntry({ ...newEntry, entryTitle: e.target.value })}
              placeholder="Entry Title"
            />
            <Label>Notes</Label>
            <Input
              value={newEntry.otherNotes}
              onChange={(e) => setNewEntry({ ...newEntry, otherNotes: e.target.value })}
              placeholder="Additional Notes"
            />
            <Button onClick={handleAddEntry}>Save Entry</Button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Display Journal Entries */}
      <div className="space-y-4">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>{entry.entryTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{new Date(entry.entryDate).toDateString()}</p>
                {entry.otherNotes && <p className="mt-2">{entry.otherNotes}</p>}
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No journal entries found.</p>
        )}
      </div>
    </div>
  );
};

export default JournalEntries;
