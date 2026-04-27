const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Project {
  pid: string;
  name: string;
  slug: string;
  description: string;
  status: "RUNNING" | "ARCHIVED";
  github_url: string;
  stars: number;
  tags: { name: string }[];
}

export interface SkillCategory {
  name: string;
  get_name_display: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  proficiency: number;
  order: number;
}

export interface Experience {
  hash: string;
  date: string;
  message: string;
  org: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  secondary: string;
  secondary_level: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/projects/`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getSkills(): Promise<SkillCategory[]> {
  const res = await fetch(`${API_URL}/api/skills/`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function getExperience(): Promise<Experience[]> {
  const res = await fetch(`${API_URL}/api/experience/`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export async function getEducation(): Promise<Education> {
  const res = await fetch(`${API_URL}/api/education/`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch education");
  return res.json();
}

export async function getCertifications(): Promise<Certification[]> {
  const res = await fetch(`${API_URL}/api/certifications/`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch certifications");
  return res.json();
}
