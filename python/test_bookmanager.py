import unittest
from book import Book
from book_manager import BookManager

class TestBookManager(unittest.TestCase):
    def setUp(self):
        self.book_manager = BookManager()

    def test_add_book(self):
        book = Book("Pemrograman", "Andi", 2020)
        self.book_manager.add_book(book)
        self.assertEqual(1, self.book_manager.get_book_count())

    def test_remove_existing_book(self):
        book = Book("Basis Data", "Erlangga", 2021)
        self.book_manager.add_book(book)

        removed = self.book_manager.remove_book("Basis Data")
        self.assertTrue(removed)
        self.assertEqual(0, self.book_manager.get_book_count())

    def test_remove_non_existing_book(self):
        book = Book("Algoritma", "Budi", 2019)
        self.book_manager.add_book(book)

        removed = self.book_manager.remove_book("Jaringan Komputer")
        self.assertFalse(removed)
        self.assertEqual(1, self.book_manager.get_book_count())

    def test_find_books_by_author(self):
        self.book_manager.add_book(Book("Java", "Andi", 2020))
        self.book_manager.add_book(Book("Python", "Andi", 2021))
        self.book_manager.add_book(Book("C++", "Budi", 2018))

        result = self.book_manager.find_books_by_author("Andi")
        self.assertEqual(2, len(result))

    def test_get_all_books(self):
        self.book_manager.add_book(Book("Java", "Andi", 2020))
        self.book_manager.add_book(Book("Python", "Andi", 2021))

        all_books = self.book_manager.get_all_books()
        self.assertEqual(2, len(all_books))
        self.assertTrue(any(b.title == "Java" for b in all_books))
        self.assertTrue(any(b.title == "Python" for b in all_books))

    # ======================
    # TEST-TEST YANG FAIL
    # ======================

    def test_wrong_book_count(self):
        """Tambah 2 buku tapi dipaksa cek jumlah = 3 (FAIL)."""
        self.book_manager.add_book(Book("AI", "Rudi", 2020))
        self.book_manager.add_book(Book("ML", "Rudi", 2021))
        self.assertEqual(3, self.book_manager.get_book_count())  # ❌ FAIL

    def test_remove_non_existing_book_fail(self):
        """Menghapus buku yang tidak ada tapi dipaksa True (FAIL)."""
        removed = self.book_manager.remove_book("Tidak Ada")
        self.assertTrue(removed)  # ❌ FAIL, seharusnya False

    def test_find_books_by_author_fail(self):
        """Cari author salah tapi dipaksa ada 1 hasil (FAIL)."""
        self.book_manager.addBook = Book("Book X", "Zaki", 2022)
        result = self.book_manager.find_books_by_author("Andi")
        self.assertEqual(1, len(result))  # ❌ FAIL, seharusnya 0


if __name__ == "__main__":
    unittest.main()
