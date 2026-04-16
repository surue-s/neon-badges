export default async function handler(req, res) {
  try {
    const username = req.query.u || "suru-e";

    // Fetch from Komarev
    const response = await fetch(
      `https://komarev.com/ghpvc/?username=${username}`
    );
    const text = await response.text();

    // Extract number
    const views = text.match(/\d+/)?.[0] || "0";

    const svg = `
<svg height="40" viewBox="0 0 260 40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow-red">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect x="2" y="2" width="256" height="36" rx="10"
        fill="none" stroke="#8b0000" stroke-width="2.5"
        filter="url(#glow-red)"/>

  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
        fill="#8b0000" font-family="monospace" font-size="13"
        filter="url(#glow-red)">
    PROFILE VIEWS: ${views}
  </text>
</svg>
`;

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-maxage=300"); // 5 min cache
    res.status(200).send(svg);

  } catch (err) {
    res.status(500).send("Error");
  }
}