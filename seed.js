import { CategoryModel, EntryModel, dbClose } from './db.js';

await EntryModel.deleteMany();
console.log('Deleted all EntriesModel');
await CategoryModel.deleteMany();
console.log('Deleted all CategoryModel');

const categories = [
  { name: 'Food' },
  { name: 'Coding' },
  { name: 'Work' },
  { name: 'Other' },
];

const cats = await CategoryModel.insertMany(categories);
console.log('Inserted Categories');

const entries = [
  { category: cats[0], content: 'Hello!' },
  { category: cats[1], content: 'Express is cool!' },
  { category: cats[2], content: 'Another day at the office' },
];

await EntryModel.insertMany(entries);
console.log('Inserted entries');

await dbClose();

dbClose();
