import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/content";

export const alt = "Portfolio of Vivek Nilapalle";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social preview, generated at build time from content/profile.json. */
export default async function OpengraphImage() {
  const profile = await getProfile();
  const [first, ...rest] = profile.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 85% 0%, rgba(108,99,255,0.45), transparent 55%), radial-gradient(circle at 0% 100%, rgba(255,101,132,0.28), transparent 50%), #0b0b16",
          color: "#ececf4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#a29dff", letterSpacing: 2 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#4ade80" }} />
          {(profile.availability ?? "Portfolio").toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            {first}&nbsp;
            <span style={{ backgroundImage: "linear-gradient(120deg, #a29dff, #6c63ff 40%, #ff6584)", backgroundClip: "text", color: "transparent" }}>
              {rest.join(" ")}
            </span>
          </div>
          <div style={{ marginTop: 28, fontSize: 40, color: "#c4c4d4" }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a0a0b4" }}>{profile.tagline ?? ""}</div>
      </div>
    ),
    size,
  );
}
