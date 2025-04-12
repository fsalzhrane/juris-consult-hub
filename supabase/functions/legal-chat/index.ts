
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const awanLLMApiKey = Deno.env.get('AWANLLM_API_KEY');
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback responses when API is unavailable
const fallbackResponses = {
  greeting: "Hello! I'm the Awan LLM Legal Assistant. While our AI service is currently experiencing high demand, I can still provide some general information about Saudi Arabian legal matters. How can I assist you today?",
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

    // If no Awan LLM API key is provided, use the fallback response
    if (!awanLLMApiKey) {
      console.log("Awan LLM API key is not configured. Using fallback response.");
      const fallbackResponse = getFallbackResponse(message);
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // Format previous messages for context
    const formattedHistory = (chatHistory || []).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Create system message for legal assistant
    const systemMessage = {
      role: "system",
      content: "You are the Awan LLM Legal Assistant, specialized in Saudi Arabian law. Provide helpful, accurate legal information but clarify that you're not giving legal advice. For complex legal issues, suggest consulting with a qualified lawyer. Be professional, concise, and focused on legal matters."
    };

    // Create messages array with system message, chat history, and new user message
    const messages = [
      systemMessage,
      ...formattedHistory,
      { role: "user", content: message }
    ];

    // Call Awan LLM API
    try {
      console.log("Calling Awan LLM API");
      const response = await fetch("https://api.awanllm.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${awanLLMApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "Meta-Llama-3-8B-Instruct",
          "messages": messages,
          "repetition_penalty": 1.1,
          "temperature": 0.7,
          "top_p": 0.9,
          "top_k": 40,
          "max_tokens": 1024,
          "stream": false
        })
      });

      if (!response.ok) {
        console.error(`Awan LLM API responded with status: ${response.status}`);
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Awan LLM API response:", data);
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const botResponse = data.choices[0].message.content;
        return new Response(JSON.stringify({ response: botResponse }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (apiError) {
      console.error("Error calling Awan LLM API:", apiError);
      
      // Use fallback responses if API call fails
      const fallbackResponse = getFallbackResponse(message);
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
  } catch (error) {
    console.error('Error in legal-chat function:', error);
    return new Response(JSON.stringify({ 
      error: "An unexpected error occurred. Please try again later.",
      response: "I apologize for the technical difficulties. Please try again or consult with one of our lawyers for immediate assistance."
    }), {
      status: 200, // Return 200 even for errors, with an error message in the response
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
