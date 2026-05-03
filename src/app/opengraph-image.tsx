import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Glow indigo sutil no topo — linear-gradient é suportado pelo ImageResponse */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "60%",
            background:
              "linear-gradient(180deg, rgba(99,102,241,0.14) 0%, transparent 100%)",
          }}
        />

        {/* Logo grande e centralizado em indigo-400 */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#818CF8",
            letterSpacing: "-3px",
            marginBottom: 28,
          }}
        >
          GetDashia
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#71717A",
            textAlign: "center",
            maxWidth: 720,
            lineHeight: 1.5,
          }}
        >
          Atribuição multi-canal para gestores de tráfego
        </div>

        {/* URL no rodapé */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            fontSize: 22,
            color: "#3F3F46",
          }}
        >
          getdashia.com.br
        </div>
      </div>
    )
  );
}
