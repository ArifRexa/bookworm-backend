const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123', // Will be hashed by pre-save hook? No, seeder uses insertMany which bypasses middleware pre-save in some versions, but mongoose usually requires manual handling or create.
        // Wait, insertMany DOES NOT trigger pre('save') hooks. I need to hash manually here or use generic default.
        role: 'admin'
    },
    {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user'
    }
];

// Hash passwords manually since insertMany doesn't trigger pre-save hook
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

users.forEach(user => {
    user.password = hashPassword(user.password);
});

module.exports = users;
