export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Documents
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
          Your document library
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Manage uploaded files, review extracted data, and prepare documents for AI-assisted form filling.
        </p>
      </div>
    </main>
  );
}
