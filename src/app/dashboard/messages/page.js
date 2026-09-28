export default function MessagesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
          Messages
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
          Your messages
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          This section will show the latest updates, notifications, and AI assistant communication.
        </p>
      </div>
    </main>
  );
}
