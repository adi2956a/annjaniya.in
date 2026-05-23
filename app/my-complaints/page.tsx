import { Container } from "@/components/layout/Container";

export default function MyComplaintsPage() {
  return (
    <Container className="py-10">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold">मेरी शिकायतें</h1>
        <p className="mt-2 text-sm text-ink/65">
          यह पेज session-aware listing के लिए तैयार है। API integration अगली pass में
          जोड़ी जाएगी।
        </p>
      </div>
    </Container>
  );
}

