import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connection.ts';
import { schema } from './schema/index.ts';

await reset(db, schema);

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 20,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum({ sentencesCount: 3 }),
      },
    },
    questions: {
      count: 20,
      columns: {
        question: f.loremIpsum({ sentencesCount: 1 }),
      },
    },
  };
});

await sql.end();

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log('Database seeded!');
