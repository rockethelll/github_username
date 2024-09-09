import { z } from 'zod';

// Define a function to format the date at format dd MMM yyyy
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Define a schema for the user object
export const UserSchema = z.object({
  avatar_url: z.string(),
  login: z.string().nullable(),
  name: z.string().nullable(),
  html_url: z.string(),
  created_at: z.string().transform(formatDate),
  bio: z.string().nullable().nullable(),
  public_repos: z.number().nullable(),
  followers: z.number().nullable(),
  following: z.number().nullable(),
  location: z.string().nullable(),
  blog: z.string().nullable(),
  twitter_username: z.string().nullable(),
  company: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;
