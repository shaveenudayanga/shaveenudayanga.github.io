// lib/ai/tools.ts
// Tool definitions for the AI assistant.
// These tools give the AI access to real data, making responses grounded and verifiable.

import { tool } from "ai";
import { z } from "zod";
import { searchKnowledge, getKnowledgeByType } from "@/lib/supabase/knowledge";
import { projects } from "@/content/projects";
import { getRecentGitHubActivity } from "./github-activity";

/**
 * Generates an embedding for a text query using Google AI.
 * Used at query time to embed the user's question before similarity search.
 */
async function embedQuery(text: string): Promise<number[]> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY for embeddings");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: { parts: [{ text }] },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`);
  }

  const data = await response.json();
  return data.embedding.values;
}

/**
 * All tools available to the AI assistant.
 * Each tool has a description that tells the LLM when and how to use it,
 * a Zod schema for parameter validation, and an execute function.
 */
export const aiTools = {
  searchKnowledge: tool({
    description:
      "Search my knowledge base for information about my projects, experience, blog posts, and skills. Use this when the user asks about specific work I have done, technologies I use, or details about my background. Returns the most relevant content chunks.",
    parameters: z.object({
      query: z
        .string()
        .describe("The search query, phrased as a natural language question"),
    }),
    execute: async ({ query }) => {
      try {
        const embedding = await embedQuery(query);
        const results = await searchKnowledge(embedding, 5, 0.65);

        if (results.length === 0) {
          return {
            found: false,
            message: "No relevant knowledge found for this query.",
          };
        }

        return {
          found: true,
          results: results.map((r) => ({
            content: r.content,
            source: r.metadata.source,
            type: r.metadata.type,
            project: r.metadata.project ?? null,
            relevance: Math.round(r.similarity * 100),
          })),
        };
      } catch (error) {
        console.error("searchKnowledge tool error:", error);
        return {
          found: false,
          message: "Knowledge search is temporarily unavailable.",
        };
      }
    },
  }),

  getProjectDetails: tool({
    description:
      "Get detailed information about a specific project by its slug or name. Use this when the user asks about a particular project and you need the full description, tech stack, links, and timeline.",
    parameters: z.object({
      projectName: z
        .string()
        .describe(
          "The name or slug of the project (e.g., 'lumina', 'lamitie', 'document-tracking', 'wheels-in-motion')"
        ),
    }),
    execute: async ({ projectName }) => {
      const normalizedName = projectName.toLowerCase().replace(/\s+/g, "-");

      // Try exact slug match first
      let project = projects.find((p) => p.slug === normalizedName);

      // Try partial match on title
      if (!project) {
        project = projects.find((p) =>
          p.title.toLowerCase().includes(normalizedName.replace(/-/g, " "))
        );
      }

      // Try partial match on slug
      if (!project) {
        project = projects.find(
          (p) =>
            p.slug.includes(normalizedName) ||
            normalizedName.includes(p.slug)
        );
      }

      if (!project) {
        // Fall back to knowledge base for projects not in the static list
        try {
          const docs = await getKnowledgeByType("project");
          const match = docs.find(
            (d) =>
              d.metadata.project?.toLowerCase().includes(normalizedName) ??
              false
          );
          if (match) {
            return {
              found: true,
              source: "knowledge_base",
              content: match.content,
              metadata: match.metadata,
            };
          }
        } catch {
          // Knowledge base unavailable, return not found
        }

        return {
          found: false,
          message: `No project found matching "${projectName}". Available projects: ${projects.map((p) => p.title).join(", ")}`,
        };
      }

      return {
        found: true,
        source: "static",
        title: project.title,
        description: project.longDescription,
        tech: project.tech,
        tags: project.tags.map((t) => t.label),
        date: project.date,
        githubUrl: project.githubUrl,
        demoUrl: project.demoUrl ?? null,
        videoUrl: project.videoUrl ?? null,
        featured: project.featured,
      };
    },
  }),

  getCurrentAvailability: tool({
    description:
      "Get my current availability for freelance work, collaboration, or employment. Use this when someone asks if I am available, how to hire me, or what kind of work I am looking for.",
    parameters: z.object({}),
    execute: async () => {
      return {
        available: true,
        status: "Available for freelance projects and collaboration",
        preferredWork: [
          "AI/ML system development",
          "Full-stack web applications",
          "IoT and embedded systems projects",
          "Backend architecture and API design",
        ],
        timezone: "Asia/Colombo (UTC+5:30)",
        contact: {
          email: "shaveenudayanga@gmail.com",
          whatsapp: "+94 77 118 6742",
          linkedin: "linkedin.com/in/shaveenudayanga",
        },
        responseTime: "Usually within 24 hours",
      };
    },
  }),

  getRecentActivity: tool({
    description:
      "Get my recent GitHub activity including commits, pull requests, and repository updates. Use this to demonstrate live awareness of what I have been working on recently. Results are cached for 1 hour.",
    parameters: z.object({}),
    execute: async () => {
      const activity = await getRecentGitHubActivity();

      if (activity.events.length === 0) {
        return {
          available: false,
          message:
            "GitHub activity data is currently unavailable. Check my GitHub profile at github.com/shaveenudayanga for the latest.",
        };
      }

      return {
        available: true,
        fetchedAt: activity.fetchedAt,
        recentEvents: activity.events,
        summary: `${activity.events.length} recent activities across ${new Set(activity.events.map((e) => e.repo)).size} repositories`,
      };
    },
  }),
};
