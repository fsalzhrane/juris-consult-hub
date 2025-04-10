
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// We'll use a completely free model from Hugging Face
// No API key is required for most public models

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced fallback responses with more legal topics
const fallbackResponses = {
  greeting: "Hello! I'm the LawLink Legal Assistant. While our AI service is currently experiencing high demand, I can still provide some general information about Saudi Arabian legal matters. How can I assist you today?",
  general: "I understand you have a question about legal matters. Currently, our AI service is experiencing high demand. For specific legal advice, I recommend consulting with one of our qualified lawyers. Is there something specific you'd like to know about Saudi Arabian law?",
  family: "Family law in Saudi Arabia covers marriage, divorce, child custody, and inheritance. Recent reforms have improved women's rights in these areas. For specific advice on your situation, please consult with one of our family law specialists.",
  criminal: "Criminal law in Saudi Arabia is primarily based on Sharia law, though recent reforms have modernized aspects of the legal system. For specific questions about criminal matters, I recommend consulting with a qualified lawyer who specializes in this area.",
  property: "Property law in Saudi Arabia has evolved significantly in recent years, with new regulations concerning foreign ownership and real estate development. For specific property matters, consider scheduling a consultation with one of our property law experts.",
  contracts: "Contract law in Saudi Arabia combines Sharia principles with modern commercial regulations. Valid contracts require clear terms, mutual consent, and lawful purpose. For specific contract review or drafting assistance, please connect with one of our commercial law specialists.",
  employment: "Employment law in Saudi Arabia has undergone significant reforms under Vision 2030, with changes to labor regulations, Saudization policies, and worker protections. For specific employment-related questions, I recommend consulting with our labor law experts.",
  business: "Business law in Saudi Arabia covers company formation, commercial transactions, and regulatory compliance. The Kingdom has been actively modernizing its business environment to attract foreign investment. For specific business legal matters, please connect with our commercial law team.",
  intellectual: "Intellectual property law in Saudi Arabia protects patents, trademarks, copyright, and trade secrets. The Kingdom has strengthened IP protections in recent years. For assistance with IP registration or infringement issues, consult with our intellectual property specialists.",
  taxation: "Taxation in Saudi Arabia primarily consists of Zakat for Saudi nationals and income tax for foreign businesses. Recent reforms have introduced Value Added Tax (VAT). For tax planning or compliance assistance, please speak with our tax law experts.",
  default: "I apologize, but our AI service is currently experiencing high demand. For detailed legal guidance on your question, I recommend scheduling a consultation with one of our qualified lawyers who specialize in your area of concern."
};

function getFallbackResponse(message) {
  if (!message) return fallbackResponses.greeting;
  
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi ') || message.includes('hey')) {
    return fallbackResponses.greeting;
  } else if (message.includes('family') || message.includes('divorce') || message.includes('custody') || message.includes('marriage') || message.includes('inheritance')) {
    return fallbackResponses.family;
  } else if (message.includes('criminal') || message.includes('crime') || message.includes('jail') || message.includes('prison') || message.includes('arrest')) {
    return fallbackResponses.criminal;
  } else if (message.includes('property') || message.includes('real estate') || message.includes('land') || message.includes('house') || message.includes('ownership')) {
    return fallbackResponses.property;
  } else if (message.includes('contract') || message.includes('agreement') || message.includes('terms') || message.includes('obligations')) {
    return fallbackResponses.contracts;
  } else if (message.includes('work') || message.includes('job') || message.includes('employ') || message.includes('labor') || message.includes('salary')) {
    return fallbackResponses.employment;
  } else if (message.includes('business') || message.includes('company') || message.includes('corporation') || message.includes('startup')) {
    return fallbackResponses.business;
  } else if (message.includes('patent') || message.includes('trademark') || message.includes('copyright') || message.includes('intellectual property')) {
    return fallbackResponses.intellectual;
  } else if (message.includes('tax') || message.includes('vat') || message.includes('zakat') || message.includes('customs')) {
    return fallbackResponses.taxation;
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
    
    console.log("Received message:", message);

    try {
      // Format conversation history for the API
      const formattedChatHistory = chatHistory ? chatHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })) : [];
      
      // Prepare the conversation with system prompt and user messages
      const conversation = [
        {
          role: "system", 
          content: "You are the LawLink Legal Assistant, an AI legal assistant that specializes in Saudi Arabian law. " +
                  "You provide accurate, helpful information about legal matters in Saudi Arabia. " +
                  "Your responses should be informative but remember to mention that you provide general legal information, " +
                  "not legal advice, and users should consult with a qualified lawyer for specific cases. " +
                  "Be concise, professional, and empathetic. If asked about a legal topic outside your knowledge, " +
                  "admit limitations and suggest consulting a lawyer."
        },
        ...formattedChatHistory
      ];

      // Add the new user message if it exists
      if (message) {
        conversation.push({
          role: 'user',
          content: message
        });
      }

      console.log("Sending request to Hugging Face with prompt");
      
      // Call Hugging Face Inference API with a free-to-use model
      const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            messages: conversation
          },
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true
          }
        }),
      });

      if (!response.ok) {
        // If the Hugging Face API fails, use our fallback responses
        const errorText = await response.text();
        console.error("Hugging Face API Error:", errorText);
        
        const fallbackResponse = getFallbackResponse(message);
        
        return new Response(JSON.stringify({ 
          response: fallbackResponse,
          success: false,
          debug: {
            error: {
              type: "huggingface_api_error",
              message: errorText
            }
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      }

      const data = await response.json();
      console.log("Hugging Face API Response:", JSON.stringify(data));
      
      // Extract the AI response text
      let aiResponse = "";
      
      // Different models return results in different formats
      if (data && data.generated_text) {
        aiResponse = data.generated_text;
      } else if (data && Array.isArray(data) && data[0] && data[0].generated_text) {
        aiResponse = data[0].generated_text;
      } else if (data && data.choices && data.choices[0] && data.choices[0].message) {
        aiResponse = data.choices[0].message.content;
      } else {
        // If we can't parse the response, use fallback
        const fallbackResponse = getFallbackResponse(message);
        return new Response(JSON.stringify({ 
          response: fallbackResponse,
          success: false,
          debug: {
            error: {
              type: "response_parsing_error",
              message: "Could not parse Hugging Face API response"
            },
            response: data
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
      }

      return new Response(JSON.stringify({ response: aiResponse, success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (apiError) {
      console.error('Error calling Hugging Face API:', apiError);
      
      // Provide a fallback response based on the user's message
      const fallbackResponse = getFallbackResponse(message);
      
      return new Response(JSON.stringify({ 
        response: fallbackResponse,
        debug: {
          error: apiError.message
        }
      }), {
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
