import { Book } from "@/components/books/BookCard";

const API_URL = "http://localhost:8080"; // URL backend

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books`);
  console.log(res)
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function getBookById(id: string): Promise<Book> {
  const res = await fetch(`${API_URL}/book/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

export async function createBook(book: Omit<Book, "id">): Promise<Book> {
  const res = await fetch(`${API_URL}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to create book");
  return res.json();
}

export async function updateBook(id: string, book: Omit<Book, "id">): Promise<Book> {
  const res = await fetch(`${API_URL}/book/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
}

export async function deleteBookById(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/book/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete book");
}
