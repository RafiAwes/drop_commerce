"use client";

import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { aiProductDescriptionSummary } from '@/ai/flows/ai-product-description-summary';
import { Card, CardContent } from '@/components/ui/card';

interface AIInsightProps {
  productDescription: string;
}

export function AIInsight({ productDescription }: AIInsightProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string[] | null>(null);

  const handleGenerateInsight = async () => {
    setLoading(true);
    try {
      const result = await aiProductDescriptionSummary({ productDescription });
      setSummary(result.summary);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8">
      {!summary ? (
        <Button 
          onClick={handleGenerateInsight} 
          disabled={loading}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 text-primary group"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing product...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
              <span className="font-bold">Generate AI Insights</span>
            </>
          )}
        </Button>
      ) : (
        <Card className="border-indigo-100 bg-indigo-50/30 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-indigo-100/50 px-4 py-2 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">AI Summary</span>
          </div>
          <CardContent className="p-4">
            <ul className="space-y-3">
              {summary.map((point, index) => (
                <li key={index} className="flex items-start space-x-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}