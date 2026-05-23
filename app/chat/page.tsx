import { Container } from "@/components/layout/Container";

export default function ChatPage() {
  return (
    <Container className="py-10">
      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <aside className="rounded-[2rem] bg-white p-5 shadow-card">
          <h1 className="text-xl font-bold">समुदाय चैनल</h1>
          <div className="mt-4 space-y-2 text-sm">
            {["ग्राम सभा", "बिजली चर्चा", "पानी / नल", "सड़क / नाली", "सरकारी सूचनाएं"].map(
              (channel) => (
                <div key={channel} className="rounded-2xl bg-stone-50 px-4 py-3">
                  {channel}
                </div>
              )
            )}
          </div>
        </aside>

        <section className="rounded-[2rem] bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold">समुदाय चैट</h2>
          <p className="mt-3 text-sm text-ink/65">
            रियल-टाइम चैट अगली implementation pass में जोड़ी जाएगी। इस आधारभूत
            scaffold में read-only layout तैयार है।
          </p>
        </section>
      </div>
    </Container>
  );
}

