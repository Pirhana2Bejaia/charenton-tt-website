import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      // Simulation of success for demo without API key
      console.log('Demande de contact reçue:', { name, email, subject, message });
      return NextResponse.json({ success: true, dummy: true });
    }

    const { error } = await resend.emails.send({
      from: 'Charenton TT <onboarding@resend.dev>',
      to: 'charentontt@gmail.com',
      replyTo: email,
      subject: `[Contact CTT] ${subject}`,
      html: `
        <h2>Nouveau message depuis le site Charenton TT</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
