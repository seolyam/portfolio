import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#faf8f5",
          color: "#141413",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#9e1b32", letterSpacing: 4 }}>
          {site.role.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 108, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 36, marginTop: 28, color: "#575551" }}>
            {site.focus}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(20,20,19,0.2)",
            paddingTop: 24,
            fontSize: 28,
            color: "#575551",
          }}
        >
          <span>{site.lead}</span>
          <span>seolyam.com</span>
        </div>
      </div>
    ),
    size,
  );
}
