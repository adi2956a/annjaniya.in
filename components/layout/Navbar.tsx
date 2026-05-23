import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-black/5 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          anjaniya.in
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-ink/80">
          <Link href="/complaints">शिकायतें</Link>
          <Link href="/chat">समुदाय</Link>
          <Link href="/file-complaint">शिकायत दर्ज करें</Link>
          <Link
            href="/login"
            className="rounded-full bg-ink px-4 py-2 text-white transition hover:bg-ink/90"
          >
            लॉगिन
          </Link>
        </nav>
      </div>
    </header>
  );
}

