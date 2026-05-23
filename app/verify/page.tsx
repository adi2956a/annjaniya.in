import { Container } from "@/components/layout/Container";

export default function VerifyPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold">निवासी सत्यापन</h1>
        <p className="mt-2 text-sm text-ink/65">
          दस्तावेज़ upload flow अभी scaffold stage में है। अगले चरण में Cloudinary और
          admin review जोड़ा जाएगा।
        </p>
      </div>
    </Container>
  );
}

