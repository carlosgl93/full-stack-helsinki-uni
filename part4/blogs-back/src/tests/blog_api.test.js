const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");

const { initialBlogs, nonExistingId, blogsInDb } = helper;

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  // array of blog objects
  const blogObjects = initialBlogs.map((b) => new Blog(b));
  // array of promises not awaited
  const promiseArray = blogObjects.map((b) => b.save());
  // fullfil all promises
  await Promise.all(promiseArray);
});

describe("when there is initially some blogs saved", () => {
  test("results are returned in json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("get all blogs", async () => {
    const allBlogs = await blogsInDb();
    expect(allBlogs).toHaveLength(initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const initialBlogs = await blogsInDb();

    const specificBlog = initialBlogs[0];

    const blog = await api
      .get(`/api/blogs/${specificBlog.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(blog.body.title).toBe(specificBlog.title);
  });
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await blogsInDb();
    const specificBlog = blogsAtStart[0];
    const resultBlog = await api.get(`/api/blogs/${specificBlog.id}`);
    expect(resultBlog.body).toEqual(specificBlog);
  });
  test("404 if not found", async () => {
    const nonExisting = await nonExistingId();
    console.log("NON EXISTING ID", nonExisting);
    await api.get(`/api/blogs/${nonExisting}`).expect(404);
  });
  test("400 if id is invalid", async () => {
    const badId = "12";
    await api.get(`/api/blogs/${badId}`).expect(400);
  });
});

describe("addition of a new blog", () => {
  test("add a blog with valid data", async () => {
    const login = await api.post("/api/login").send({
      username: "admin",
      password: "admin123",
    });

    const newBlog = {
      title: "Adding new blog to test",
      author: "Carlos",
      url: `localhost:3000/${new Date()}`,
      likes: "99",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + login.body.token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();

    const contents = blogsAtEnd.map((b) => b.title);

    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain("Adding new blog to test");
  });

  test("reject blog without artist and url", async () => {
    const login = await api.post("/api/login").send({
      username: "admin",
      password: "admin123",
    });

    const newBadBlog = {
      author: "casdf",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + login.body.token)
      .send(newBadBlog)
      .expect(400);
  });

  test("reject malformed blog", async () => {
    const login = await api.post("/api/login").send({
      username: "admin",
      password: "admin123",
    });

    const newBadBlog = {
      title: "this shouldnt be saved",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + login.body.token)
      .send(newBadBlog)
      .expect(400);

    const blogsAtEnd = await blogsInDb();

    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

describe("update a blog", () => {
  test("increase likes by 1", async () => {
    const allBlogs = await blogsInDb();
    const specificBlog = allBlogs[0];
    const updatedBlog = await api
      .put(`/api/blogs/${specificBlog.id}`)
      .send(specificBlog);

    expect(specificBlog.likes).toEqual(updatedBlog._body.likes - 1);
  });
});

describe("delete a blog", () => {
  test("delete a blog", async () => {
    const login = await api.post("/api/login").send({
      username: "admin",
      password: "admin123",
    });

    const { token, username } = login.body;

    const newBlogToDelete = {
      title: "This will be deleted",
      author: username,
      url: new Date(),
    };

    const addingNewBlogToDeleteLater = await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + token)
      .send(newBlogToDelete)
      .expect(201);

    console.log("RESULT OF ADDING NEW BLOG", addingNewBlogToDeleteLater.body);

    const initialUserBlogs = await Blog.find({ username });

    const deletingBlog = await api
      .delete(`/api/blogs/${addingNewBlogToDeleteLater.body.id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204);

    const afterDeletingBlog = await Blog.findById(
      addingNewBlogToDeleteLater.body.id
    );

    expect(afterDeletingBlog).toBe(null);
  });
});

describe("general", () => {
  test("adding a new user", async () => {
    await api
      .post("/api/users")
      .send({
        username: "admin",
        name: "Carlos",
        password: "admin123",
      })
      .expect(201);
  });

  test("_id to id", async () => {
    const result = await api.get("/api/blogs").expect(200);
    expect(result.body[0].id).toBeDefined();
  });

  test("no likes default to 0", async () => {
    const newBlog = {
      title: "Defalt likes to 0",
      author: "Carssss",
      url: "default.3000.sss",
    };

    const request = await api.post("/api/blogs").send(newBlog).expect(201);
    delete request.body.id;

    expect(request.body).toEqual({
      title: "Defalt likes to 0",
      author: "Carssss",
      url: "default.3000.sss",
      likes: 0,
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  // done();
});
