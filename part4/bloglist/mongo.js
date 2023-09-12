const mongoose = require('mongoose');
const Blog = require ('./models/blog');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const mongoUrl = `mongodb+srv://uizykim:${password}@cluster0.5bn1ycq.mongodb.net/?retryWrites=true&w=majority`


mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl);


const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: process.argv[6]
});

/// / Save a blog
if (process.argv.length > 3) {
  blog.save().then((result) => {
    console.log(`added ${blog.title} to bloglist`);
    mongoose.connection.close();
  });
}

/// / Find all blogs
if (process.argv.length === 3) {
  Blog.find({}).then((result) => {
    result.forEach((blog) => {
      console.log(blog);
    });
    mongoose.connection.close();
  });
}
