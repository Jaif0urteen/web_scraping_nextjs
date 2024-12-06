import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cityName = searchParams.get('city');

  try {
    // Fetch HTML content of the page
    const res = await fetch(`https://www.magicbricks.com/new-projects-${cityName}`);
    const html = await res.text();

    // Parse the HTML
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Query all project blocks
    const projectBlocks = document.querySelectorAll('.projdis__prjcard__leftcont');

    // Map project details into an array
    const projects = Array.from(projectBlocks).map((block) => {
      const projectName = block.querySelector('.mghome__prjblk__prjname')?.textContent?.trim() || 'N/A';
      const location = block.querySelector('.mghome__prjblk__locname')?.textContent?.trim() || 'N/A';
      const priceRange = block.querySelector('.mghome__prjblk__price')?.textContent?.trim() || 'N/A';
      const bhk = block.querySelector('.mghome__prjblk__bhk')?.textContent?.trim() || 'N/A';
       // Extract the image URL using getAttribute('src')
       const img = block.querySelector('.mghome__prjblk__imgsec__img')?.getAttribute('src') || 'N/A';

      
      return { projectName, location, priceRange,bhk , img };
    });

    return NextResponse.json({ city: cityName, projects });
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project data. Please try again later.' },
      { status: 500 }
    );
  }
}
