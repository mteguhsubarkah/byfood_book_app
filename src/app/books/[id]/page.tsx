import { notFound } from "next/navigation";
import { Book } from "@/components/books/BookCard";
import { getBookById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params;

  const book: Book | null = await getBookById(id); // direct API call

  if (!book) {
    return notFound();
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Book Details of {book.title}</h1>
      <p className="mb-2">
        <span className="font-semibold">Author:</span> {book.author}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Year:</span> {book.year}
      </p>  
    </main>
  );
}
