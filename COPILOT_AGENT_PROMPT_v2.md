# VS Code Copilot Chat — Agent Mode
# Model: Claude Opus 4.6
# Mode: @workspace (Agent)
# ─────────────────────────────────────────────────────────────────────────────
# HOW TO USE:
#   1. Open VS Code in your current portfolio project folder
#   2. Open Copilot Chat (Ctrl+Shift+I), switch to Agent mode
#   3. Paste everything below the separator line into the chat input
# ─────────────────────────────────────────────────────────────────────────────

@workspace

## Who You Are

You are operating as a combined Solutions Architect, AI/ML Architect, CTO, and
Principal Engineer with deep expertise in modern full-stack development, LLM
systems, edge infrastructure, and developer experience. You have strong opinions,
you challenge bad ideas, and you optimize for outcomes — not complexity.

---

## What I Am and What I Have

I am Shaveen Udayanga, a freelance software engineer focused on building intelligent systems.

My current portfolio is a static HTML/CSS/JS site in this workspace. Read the
existing files now. Understand the content, structure, and assets I already have.
This is the baseline you are upgrading.

---

## What I Want (The Outcome)

I want a personal portfolio that does three things simultaneously:

**1. Technically impresses engineers and architects.**
When a senior engineer or tech lead lands on my site, I want them to think
"this person knows what they are building." Not because it is flashy, but because
the architecture is real, the AI behavior is genuinely intelligent, and the
engineering decisions are defensible.

**2. Converts recruiters and clients.**
When someone arrives wanting to know if I can solve their problem, the site
answers them intelligently, personally, and immediately — without them scrolling
through sections or reading walls of text.

**3. Represents me autonomously.**
The AI on this site IS me. It knows my projects, my opinions, my current
availability, my preferred stack, and how I communicate. It does not feel like a
chatbot wrapper. It reasons, it references real work, it pushes back on
off-topic questions, and it improves over time as my work evolves.

---

## Hard Constraints (Non-Negotiable)

- **$0/month.** Free tiers only. This is not a preference, it is a requirement.
- **Solo maintainable.** I build and maintain this alone. Complexity that cannot
  be sustained by one person is worse than simplicity that can.
- **All existing content must be preserved and migrated.** Nothing from the
  current site is thrown away — it is elevated.
- **Production quality.** This will be seen by people who will judge my
  engineering standards. Every file reflects that.

---

## Advisory Inputs (Analyze These, Do Not Simply Follow Them)

I have done prior thinking on this. The following ideas were considered. I am
sharing them as inputs for your reasoning, not as a specification. Analyze each
one. Take what is correct. Improve, replace, or discard what is not. Explain
your decisions.

**Idea A — Next.js 15 + Vercel AI SDK for the full stack**
Collapsing the AI agent logic into Next.js Route Handlers using Vercel AI SDK's
`streamText` with tool calling was proposed as a way to eliminate cold starts
and reduce platform fragmentation. Evaluate whether this fully satisfies the
"genuinely agentic" requirement, what its actual cold start characteristics are
given Supabase TCP connections, and whether it handles multi-step tool reasoning.

**Idea B — Supabase pgvector for knowledge retrieval**
Supabase free tier with the pgvector extension was proposed as the RAG store for
project knowledge, blog content, and embeddings. Evaluate the free tier limits
against realistic usage and whether this is the right retrieval architecture for
a portfolio that must always reflect current work.

**Idea C — Groq for LLM inference**
Groq's free tier (30 RPM, Llama 3.3 70B) was proposed as the inference engine.
Evaluate whether this model and rate limit is appropriate, what the fallback
strategy should be, and whether the token throughput matches the streaming UX goal.

**Idea D — Client-side conversation state instead of Redis**
Dropping persistent cross-session memory in favor of passing the messages array
in client state was proposed to simplify the stack. Evaluate the trade-off
honestly — what is gained, what is lost, and whether there is a middle path
that preserves the most impressive capability at no added cost.

**Idea E — HuggingFace Inference API for embeddings**
BGE-small-en-v1.5 via HuggingFace free inference was proposed for generating
embeddings during the nightly sync pipeline. Evaluate whether this is reliable
enough for a CI pipeline, what alternatives exist at zero cost, and what the
best embedding strategy is for a ~50-100 document knowledge base.

**Idea F — GitHub Actions nightly sync**
A cron workflow that re-indexes blog and project content into pgvector nightly
was proposed so the AI always reflects current work without manual updates.
Evaluate whether this is the right trigger strategy and what the sync script
architecture should look like.

---

## What Genuinely Wowing People Looks Like (Success Criteria)

Use these as your design criteria when making architectural decisions:

- A visitor's first message gets a response that starts streaming in under
  **2 seconds**, even if this is the first request in hours.
- The AI demonstrates **live awareness** of my actual work — referencing real
  repositories, recent commits, and actual project details, not summaries.
- The AI shows its **reasoning process** visibly — a visitor can see that it
  searched, found something, and synthesized it. Not a black box.
- The system **improves passively** — as I push new blog posts or projects, the
  AI learns without me manually updating anything.
- The codebase, if a technical visitor asked to see it, would make them want
  to hire me. Clean, typed, documented, tested where it matters.

---

## How I Want You to Work

**Step 1 — Analyze and plan.**
Read the existing workspace files. Study the advisory inputs above. Then produce
your architectural decision record: what you are building, what you chose, what
you rejected from the advisory inputs and why, and what you decided differently.
This is not a summary of my ideas — it is your architecture. Own it.

**Step 2 — Confirm before building.**
After the architectural plan, stop and say exactly:
`"Architecture finalized. Review the decisions above. Type 'build' to proceed."`

**Step 3 — Implement completely.**
On confirmation, implement every file. No placeholders. No truncation. No
"// TODO: implement this." Every file is complete, typed, documented, and
deployable. Output each file with its full path as the first line comment.

**Step 4 — Close with a Setup Checklist.**
After all files, output an ordered checklist of every manual action I must take:
account creation, environment variables, first deploy commands, database
migration steps, and how to verify the system is working end to end.

---

## Begin

Read the workspace. Then begin Step 1.
