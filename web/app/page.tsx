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
      <p className="text-gray-500 mb-8">Để lại lời nhắn cho người ghé thăm sau bạn.</p>

      <form onSubmit={handleSubmit} className="mb-10 border border-gray-200 rounded-lg p-6 space-y-3">
        <input
          type="text"
          placeholder="Họ tên của bạn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <textarea
          placeholder="Lời nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-black disabled:opacity-50 transition-colors"
        >
          {submitting ? "Đang gửi..." : "Gửi lời nhắn"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Lời nhắn gần đây</h2>
      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-gray-400 text-sm">Chưa có lời nhắn nào. Hãy là người đầu tiên!</p>
        )}
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="border border-gray-200 rounded-md p-4"
          >
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold">{entry.name}</p>
              <p className="text-xs text-gray-400">
                {new Date(entry.created_at).toLocaleString("vi-VN")}
              </p>
            </div>
            <p className="text-gray-700 text-sm">{entry.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
