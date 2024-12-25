import express from 'express';
    import sqlite3 from 'sqlite3';
    import { open } from 'sqlite';

    const app = express();
    const PORT = 3000;

    app.use(express.json());

    const initDb = async () => {
      const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
      });

      await db.exec(`
        CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          price REAL NOT NULL,
          description TEXT,
          image TEXT
        );
      `);

      await db.exec(`
        CREATE TABLE IF NOT EXISTS reviews (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          book_id INTEGER NOT NULL,
          user TEXT NOT NULL,
          rating INTEGER NOT NULL,
          comment TEXT,
          FOREIGN KEY (book_id) REFERENCES books (id)
        );
      `);

      return db;
    };

    const dbPromise = initDb();

    app.get('/api/books', async (req, res) => {
      const db = await dbPromise;
      const books = await db.all('SELECT * FROM books');
      res.json(books);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
