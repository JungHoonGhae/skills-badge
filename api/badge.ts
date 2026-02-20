import type { VercelRequest, VercelResponse } from '@vercel/node';

interface BadgeOptions {
  label: string;
  message: string;
  labelColor?: string;
  color?: string;
  style?: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
}

// SVG badge generator (shields.io compatible)
function generateBadge(options: BadgeOptions): string {
  const {
    label,
    message,
    labelColor = '#555',
    color = '#4c1',
    style = 'flat'
  } = options;

  const fontSize = 11;
  const padding = 6;
  
  // Calculate text widths (approximate)
  const labelWidth = Math.ceil(label.length * 6.6) + padding * 2;
  const messageWidth = Math.ceil(message.length * 6.6) + padding * 2;
  const totalWidth = labelWidth + messageWidth;

  if (style === 'flat-square') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <rect width="${totalWidth}" height="20" fill="${labelColor}"/>
  <rect x="${labelWidth}" width="${messageWidth}" height="20" fill="${color}"/>
  <text x="${labelWidth / 2}" y="14" fill="#fff" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11" text-anchor="middle">${escapeXml(label)}</text>
  <text x="${labelWidth + messageWidth / 2}" y="14" fill="#fff" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11" text-anchor="middle">${escapeXml(message)}</text>
</svg>`;
  }

  // flat style (default)
  const height = 20;
  const radius = 3;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}">
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#fff" stop-opacity=".7"/>
    <stop offset="1" stop-opacity=".7"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="${height}" rx="${radius}" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="${height}" fill="${labelColor}"/>
    <rect x="${labelWidth}" width="${messageWidth}" height="${height}" fill="${color}"/>
    <rect width="${totalWidth}" height="${height}" fill="url(#s)"/>
  </g>
  <rect width="${totalWidth}" height="${height}" rx="${radius}" fill="none" stroke="#000" stroke-opacity=".1"/>
  <g fill="#fff" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="${fontSize}" text-anchor="middle">
    <text x="${labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${escapeXml(label)}</text>
    <text x="${labelWidth / 2}" y="14">${escapeXml(label)}</text>
    <text x="${labelWidth + messageWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${escapeXml(message)}</text>
    <text x="${labelWidth + messageWidth / 2}" y="14">${escapeXml(message)}</text>
  </g>
</svg>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDownloads(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
}

async function getInstallCount(owner: string, repo: string): Promise<number | null> {
  try {
    const response = await fetch(`https://skills.sh/${owner}/${repo}`, {
      headers: {
        'User-Agent': 'skills-badge/1.0'
      },
      signal: AbortSignal.timeout(3000)
    });
    
    if (!response.ok) {
      return null;
    }
    
    const html = await response.text();
    
    const match = html.match(/(\d+)\s+total\s+installs/i);
    if (match) {
      return parseInt(match[1], 10);
    }
    
    return null;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { owner, repo } = req.query as { owner?: string; repo?: string };
  
  // Query params
  const style = (req.query.style as string) || 'flat';
  const label = (req.query.label as string) || 'skills.sh';
  const labelColor = req.query.labelColor as string;
  const color = req.query.color as string;
  
  const validStyles = ['flat', 'flat-square', 'plastic', 'for-the-badge', 'social'];
  const badgeStyle = validStyles.includes(style) ? style as BadgeOptions['style'] : 'flat';
  
  if (!owner || !repo) {
    const svg = generateBadge({
      label: 'skills.sh',
      message: 'invalid',
      color: '#9f9f9f',
      style: badgeStyle
    });
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    return res.send(svg);
  }
  
  const count = await getInstallCount(owner, repo);
  
  const svg = generateBadge({
    label,
    message: count !== null ? formatDownloads(count) : 'available',
    labelColor: labelColor || '#3b82f6',
    color: color || '#22c55e',
    style: badgeStyle
  });
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  return res.send(svg);
}
