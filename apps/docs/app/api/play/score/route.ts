import { type VerifyReport, verifyUrl } from "@dualmark/cli";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIMEOUT_MS = 12_000;
const MAX_URL_LENGTH = 2048;

type Level = "Advanced" | "Standard" | "Basic" | "Below Basic";

function classify(report: VerifyReport): {
  level: Level;
  ratio: number;
  percentage: number;
} {
  const ratio = report.maxScore > 0 ? report.score / report.maxScore : 0;
  const percentage = Math.round(ratio * 100);
  let level: Level;
  if (ratio >= 0.95) level = "Advanced";
  else if (ratio >= 0.8) level = "Standard";
  else if (ratio >= 0.6) level = "Basic";
  else level = "Below Basic";
  return { level, ratio, percentage };
}

function safeParseUrl(raw: string): URL | null {
  if (!raw || raw.length > MAX_URL_LENGTH) return null;
  let withProto = raw.trim();
  if (!/^https?:\/\//i.test(withProto)) {
    withProto = `https://${withProto}`;
  }
  try {
    const u = new URL(withProto);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    if (u.hostname === "localhost" || u.hostname === "127.0.0.1") return null;
    if (u.hostname.endsWith(".local")) return null;
    return u;
  } catch {
    return null;
  }
}

function summarize(report: VerifyReport) {
  const { level, ratio, percentage } = classify(report);
  return {
    url: report.url,
    mdUrl: report.mdUrl,
    score: report.score,
    maxScore: report.maxScore,
    percentage,
    ratio,
    level,
    durationMs: report.durationMs,
    skippedNegotiation: report.skippedNegotiation,
    passed: report.passed.map((c) => ({
      id: c.id,
      description: c.description,
      severity: c.severity,
      weight: c.weight,
      message: c.message,
    })),
    failed: report.failed.map((c) => ({
      id: c.id,
      description: c.description,
      severity: c.severity,
      weight: c.weight,
      message: c.message,
    })),
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rawUrl =
    typeof body === "object" && body !== null && "url" in body
      ? (body as { url: unknown }).url
      : null;

  if (typeof rawUrl !== "string") {
    return NextResponse.json(
      { error: "Missing or non-string `url` in body" },
      { status: 400 },
    );
  }

  const parsed = safeParseUrl(rawUrl);
  if (!parsed) {
    return NextResponse.json(
      {
        error:
          "Invalid URL. Provide a public https URL (no localhost / .local hosts).",
      },
      { status: 400 },
    );
  }

  try {
    const report = await verifyUrl(parsed.toString(), {
      timeoutMs: TIMEOUT_MS,
      userAgent:
        "Dualmark-Playground/0.1 (+https://dualmark.dev/play; verify-on-demand)",
    });
    return NextResponse.json(summarize(report), {
      headers: { "cache-control": "no-store" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        error: `Verification failed: ${message}`,
        url: parsed.toString(),
      },
      { status: 502 },
    );
  }
}
