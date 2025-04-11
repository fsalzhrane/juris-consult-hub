
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, chatHistory } = await req.json();

    // Prepare conversation history for OpenAI
    const messages = [];
    
    // Add system message to set the context for the AI
    messages.push({
      role: "system", 
      content: "You are the LawLink Legal Assistant, an AI legal assistant that specializes in Saudi Arabian law. " +
               "You provide accurate, helpful information about legal matters in Saudi Arabia. " +
               "Your responses should be informative but remember to mention that you provide general legal information, " +
               "not legal advice, and users should consult with a qualified lawyer for specific cases. " +
               "Be concise, professional, and empathetic. If asked about a legal topic outside your knowledge, " +
               "admit limitations and suggest consulting a lawyer."
    });

    // Add chat history
    if (chatHistory && chatHistory.length > 0) {
      for (const chat of chatHistory) {
        messages.push({
          role: chat.role === 'user' ? 'user' : 'assistant',
          content: chat.content
        });
      }
    }

    // Add the new user message
    if (message) {
      messages.push({
        role: 'user',
        content: message
      });
    }

    console.log("Sending request to OpenAI with messages:", messages);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API Error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in legal-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
