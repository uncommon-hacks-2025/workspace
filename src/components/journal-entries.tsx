"use client";

import { useEffect, useState } from "react";

// import { User } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Entry = {
    id: string;
    entryTitle: string;
    entryDate: string;
    medicationsTaken?: string;
    symptomsHad?: string;
    sleep?: number;
    otherNotes?: string;
    userId?: string;
};

export default function JournalEntries() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [entryTitle, setEntryTitle] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [medicationsTaken, setMedicationsTaken] = useState("");
    const [symptomsHad, setSymptomsHad] = useState("");
    const [sleep, setSleep] = useState("");
    const [otherNotes, setOtherNotes] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch journal entries
    useEffect(() => {
        fetch("/api/journal-entries")
            .then((res) => res.json())
            .then((data) => setEntries(data))
            .catch((error) => console.error("Error fetching entries:", error));
    }, []);

    // Handle adding a new entry
    const handleAddEntry = async () => {
        if (!entryTitle || !entryDate) return alert("Title and Date are required.");
    
        setLoading(true);
        try {
            // Get current user information (this is an example, modify as needed)
            const currentUser = { id: "user-id" }; // Replace this with your actual current user fetching logic.
    
            // Validate and format sleep value to one decimal place
            const parsedSleep = sleep ? parseFloat(sleep) : 0.0;
            const sleepValue = isNaN(parsedSleep) || parsedSleep < 0 ? null : parsedSleep.toFixed(1);
    
            const res = await fetch("/api/journal-entries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    entryTitle,
                    entryDate,
                    medicationsTaken: medicationsTaken || null,
                    symptomsHad: symptomsHad || null,
                    sleep: sleepValue, // Ensure sleep is correctly formatted
                    otherNotes: otherNotes || null,
                    userId: currentUser.id // Include the current user's ID here
                })
            });
    
            if (!res.ok) throw new Error("Failed to add entry");
    
            const newEntry = await res.json();
            setEntries([newEntry, ...entries]); // Update UI
            setEntryTitle("");
            setEntryDate("");
            setMedicationsTaken("");
            setSymptomsHad("");
            setSleep("");
            setOtherNotes("");
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    

    return (
        <div className="w-full p-4 bg-white rounded-md">
            <h2 className="text-2xl font-bold mb-4">My Journal</h2>

            {/* Add New Entry Form */}
            <div className="mb-4">
                <Input
                type="text"
                placeholder="Title"
                value={entryTitle}
                onChange={(e) => setEntryTitle(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                />

                <Input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                />
                <Input
                 type="text"
                 placeholder="Medications Taken (Optional)"
                 value={medicationsTaken}
                 onChange={(e) => setMedicationsTaken(e.target.value)}
                 className="w-full p-2 border rounded mb-2"
                />
                <Input
                type="text"
                placeholder="Any Symptoms Experienced (Optional)"
                
                value={symptomsHad}
                onChange={(e) => setSymptomsHad(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                />

                <Input
                type="number"
                step="0.1"
                placeholder="Hours of Sleep (Optional)"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                />
                
            
                <textarea
                    placeholder="Other Notes (Optional)"
                    value={otherNotes}
                    onChange={(e) => setOtherNotes(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                ></textarea>
                <Button 
                onClick={handleAddEntry}
                disabled={loading}
                variant={"solid"}
                className={'w-full'}
                >
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <span>Add Entry</span>
                    )}
                </Button>
            </div>
        </div>
    );
}
