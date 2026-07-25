import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || 'deathSurfing';
  const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()), 10);

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const token = process.env.GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN || '';

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables: { login: username, from, to },
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'GitHub API error' }, { status: res.status });
  }

  const json = await res.json();

  if (json.errors) {
    return NextResponse.json({ error: json.errors[0].message }, { status: 400 });
  }

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

  return NextResponse.json({
    contributions: calendar?.weeks?.map((w: { contributionDays: any[] }) =>
      w.contributionDays.map((d: { date: string; contributionCount: number; color: string }) => ({
        date: d.date,
        count: d.contributionCount,
        level: d.contributionCount === 0 ? 'NONE' : d.contributionCount <= 3 ? 'FIRST_QUARTILE' : d.contributionCount <= 6 ? 'SECOND_QUARTILE' : d.contributionCount <= 10 ? 'THIRD_QUARTILE' : 'FOURTH_QUARTILE',
        color: d.color,
      }))
    ) ?? [],
    totalContributions: calendar?.totalContributions ?? 0,
  });
}
