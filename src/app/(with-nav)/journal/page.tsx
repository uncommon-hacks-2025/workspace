import { getUserJournals } from "@/backend/journal/getLatestEntry";
import JournalEntries from "@/components/journal-entries";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth/providers";
import { redirect } from "next/navigation";

export default async function JournalEntriesPage() {
    const user = await auth();
    
      if (!user) {
        redirect("/login");
      }

      const userId = user.user?.id;

        if (!userId) {
            // If userId is undefined, redirect to login
            // This should not happen if the auth flow is correct
            redirect("/login");
        }

    // At this point, we have a valid userId

    const journalEntries = await getUserJournals(userId);

    return (
        <main className="max-w-4xl mx-auto w-full p-6 flex flex-col md:flex-row gap-6 relative">
            <div
            className={'w-full sticky left-0 top-0 border-r border-neutral-200 pr-2'}
            >
                 <JournalEntries />
            </div>
           
            <div className="w-full">
                <h2 className="text-2xl font-bold mb-4">Your Journal Entries</h2>
                <p className="text-muted-foreground mb-6">
                    Here are your latest journal entries. You can add new entries or edit existing ones to reflect on your health journey.
                </p>
                {
                    journalEntries.length > 0 ? (
                        <ul>
                            {journalEntries.map((entry) => (
                                <li key={entry.id} className="mb-4 bg-neutral-100 p-4 rounded-md shadow-sm">
                                    <strong>{entry.entryTitle}</strong> - {new Date(entry.entryDate).toLocaleDateString()}
                                    <p>{entry.otherNotes}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No journal entries found. Start writing your first entry today!</p>
                    )
                }
            </div>
        </main>
    );
}
