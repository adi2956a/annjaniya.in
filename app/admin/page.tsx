import { Container } from "@/components/layout/Container";

export default function AdminPage() {
  return (
    <Container className="py-10">
      <div className="rounded-[2rem] bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-ink/65">
          Dashboard, verification review, assignment flow और reports अगले implementation
          चरण में जोड़े जाएंगे।
        </p>
      </div>
    </Container>
  );
}

