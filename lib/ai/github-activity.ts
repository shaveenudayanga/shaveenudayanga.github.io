// lib/ai/github-activity.ts
// Fetches recent GitHub activity with a 1-hour in-memory cache.
// Requires GITHUB_TOKEN environment variable for authenticated API access.

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string; sha: string }[];
    action?: string;
    ref?: string;
    ref_type?: string;
    pull_request?: { title: string; html_url: string };
  };
}

export interface RecentActivity {
  events: FormattedEvent[];
  fetchedAt: string;
}

export interface FormattedEvent {
  type: string;
  repo: string;
  description: string;
  date: string;
}

// In-memory cache with 1-hour TTL
let cachedActivity: RecentActivity | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Fetches recent public GitHub activity for the configured user.
 * Results are cached in memory for 1 hour to avoid rate limits
 * and reduce latency on repeated requests.
 *
 * Requires GITHUB_TOKEN env var for authenticated access
 * (higher rate limits, access to private activity if scoped).
 */
export async function getRecentGitHubActivity(): Promise<RecentActivity> {
  const now = Date.now();

  // Return cached data if still fresh
  if (cachedActivity && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedActivity;
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN not set, returning empty activity");
    return { events: [], fetchedAt: new Date().toISOString() };
  }

  try {
    const response = await fetch(
      "https://api.github.com/users/shaveenudayanga/events/public?per_page=20",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        // Next.js fetch cache: revalidate after 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
      // Return stale cache if available, otherwise empty
      if (cachedActivity) return cachedActivity;
      return { events: [], fetchedAt: new Date().toISOString() };
    }

    const events: GitHubEvent[] = await response.json();
    const formatted = formatEvents(events);

    // Update cache
    cachedActivity = {
      events: formatted,
      fetchedAt: new Date().toISOString(),
    };
    cacheTimestamp = now;

    return cachedActivity;
  } catch (error) {
    console.error("Failed to fetch GitHub activity:", error);
    // Return stale cache on network failure
    if (cachedActivity) return cachedActivity;
    return { events: [], fetchedAt: new Date().toISOString() };
  }
}

/**
 * Formats raw GitHub events into human-readable descriptions.
 */
function formatEvents(events: GitHubEvent[]): FormattedEvent[] {
  return events
    .map((event) => {
      const repo = event.repo.name.replace("shaveenudayanga/", "");
      const date = new Date(event.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      switch (event.type) {
        case "PushEvent": {
          const commits = event.payload.commits ?? [];
          const count = commits.length;
          const latestMsg =
            commits.length > 0 ? commits[commits.length - 1].message : "";
          return {
            type: "push",
            repo,
            description: `Pushed ${count} commit${count !== 1 ? "s" : ""} to ${repo}${latestMsg ? `: "${latestMsg}"` : ""}`,
            date,
          };
        }
        case "CreateEvent":
          return {
            type: "create",
            repo,
            description: `Created ${event.payload.ref_type ?? "repository"} ${event.payload.ref ? `"${event.payload.ref}" in ` : ""}${repo}`,
            date,
          };
        case "PullRequestEvent":
          return {
            type: "pr",
            repo,
            description: `${event.payload.action ?? "opened"} PR "${event.payload.pull_request?.title}" in ${repo}`,
            date,
          };
        case "IssuesEvent":
          return {
            type: "issue",
            repo,
            description: `${event.payload.action ?? "opened"} an issue in ${repo}`,
            date,
          };
        case "WatchEvent":
          return {
            type: "star",
            repo,
            description: `Starred ${event.repo.name}`,
            date,
          };
        case "ForkEvent":
          return {
            type: "fork",
            repo,
            description: `Forked ${event.repo.name}`,
            date,
          };
        default:
          return null;
      }
    })
    .filter((e): e is FormattedEvent => e !== null)
    .slice(0, 10);
}
