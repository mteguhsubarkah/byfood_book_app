"use client";

import { useState } from "react";
import BookForm from "@/components/books/BookForm";
import BookList from "@/components/books/BookList";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useBooksContext } from "@/context/BookContext";
import { Book } from "@/components/books/BookCard";

export default function BooksPage() {
  const { books, addBook, editBook, loading, error } = useBooksContext();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  // Handle Add Book submit
  const handleAddBook = async (data: Omit<Book, "id">) => {
    await addBook(data);
    setIsAddModalOpen(false);
  };

  // Open Edit modal and set book data
  const handleEditClick = (book: Book) => {
    setBookToEdit(book);
    setIsEditModalOpen(true);
  };

  // Submit edited data
  const handleEditSubmit = async (data: Omit<Book, "id">) => {
    if (!bookToEdit) return;
    await editBook(bookToEdit.id, data);
    setIsEditModalOpen(false);
    setBookToEdit(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Books Dashboard</h1>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          Add Book
        </Button>
      </div>

      {/* Add Book Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <BookForm onSubmit={handleAddBook} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>

      {/* Edit Book Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Edit Book</h2>
        {bookToEdit && (
          <BookForm
            initialData={bookToEdit}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <BookList
        books={books}
        onEdit={handleEditClick}
      />

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {bookToEdit && (
          <BookForm
            initialData={bookToEdit}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
}
