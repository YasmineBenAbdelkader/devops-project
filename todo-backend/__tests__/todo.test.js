const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

let createdTodoId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Todo API', () => {
  it('POST /todos - should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ text: 'Learn Testing' })
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.text).toBe('Learn Testing');
    createdTodoId = res.body._id;
  });

  it('GET /todos - should return all todos', async () => {
    const res = await request(app)
      .get('/todos')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('PUT /todos/:id - should update a todo', async () => {
    const res = await request(app)
      .put(`/todos/${createdTodoId}`)
      .send({ text: 'Updated Todo Text' })
      .expect(200);

    expect(res.body).toHaveProperty('_id', createdTodoId);
    expect(res.body.text).toBe('Updated Todo Text');
  });

  it('DELETE /todos/:id - should delete a todo', async () => {
    const res = await request(app)
      .delete(`/todos/${createdTodoId}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Todo deleted');
  });

  it('PUT /todos/:id - should return 404 for non-existent todo', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await request(app)
      .put(`/todos/${fakeId}`)
      .send({ text: 'Non-existent Todo' })
      .expect(404);
  });

  it('DELETE /todos/:id - should return 404 for non-existent todo', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await request(app)
      .delete(`/todos/${fakeId}`)
      .expect(404);
  });
});
