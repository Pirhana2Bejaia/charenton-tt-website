import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { verifySession } from '@/lib/auth';

export async function GET() {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from('bureau_members')
    .select('*')
    .order('order_index');
    
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await verifySession())) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const supabase = getServiceSupabase();
    
    const { data: latest } = await supabase.from('bureau_members').select('order_index').order('order_index', { ascending: false }).limit(1);
    const nextOrder = latest && latest.length > 0 ? latest[0].order_index + 1 : 0;
    
    const { data, error } = await supabase
      .from('bureau_members')
      .insert([{ ...body, order_index: nextOrder }])
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
