const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
    const db = getDB();
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            $or: [
                {
                    title: {
                        $regex: req.query.keyword,
                        $options: 'i',
                    },
                },
                {
                    author: {
                        $regex: req.query.keyword,
                        $options: 'i',
                    },
                },
            ],
        }
        : {};

    // Genre filter
    const genre = req.query.genre ? { genre: req.query.genre } : {};

    const count = await db.collection('books').countDocuments({ ...keyword, ...genre });
    const books = await db.collection('books')
        .find({ ...keyword, ...genre })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .toArray();

    res.json({ books, page, pages: Math.ceil(count / pageSize), count });
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
    const db = getDB();
    const book = await db.collection('books').findOne({ _id: new ObjectId(req.params.id) });

    if (book) {
        res.json(book);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
    const db = getDB();
    const { title, author, genre, description, coverImage } = req.body;

    const book = {
        title,
        author,
        genre,
        description,
        coverImage,
        addedBy: new ObjectId(req.user._id),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const result = await db.collection('books').insertOne(book);
    const createdBook = await db.collection('books').findOne({ _id: result.insertedId });
    res.status(201).json(createdBook);
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
    const db = getDB();
    const { title, author, genre, description, coverImage } = req.body;

    const query = { _id: new ObjectId(req.params.id) };
    const book = await db.collection('books').findOne(query);

    if (book) {
        const updateDoc = {
            $set: {
                title: title || book.title,
                author: author || book.author,
                genre: genre || book.genre,
                description: description || book.description,
                coverImage: coverImage || book.coverImage,
                updatedAt: new Date()
            }
        };

        await db.collection('books').updateOne(query, updateDoc);
        const updatedBook = await db.collection('books').findOne(query);
        res.json(updatedBook);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
    const db = getDB();
    const result = await db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount > 0) {
        res.json({ message: 'Book removed' });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
};

// @desc    Get book recommendations
// @route   GET /api/books/recommendations
// @access  Private
const getRecommendations = async (req, res) => {
    const db = getDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.user._id) });

    // In original code, it used populate. We need to fetch the books manually or use aggregation.
    // Simplified fetch for read books:
    const readBookIds = user.read || [];
    const readBooks = await db.collection('books').find({ _id: { $in: readBookIds.map(id => new ObjectId(id)) } }).toArray();

    const genres = readBooks.map(book => book.genre);

    let recommendations = [];
    if (genres.length > 0) {
        recommendations = await db.collection('books').find({
            genre: { $in: genres },
            _id: { $nin: readBookIds.map(id => new ObjectId(id)) }
        }).limit(10).toArray();
    }

    if (recommendations.length < 5) {
        const popularBooks = await db.collection('books').find({}).sort({ averageRating: -1 }).limit(10).toArray();
        recommendations = [...recommendations, ...popularBooks];
        recommendations = [...new Map(recommendations.map(item => [item['title'], item])).values()];
    }

    res.json(recommendations.slice(0, 12));
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getRecommendations
};
