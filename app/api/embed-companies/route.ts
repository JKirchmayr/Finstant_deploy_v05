import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ must be private!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function GET() {
  const { data: companies, error } = await supabase
    .from('companies')
    .select('*')
    .is('embedding', null);

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
  }

  let embeddedCount = 0;

  for (const company of companies) {
    const content = generateCompanyEmbeddingText(company);

    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: content,
      });

      const vector = response.data[0].embedding;

      const { error: updateError } = await supabase
        .from('companies')
        .update({
          embedding: vector,
        })
        .eq('id', company.id);

      if (updateError) {
        console.error(`❌ Update failed: ${company.name}`, updateError.message);
        continue;
      }

      embeddedCount++;
      console.log(`✅ Embedded: ${company.name}`);
    } catch (err) {
      console.error(`❌ OpenAI Error: ${company.name}`, err);
    }
  }

  return NextResponse.json({ success: true, embedded: embeddedCount });
}

function generateCompanyEmbeddingText(company: any): string {
  const lines = [`Company Name: ${company.name}`];
  if (company.description) lines.push(`Description: ${company.description}`);
  if (company.sector) lines.push(`Sector: ${company.sector}`);
  if (company.status) lines.push(`Status: ${company.status}`);
  if (company.sales_in_eurm) lines.push(`Sales (€M): ${company.sales_in_eurm}`);
  if (company.ebitda_in_eurm) lines.push(`EBITDA (€M): ${company.ebitda_in_eurm}`);
  if (company.entry_year) lines.push(`Entry Year: ${company.entry_year}`);
  return lines.join('\n');
}
