const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Entry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export async function getEntries(): Promise<Entry[]> {
  const res = await fetch(`${API_URL}/entries/`);
  if (!res.ok) throw new Error("Failed to fetch entries");
  return res.json();
}

export async function createEntry(name: string, message: string): Promise<Entry> {
  const res = await fetch(`${API_URL}/entries/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  });
  if (!res.ok) throw new Error("Failed to create entry");
  return res.json();
}

export async function deleteEntry(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/entries/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete entry");
}
