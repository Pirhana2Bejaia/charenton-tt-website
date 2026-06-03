import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { verifySession } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  
  const supabase = getServiceSupabase();
  let query = supabase.from('posts').select('*').order('date', { ascending: false });
  
  if (year) {
    query = query.eq('year', parseInt(year));
  }
  
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const year = new Date(body.date).getFullYear();
    
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('posts')
      .insert([{ ...body, year }])
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
