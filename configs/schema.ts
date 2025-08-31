import { integer, pgTable, varchar, json, boolean } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    isPro: boolean()
});

export const AiThumbnailTable  = pgTable('thumbnails', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userInput: varchar(),
    thumbnailUrl: varchar(),
    refImage: varchar(),
    userEmail: varchar().references(() => usersTable.email),
    createdOn: varchar()
})


export const AiContentTable = pgTable('AiContent', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userInput: varchar(),
    content: json(),
    thumbnailUrl: varchar(),
    userEmail: varchar().references(() => usersTable.email),
    createdOn: varchar(),
    contentId: varchar()
})



export const TrendingKeywords = pgTable('trendingKeywords',  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userInput: varchar(),
    keywordsData: json(),
    userEmail: varchar().references(() => usersTable.email),
    createdOn: varchar(),
    keywordId: varchar(),
})
















