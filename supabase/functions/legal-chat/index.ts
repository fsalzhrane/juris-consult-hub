
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback responses when OpenAI API is unavailable
const fallbackResponses = {
  greeting: "Hello! I'm the LawLink Legal Assistant. While our AI service is currently experiencing high demand, I can still provide some general information about Saudi Arabian legal matters. How can I assist you today?",
  general: "I understand you have a question about legal matters. Currently, our AI service is experiencing high demand. For specific legal advice, I recommend consulting with one of our qualified lawyers. Is there something specific you'd like to know about Saudi Arabian law?",
  family: "Family law in Saudi Arabia covers marriage, divorce, child custody, and inheritance. Recent reforms have improved women's rights in these areas. For specific advice on your situation, please consult with one of our family law specialists.",
  criminal: "Criminal law in Saudi Arabia is primarily based on Sharia law, though recent reforms have modernized aspects of the legal system. For specific questions about criminal matters, I recommend consulting with a qualified lawyer who specializes in this area.",
  property: "Property law in Saudi Arabia has evolved significantly in recent years, with new regulations concerning foreign ownership and real estate development. For specific property matters, consider scheduling a consultation with one of our property law experts.",
  contracts: "Contract law in Saudi Arabia combines Sharia principles with modern commercial regulations. Valid contracts require clear terms, mutual consent, and lawful purpose. For specific contract review or drafting assistance, please connect with one of our commercial law specialists.",
  default: "I apologize, but our AI service is currently experiencing high demand. For detailed legal guidance on your question, I recommend scheduling a consultation with one of our qualified lawyers who specialize in your area of concern."
};

function getFallbackResponse(message) {
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
    return fallbackResponses.greeting;
  } else if (message.includes('family') || message.includes('divorce') || message.includes('custody') || message.includes('marriage')) {
    return fallbackResponses.family;
  } else if (message.includes('criminal') || message.includes('crime') || message.includes('jail') || message.includes('prison')) {
    return fallbackResponses.criminal;
  } else if (message.includes('property') || message.includes('real estate') || message.includes('land') || message.includes('house')) {
    return fallbackResponses.property;
  } else if (message.includes('contract') || message.includes('agreement') || message.includes('terms')) {
    return fallbackResponses.contracts;
  } else {
    return fallbackResponses.default;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, chatHistory } = await req.json();

    // Check if OpenAI API key is available
    if (!openAIApiKey) {
      console.log("OpenAI API key is not configured. Using fallback response.");
      const fallbackResponse = getFallbackResponse(message);
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

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

    try {
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
        
        // Provide a fallback response based on the user's message
        const fallbackResponse = getFallbackResponse(message);
        
        return new Response(JSON.stringify({ response: fallbackResponse }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      return new Response(JSON.stringify({ response: aiResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (apiError) {
      console.error('Error calling OpenAI API:', apiError);
      
      // Provide a fallback response based on the user's message
      const fallbackResponse = getFallbackResponse(message);
      
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
  } catch (error) {
    console.error('Error in legal-chat function:', error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred. Please try again later." }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
