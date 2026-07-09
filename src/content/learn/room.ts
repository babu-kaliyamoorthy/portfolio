import type { Topic } from '@/types/content';

export const room: Topic = {
  slug: 'room',
  title: 'Room Database',
  category: 'Room',
  summary: 'A type-safe, compile-time-verified SQL layer over SQLite — queries are checked against your schema at build time, and DAO functions can return a Flow that emits automatically whenever the underlying data changes.',
  sections: [
    {
      heading: 'Compile-time query verification is the actual value-add over raw SQLite',
      body: [
        "Room parses your @Query annotations at compile time and checks them against your @Entity schema — a typo in a column name, or a query selecting a column that doesn't exist, is a build error, not a runtime crash discovered by a user. Raw SQLiteOpenHelper gives you none of this; every query is a string checked only when it actually runs.",
      ],
    },
    {
      heading: 'A DAO returning Flow makes the UI reactive to the database for free',
      body: [
        "A `@Query(\"SELECT * FROM cards\") fun observeCards(): Flow<List<Card>>` automatically re-emits whenever any write touches the `cards` table — the UI observing this Flow updates itself with zero manual refresh logic. This is the mechanism underneath Offline-First (see Architecture): the UI never manually re-fetches, it just always reflects whatever Room currently holds.",
      ],
    },
  ],
  codeSnippets: [
    {
      title: 'A DAO with a compile-time-checked, reactive query',
      language: 'kotlin',
      code: `@Dao
interface CardDao {
    @Query("SELECT * FROM cards WHERE isActive = 1")
    fun observeActiveCards(): Flow<List<CardEntity>> // re-emits on every write to the cards table

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(cards: List<CardEntity>)
}`,
    },
  ],
  interviewQuestions: [
    {
      level: 'senior',
      question: 'How does a Room DAO function returning Flow know when to re-emit?',
      answer:
        "Room tracks which tables a query touches, and its generated code registers an internal observer on those tables. Any write (insert/update/delete) through Room to a table with an active Flow observer triggers a re-query and re-emission automatically — you never manually call anything to 'refresh' it, the reactivity is generated for you based on the query's referenced tables.",
    },
    {
      level: 'lead',
      question: 'Why does Room require a migration strategy instead of just recreating the database on schema changes?',
      answer:
        "Destroying and recreating the database on every schema change would silently delete all locally cached user data on every app update that touches the schema — unacceptable for anything holding meaningful offline state. A defined Migration (or Room's auto-migration for simple cases) preserves existing data by transforming it to match the new schema, rather than discarding it.",
    },
  ],
  tech: ['Room', 'SQLite', 'Kotlin Flow'],
  relatedSlugs: ['flow', 'paging'],
};
