"use client";

import { useState, useEffect, useCallback } from "react";
import { getEntries, createEntry, deleteEntry, type Entry } from "@/lib/api";

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    const data = await getEntries();
    setEntries(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await createEntry(name.trim(), message.trim());
      setName("");
      setMessage("");
      await load();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    await deleteEntry(id);
    await load();
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">Guestbook</h1>
      <p className="text-gray-500 mb-8">Leave a message for the world.</p>

      <form onSubmit={handleSubmit} className="mb-10 space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {submitting ? "Signing..." : "Sign Guestbook"}
        </button>
      </form>

      <div className="space-y-4">
        {entries.length === 0 && (
          <p className="text-gray-400 text-sm">No entries yet. Be the first to sign!</p>
        )}
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white border border-gray-200 rounded-md p-4 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{entry.name}</p>
              <p className="text-gray-700 mt-1 text-sm">{entry.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(entry.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(entry.id)}
              className="text-red-400 hover:text-red-600 text-sm ml-4 shrink-0"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
