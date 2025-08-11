"use client";

import React from "react";
import Button from "@/components/common/Button";
import Link from "next/link";


export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
};

type BookCardProps = {
  book: Book;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function BookCard({
  book,
  onView,
  onEdit,
  onDelete,
}: BookCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600">by {book.author}</p>
        <p className="text-gray-500 text-sm">Published: {book.year}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <Link href={`/books/${book.id}`}>
            <Button variant="secondary">View</Button>
        </Link>
        <Button
          variant="primary"
          onClick={() => onEdit?.(book.id)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete?.(book.id)}
        >
          Delete
        </Button>

        
      </div>
    </div>
  );
}
