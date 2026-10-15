import { NextRequest, NextResponse } from 'next/server';
import { getSubmissions, getStudentsSummary } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode') || 'all';

    if (mode === 'summary') {
      const summary = await getStudentsSummary();
      return NextResponse.json({ success: true, students: summary });
    }

    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const submissions = await getSubmissions(limit);
    const summary = await getStudentsSummary();

    return NextResponse.json({
      success: true,
      submissions,
      students: summary
    });
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
