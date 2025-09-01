const Book = require("../book");
const BookManager = require("../bookManager");

describe("BookManager", () => {
  let bookManager;

  beforeEach(() => {
    bookManager = new BookManager();
  });

  test("Test menambahkan buku", () => {
    const book = new Book("Test Book", "Test Author", 2023);
    bookManager.addBook(book);
    expect(bookManager.getBookCount()).toBe(1);
  });

  test("Test menghapus buku yang ada", () => {
    const book = new Book("To Remove", "Author", 2023);
    bookManager.addBook(book);

    const removed = bookManager.removeBook("To Remove");
    expect(removed).toBe(true);
    expect(bookManager.getBookCount()).toBe(0);
  });

  test("Test menghapus buku yang tidak ada", () => {
    const book = new Book("Some Book", "Someone", 2023);
    bookManager.addBook(book);

    const removed = bookManager.removeBook("Not Exist");
    expect(removed).toBe(false);
    expect(bookManager.getBookCount()).toBe(1); // tetap 1
  });

  test("Test mencari buku berdasarkan author", () => {
    const book1 = new Book("Book A", "AuthorX", 2020);
    const book2 = new Book("Book B", "AuthorY", 2021);
    const book3 = new Book("Book C", "AuthorX", 2022);

    bookManager.addBook(book1);
    bookManager.addBook(book2);
    bookManager.addBook(book3);

    const result = bookManager.findBooksByAuthor("AuthorX");
    expect(result.length).toBe(2);
    expect(result).toEqual(expect.arrayContaining([book1, book3]));
  });

  test("Test mendapatkan semua buku", () => {
    const book1 = new Book("Book A", "AuthorX", 2020);
    const book2 = new Book("Book B", "AuthorY", 2021);

    bookManager.addBook(book1);
    bookManager.addBook(book2);

    const allBooks = bookManager.getAllBooks();
    expect(allBooks.length).toBe(2);
    expect(allBooks).toEqual(expect.arrayContaining([book1, book2]));
  });

  // ==========================
  // TEST YANG AKAN FAIL
  // ==========================
  test("Test GAGAL - jumlah buku salah", () => {
    const book1 = new Book("Book A", "AuthorX", 2020);
    const book2 = new Book("Book B", "AuthorY", 2021);

    bookManager.addBook(book1);
    bookManager.addBook(book2);

    // seharusnya 2, tapi dipaksa cek 3 → FAIL
    expect(bookManager.getBookCount()).toBe(3);
  });

  test("Test FAIL - hapus buku tidak ada", () => {
    const removed = bookManager.removeBook("Tidak Ada");
    // seharusnya false, tapi dipaksa true → FAIL
    expect(removed).toBe(true);
  });

  test("Test FAIL - pencarian penulis salah", () => {
    const book = new Book("Book X", "AuthorZ", 2020);
    bookManager.addBook(book);

    const result = bookManager.findBooksByAuthor("AuthorNotExist");
    // seharusnya 0, tapi dipaksa cek 1 → FAIL
    expect(result.length).toBe(1);
  });
});
