
const totalLikes = (blogs) => {
    const total = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(total, 0)
};

const favoriteBlog = (blogs) => {
    const favorite = (prev, current) => {
        return prev.likes > current.likes ? prev : current
    }

    return blogs.reduce(favorite, {})
};

const mostBlogs = (blogs) => {
    const blogCountsByAuthor = {};

    // Count the number of blogs by each author
    blogs.forEach((blog) => {
        const author = blog.author;
        if (!blogCountsByAuthor[author]) {
            blogCountsByAuthor[author] = 1;
        } else {
            blogCountsByAuthor[author] ++;
        }
    });

    let mostBlogsAuthor = '';
    let maxBlogCount = 0;

    // Find the author with the most blogs
    for (const author in blogCountsByAuthor) {
        if (blogCountsByAuthor[author] > maxBlogCount) {
            mostBlogsAuthor = author;
            maxBlogCount = blogCountsByAuthor[author];
        }
    }

    return { author: mostBlogsAuthor, blogs: maxBlogCount}

};

const mostLikes = (blogs) => {

    const authorLikes = {};
    blogs.forEach((blog) => {
        const author = blog.author;
        if (!authorLikes[author]) {
            authorLikes[author] = 0;
        }
        authorLikes[author] += blog.likes;
    });

    let authorWithMostLikes = '';
    let maxLikes = 0;

    for (const author in authorLikes) {
        if (authorLikes[author] > maxLikes) {
            authorWithMostLikes = author;
            maxLikes = authorLikes[author];
        }
    }
    
    return { author: authorWithMostLikes, likes: maxLikes};

};

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}