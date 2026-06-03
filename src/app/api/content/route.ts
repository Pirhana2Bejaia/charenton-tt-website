import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { verifySession } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  
  if (!key) return NextResponse.json({ error: 'Clé requise' }, { status: 400 });
  
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('key', key)
    .single();
    
  if (error && error.code !== 'PGRST116') { // Ignore "No rows found" error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data || null);
}

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const supabase = getServiceSupabase();
    
    // Check if exists
    const { data: existing } = await supabase.from('site_content').select('id').eq('key', body.key).single();
    
    if (existing) {
      const { data, error } = await supabase
        .from('site_content')
        .update({ title: body.title, content: body.content, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
        
      if (error) throw error;
      return NextResponse.json(data);
    } else {
      const { data, error } = await supabase
        .from('site_content')
        .insert([{ ...body, updated_at: new Date().toISOString() }])
        .select()
        .single();
        
      if (error) throw error;
      return NextResponse.json(data);
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
