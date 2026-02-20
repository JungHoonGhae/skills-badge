import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const LOGO_SVG = `<path fill="#fff" d="M6.5 2h7l-4 7h4l-7.5 9 2.5-6h-4l4-7h-2z"/>`;

interface BadgeOptions {
  label: string;
  message: string;
  labelColor?: string;
  color?: string;
  style?: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social';
  showLogo?: boolean;
}

function generateBadge(options: BadgeOptions): string {
  const {
    label,
    message,
    labelColor = '#555',
    color = '#4c1',
    style = 'flat',
    showLogo = true
  } = options;

  const fontSize = 11;
  const padding = 6;
  const hasLabel = label.length > 0;
  const logoWidth = showLogo ? 14 : 0;
  const logoPadding = showLogo ? 8 : 0;
  
  const labelTextWidth = hasLabel ? Math.ceil(label.length * 6.6) + padding * 2 : 0;
  const labelWidth = showLogo ? logoWidth + logoPadding + labelTextWidth : labelTextWidth || padding * 2;
  const messageWidth = Math.ceil(message.length * 6.6) + padding * 2;
  const totalWidth = (labelWidth > 0 ? labelWidth : logoWidth + logoPadding) + messageWidth;

  const logoSvg = showLogo ? `<svg x="4" y="3" width="14" height="14" viewBox="0 0 16 16">${LOGO_SVG}</svg>` : '';
  const textX = showLogo && hasLabel ? logoWidth + logoPadding + labelTextWidth / 2 : (hasLabel ? labelWidth / 2 : 0);
  const labelText = hasLabel ? `<text x="${textX}" y="14" fill="#fff" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11" text-anchor="middle">${escapeXml(label)}</text>` : '';

  const actualLabelWidth = labelWidth > 0 ? labelWidth : logoWidth + logoPadding;

  if (style === 'flat-square') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <rect width="${totalWidth}" height="20" fill="${labelColor}"/>
  <rect x="${actualLabelWidth}" width="${messageWidth}" height="20" fill="${color}"/>
  ${logoSvg}${labelText}
  <text x="${actualLabelWidth + messageWidth / 2}" y="14" fill="#fff" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11" text-anchor="middle">${escapeXml(message)}</text>
</svg>`;
  }

  const height = 20;
  const radius = 3;

  const flatLabelText = hasLabel ? `<text x="${textX}" y="15" fill="#010101" fill-opacity=".3">${escapeXml(label)}</text><text x="${textX}" y="14">${escapeXml(label)}</text>` : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}">
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#fff" stop-opacity=".7"/>
    <stop offset="1" stop-opacity=".7"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="${height}" rx="${radius}" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${actualLabelWidth}" height="${height}" fill="${labelColor}"/>
    <rect x="${actualLabelWidth}" width="${messageWidth}" height="${height}" fill="${color}"/>
    <rect width="${totalWidth}" height="${height}" fill="url(#s)"/>
  </g>
  <rect width="${totalWidth}" height="${height}" rx="${radius}" fill="none" stroke="#000" stroke-opacity=".1"/>
  ${logoSvg}
  <g fill="#fff" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="${fontSize}" text-anchor="middle">
    ${flatLabelText}
    <text x="${actualLabelWidth + messageWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${escapeXml(message)}</text>
    <text x="${actualLabelWidth + messageWidth / 2}" y="14">${escapeXml(message)}</text>
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

async function getInstallCount(owner: string, repo: string, skill?: string): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const path = skill ? `${owner}/${repo}/${skill}` : `${owner}/${repo}`;
    const response = await fetch(`https://skills.sh/${path}`, {
      headers: {
        'User-Agent': 'skills-badge/1.0'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return null;
    }
    
    const html = await response.text();
    
    const totalMatch = html.match(/(\d+)\s*(?:<!--[^>]*-->\s*)*total\s+installs/i);
    if (totalMatch) {
      return parseInt(totalMatch[1], 10);
    }
    
    const weeklyMatch = html.match(/Weekly\s+Installs\s*(\d+)/i);
    if (weeklyMatch) {
      return parseInt(weeklyMatch[1], 10);
    }
    
    return null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pathname = request.nextUrl.pathname;
  
  const pathParts = pathname.split('/').filter(Boolean);
  const owner = pathParts[1];
  const repo = pathParts[2];
  const skill = pathParts[3];
  
  const style = searchParams.get('style') || 'flat';
  const label = searchParams.get('label') || '';
  const labelColor = searchParams.get('labelColor');
  const color = searchParams.get('color');
  const logo = searchParams.get('logo') !== 'false';
  
  const validStyles = ['flat', 'flat-square', 'plastic', 'for-the-badge', 'social'];
  const badgeStyle = validStyles.includes(style) ? style as BadgeOptions['style'] : 'flat';
  
  if (!owner || !repo) {
    const svg = generateBadge({
      label: '',
      message: 'invalid',
      color: '#9f9f9f',
      style: badgeStyle,
      showLogo: logo
    });
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 's-maxage=86400, stale-while-revalidate',
      },
    });
  }
  
  const count = await getInstallCount(owner, repo, skill);
  
  const svg = generateBadge({
    label,
    message: count !== null ? formatDownloads(count) : 'available',
    labelColor: labelColor || '#3b82f6',
    color: color || '#22c55e',
    style: badgeStyle,
    showLogo: logo
  });
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
    },
  });
}
