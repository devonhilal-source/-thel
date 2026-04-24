# Security Specification: Æthel Platform

## 1. Data Invariants
- A `User` can only be created by the authenticated owner of that UID.
- A `Poem` must have a valid `authorId` matching the request user.
- `Comments` must reference a valid `poemId` and belong to the authenticated user.
- `Chats` are only accessible to the poets listed in `participantIds`.
- `Messages` can only be sent if the user is a participant in the parent `Chat`.
- Statistics (posts, votes) should be updated via batch writes or admin triggers (if applicable), but for now, we'll enforce strict ownership for self-updates.

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)
1. **Identity Spoofing**: Creating a user profile with a different UID.
2. **Ghost Writing**: Posting a poem as another author.
3. **Draft Privacy Breach**: Reading another user's draft (if added later).
4. **Statistics Inflation**: Directly incrementing one's own `challengeWins` without a valid challenge completion.
5. **Chat Eavesdropping**: Listing messages in a chat where the user is NOT a participant.
6. **Impersonation**: Sending a message as another user.
7. **Metadata Poisoning**: Injecting 1MB of junk into a poem Title.
8. **Relational Vandalism**: Deleting a comment on someone else's poem.
9. **Timestamp Fraud**: Setting `publishedAt` to a future date manually.
10. **Admin Escalation**: Setting `role: "admin"` in a user document (if field existed).
11. **Query Scraping**: Attempting to `list` all user emails by querying the `/users` collection without filters.
12. **Orphaned Writes**: Creating a comment for a poem that doesn't exist.

## 3. The Test Runner
(See `firestore.rules.test.ts` for implementation details)
