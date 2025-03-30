"use client";

import { useEffect, useState } from "react";

type Entry = {
    id: string;
    entryTitle: string;
    entryDate: string;
    medicationsTaken?: string;
    symptomsHad?: string;
    sleep?: number;
    otherNotes?: string;
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
            const res = await fetch("/api/journal-entries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    entryTitle,
                    entryDate,
                    medicationsTaken: medicationsTaken || null,
                    symptomsHad: symptomsHad || null,
                    sleep: sleep ? parseFloat(sleep) : null,
                    otherNotes: otherNotes || null
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
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">My Journal</h2>

            {/* Add New Entry Form */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={entryTitle}
                    onChange={(e) => setEntryTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Medications Taken (Optional)"
                    value={medicationsTaken}
                    onChange={(e) => setMedicationsTaken(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="text"
                    placeholder="Symptoms Had (Optional)"
                    value={symptomsHad}
                    onChange={(e) => setSymptomsHad(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
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
                <button
                    onClick={handleAddEntry}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {loading ? "Adding..." : "Add Entry"}
                </button>
            </div>

            {/* Journal Entries List */}
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id} className="border-b py-2">
                        <h3 className="font-semibold">{entry.entryTitle}</h3>
                        <p><strong>Date:</strong> {new Date(entry.entryDate).toLocaleDateString()}</p>
                        {entry.medicationsTaken && <p><strong>Medications:</strong> {entry.medicationsTaken}</p>}
                        {entry.symptomsHad && <p><strong>Symptoms:</strong> {entry.symptomsHad}</p>}
                        {entry.sleep !== undefined && <p><strong>Sleep:</strong> {entry.sleep} hours</p>}
                        {entry.otherNotes && <p><strong>Notes:</strong> {entry.otherNotes}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
