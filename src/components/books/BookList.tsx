"use client";

import React from "react";
import BookCard from "@/components/books/BookCard";
import { useBooksContext } from "@/context/BookContext";
import { Book } from "@/components/books/BookCard";

type BookListProps = {
  onEdit: (book: Book) => void;  // expect book object, not just id
};

export default function BookList({ onEdit }: BookListProps) {
  const { books, removeBook, loading, error } = useBooksContext();

  if (loading) return <p className="text-gray-500">Loading books...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!books || books.length === 0) {
    return <p className="text-gray-500">No books available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onView={(id) => {
            window.location.href = `/books/${id}`; // atau pakai next/link
          }}
          onEdit={() => onEdit(book)}  // langsung passing book object
          onDelete={() => removeBook(book.id)}
        />
      ))}
    </div>
  );
}
