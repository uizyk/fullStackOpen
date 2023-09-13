const listHelper = require('../utils/list_helper');

const blogOne = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Author A",
        url: "https://reactpatterns.com/",
        likes: 6,
        __v: 0
    }
]

const blogTwo = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Author B",
        url: "https://reactpatterns.com/",
        likes: 6,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Author A",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Author B",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }
]

describe('total likes', () => {
    test('blog1 total likes', () => {
        expect(listHelper.totalLikes(blogOne)).toBe(6);
    });

    test('blog2 total likes', () => {
        expect(listHelper.totalLikes(blogTwo)).toBe(20);
    });
});


describe('favorite blog', () => {
    test('blog1 favorite blog', () => {
        expect(listHelper.favoriteBlog(blogOne)).toEqual(blogOne[0]);
    });

    test('blog2 favorite blog', () => {
        expect(listHelper.favoriteBlog(blogTwo)).toEqual(blogTwo[2]);
    });
});

describe('most blogs', () => {
    test('blog1 most blogs', () => {
        expect(listHelper.mostBlogs(blogOne)).toEqual({author: "Author A", blogs: 1});
    });

    test('blog2 most blogs', () => {
        expect(listHelper.mostBlogs(blogTwo)).toEqual({author: "Author B", blogs: 2});
    });
});