"use client";

import React, { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { Book } from "./BookCard";

type BookFormProps = {
  initialData?: Partial<Book>;
  onSubmit: (data: Omit<Book, "id">) => void;
  onCancel: () => void;
};

export default function BookForm({
  initialData = {},
  onSubmit,
  onCancel,
}: BookFormProps) {
  const [title, setTitle] = useState(initialData.title || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [year, setYear] = useState(initialData.year?.toString() || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!author.trim()) newErrors.author = "Author is required";
    if (!year.trim()) newErrors.year = "Year is required";
    else if (!/^\d{4}$/.test(year)) newErrors.year = "Year must be 4 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      author: author.trim(),
      year: parseInt(year, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
    <Input
        label="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
    />
    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

    <Input
        label="Author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
    />
    {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}

    <Input
        label="Year"
        name="year"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
    />
    {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}

    <div className="flex justify-end gap-2 mt-4">
        <Button variant="secondary" type="button" onClick={onCancel}>
        Cancel
        </Button>
        <Button variant="primary" type="submit">
        Save
        </Button>
    </div>
    </form>

  );
}
