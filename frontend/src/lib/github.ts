export interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

export async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/Debrupbanik/repos?sort=updated&per_page=100",
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!res.ok) {
      console.error("GitHub API error:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}
