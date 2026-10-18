# shaveenudayanga.me

Personal site of Shaveen Udayanga: final-year Computer Science student at the University of Sri Jayewardenepura and founder of [S39 Labs](https://www.s39labs.com), the studio behind [LectureVoice](https://lecturevoice.s39labs.com).

The site is laid out like a drawing set. Each section is a sheet: a framed page with rulers and zones, a title block as the footer, a parts list for how LectureVoice is put together, a drawing register for projects, and a Gantt chart for the timeline. Red marks anything current or still open.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## Where things live

| Path | What it holds |
| --- | --- |
| `content/projects.ts` | Every product and project. The home page, the chat tools and the knowledge sync all read it. |
| `content/experience.ts` | Roles, education, skills, certifications, languages and the off-the-clock notes. |
| `content/blog/*.md` | Posts under `/blog`, with front matter for title, date, tags and FAQ. |
| `components/sheet/` | The frame, navigation, section heads and title block. |
| `components/sections/` | One component per sheet on the home page. |
| `components/ai/` | The "Ask about my work" command line. |
| `app/api/chat/route.ts` | Chat endpoint: Groq first, Google as fallback, with tools over project data, a Supabase vector store and GitHub activity. |
| `scripts/sync-knowledge.mjs` | Re-indexes posts and content into Supabase (nightly via GitHub Actions). |

Environment variables for the chat are listed in `.env.example`.

## Writing rules

No em dashes anywhere in the site's text. No buzzwords. If something is basic or unfinished, say so.

The resume is at `public/shaveen-udayanga-resume.pdf`; the older paths `/Resume_Shaveen_Udayanga.pdf` and `/Shaveen_Udayanga_Resume.pdf` redirect to it.
