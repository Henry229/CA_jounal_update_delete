import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery', true);

async function dbClose() {
  await mongoose.connection.close();
  console.log('Database disconnected!');
}

// Connect to a MongoDB via Mongoose
try {
  const m = await mongoose.connect(process.env.ATLAS_DB_URL);
  console.log(
    m.connection.readyState === 1
      ? 'Mongoose connected!!'
      : 'Mongoose failed to connect!'
  );
} catch (err) {
  // .then((m) =>
  //   console.log(
  //     m.connection.readyState === 1
  //       ? 'Mongoose connected!'
  //       : 'Mongoose failed to connect'
  //   )
  // )
  console.log(err);
}

// Create a Mongoose schema to define the structure of a model
const entrySchema = new mongoose.Schema({
  // category: { type: String, required: true },
  category: { type: mongoose.ObjectId, ref: 'Category' }, // foreign key 같이 설정하는거
  // 설정할 model의 collection을 써준다.
  content: { type: String, required: true },
});

// Create a Mongoose model based on the schema
const EntryModel = mongoose.model('Entry', entrySchema);

//Categories
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // entries: [entrySchema], // 관계형 디비에서 join과 비슷한 개념 nested 오브젝트 만듬.
});

const CategoryModel = mongoose.model('Category', categorySchema);

export { EntryModel, CategoryModel, dbClose };
