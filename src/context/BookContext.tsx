"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Book } from "@/components/books/BookCard";
import { getBooks, getBookById, createBook, updateBook, deleteBookById } from "@/lib/api";

type BookContextType = {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  addBook: (book: Omit<Book, "id">) => Promise<void>;
  editBook: (id: string, book: Omit<Book, "id">) => Promise<void>;
  removeBook: (id: string) => Promise<void>;
  getBook: (id: string) => Promise<Book | undefined>;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Omit<Book, "id">) => {
    try {
      const newBook = await createBook(book);
      setBooks((prev) => [...prev, newBook]);
    } catch {
      setError("Failed to add book");
    }
  };

  const editBook = async (id: string, book: Omit<Book, "id">) => {
    try {
      const updated = await updateBook(id, book);
      setBooks((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch {
      setError("Failed to update book");
    }
  };

  const removeBook = async (id: string) => {
    try {
      await deleteBookById(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setError("Failed to delete book");
    }
  };

  const getBook = async (id: string) => {
    try {
      return await getBookById(id);
    } catch {
      setError("Failed to fetch book details");
      return undefined;
    }
  };

  // Fetch awal
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        addBook,
        editBook,
        removeBook,
        getBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooksContext() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooksContext must be used within a BookProvider");
  }
  return context;
}
