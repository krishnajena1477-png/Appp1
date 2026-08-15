# Season-Based MCQ Examination Platform

A localhost-ready Season-based MCQ examination platform. It includes a zero-dependency Node.js server so you can run and test the app immediately even when npm registry access is blocked.

## Localhost URL

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

If port 3000 is busy:

```bash
PORT=4000 npm run dev
```

Then open `http://localhost:4000`.


## If localhost refuses to connect

1. Make sure the dev server is still running in the terminal. Keep this command open:

```bash
npm run dev
```

2. When it says `SeasonExam local app: http://localhost:3000`, open exactly:

```text
http://localhost:3000
```

3. If terminal says `Port 3000 is already in use`, either open the already-running app at `http://localhost:3000` or start on another port:

```bash
PORT=4000 npm run dev
```

Then open `http://localhost:4000`.

4. Quick health check:

```bash
curl http://localhost:3000/health
```

## Seed accounts

- Admin: `admin@example.com` / `Admin@12345`
- User: `user@example.com` / `User@12345`

## How to test the local API

1. Login and save the session cookie:

```bash
curl -i -c cookie.txt -X POST http://localhost:3000/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"login":"user@example.com","password":"User@12345"}'
```

2. Start the seeded season:

```bash
curl -b cookie.txt -X POST http://localhost:3000/api/attempts \
  -H 'content-type: application/json' \
  -d '{"seasonId":"season-1"}'
```

3. Open the returned attempt safely:

```bash
curl -b cookie.txt http://localhost:3000/api/attempts/YOUR_ATTEMPT_ID
```

The attempt response only includes option IDs/text and never exposes `isCorrect`, `correctOptionSnapshot`, or answer keys.

## Implemented core guarantees

- Dynamic question counts and variable options; no fixed MCQ size.
- Correct answers are never exposed in active attempt payloads.
- Server-side attempt snapshots preserve historical scoring.
- Server-authoritative scoring, PASS/FAIL, timer-expiry handling, and immutable finalized attempts.
- User/admin route protection with sessions and roles.
- Publishing validation prevents invalid seasons.
- Audit logs for sensitive admin events.
- Notifications, progress tracking, dashboard metrics, and seeded demo data.

## Important endpoints

- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/user/dashboard`, `GET /api/user/seasons`
- `POST /api/attempts`, `GET /api/attempts/:id`, `PUT /api/attempts/:id/answers/:attemptQuestionId`, `POST /api/attempts/:id/submit`, `GET /api/attempts/:id/result`
- `GET /api/admin/dashboard`, `POST /api/admin/seasons/:id/publish`, `GET /api/admin/audit-logs`

## Notes

- `server.js` is the runnable localhost implementation.
- The Next.js/Prisma scaffold remains in the repository for the production-oriented architecture, but the zero-dependency server is the fastest way to run locally in this restricted environment.
