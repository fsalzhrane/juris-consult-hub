
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// We'll use a completely free model from the Hugging Face API

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced fallback responses with more legal topics
const fallbackResponses = {
  greeting: "Hello! I'm the LawLink Legal Assistant. I can provide general information about Saudi Arabian legal matters. How can I assist you today?",
  general: "I understand you have a question about legal matters. For specific legal advice, I recommend consulting with one of our qualified lawyers. Is there something specific you'd like to know about Saudi Arabian law?",
  family: "Family law in Saudi Arabia covers marriage, divorce, child custody, and inheritance. Recent reforms have improved women's rights in these areas. For specific advice on your situation, please consult with one of our family law specialists.",
  criminal: "Criminal law in Saudi Arabia is primarily based on Sharia law, though recent reforms have modernized aspects of the legal system. For specific questions about criminal matters, I recommend consulting with a qualified lawyer who specializes in this area.",
  property: "Property law in Saudi Arabia has evolved significantly in recent years, with new regulations concerning foreign ownership and real estate development. For specific property matters, consider scheduling a consultation with one of our property law experts.",
  contracts: "Contract law in Saudi Arabia combines Sharia principles with modern commercial regulations. Valid contracts require clear terms, mutual consent, and lawful purpose. For specific contract review or drafting assistance, please connect with one of our commercial law specialists.",
  employment: "Employment law in Saudi Arabia has undergone significant reforms under Vision 2030, with changes to labor regulations, Saudization policies, and worker protections. For specific employment-related questions, I recommend consulting with our labor law experts.",
  business: "Business law in Saudi Arabia covers company formation, commercial transactions, and regulatory compliance. The Kingdom has been actively modernizing its business environment to attract foreign investment. For specific business legal matters, please connect with our commercial law team.",
  intellectual: "Intellectual property law in Saudi Arabia protects patents, trademarks, copyright, and trade secrets. The Kingdom has strengthened IP protections in recent years. For assistance with IP registration or infringement issues, consult with our intellectual property specialists.",
  taxation: "Taxation in Saudi Arabia primarily consists of Zakat for Saudi nationals and income tax for foreign businesses. Recent reforms have introduced Value Added Tax (VAT). For tax planning or compliance assistance, please speak with our tax law experts.",
  default: "I can provide general information about Saudi Arabian legal matters. For detailed guidance on your specific situation, I recommend scheduling a consultation with one of our qualified lawyers who specialize in your area of concern."
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

// Simple rule-based response generator for legal questions
function generateSmartResponse(message, chatHistory) {
  const lowerMessage = message.toLowerCase();
  const keywords = {
    'divorce': 'Divorce proceedings in Saudi Arabia vary based on whether they are initiated by the husband or wife. Recent reforms have improved women\'s rights in divorce cases. For the specific process applicable to your situation, consultation with a family law expert is recommended.',
    'will': 'Islamic inheritance law (Shariah) governs succession in Saudi Arabia. Writing a will (Wasiyah) allows you to distribute up to one-third of your estate to non-heirs. For comprehensive estate planning, consult with one of our experts in inheritance law.',
    'business': 'Starting a business in Saudi Arabia requires choosing a legal structure, obtaining necessary licenses, and following specific registration procedures. Foreign investors have additional requirements. Our commercial law team can guide you through the process for your specific business type.',
    'visa': 'Saudi Arabia offers various visa types including business, tourist, work, and residence visas. Each has specific requirements and procedures. For accurate information on your visa situation, please consult with our immigration specialists.',
    'contract': 'Contracts in Saudi Arabia must comply with Shariah principles and Saudi law. Key elements include clear terms, lawful purpose, and capacity of parties. For contract drafting or review specific to your situation, please connect with our contract law specialists.'
  };
  
  // Check for keyword matches
  for (const [key, response] of Object.entries(keywords)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Check for common question patterns
  if (lowerMessage.includes('how do i') || lowerMessage.includes('how can i') || lowerMessage.includes('what is the process')) {
    return "To provide accurate guidance on this process in Saudi Arabia, I would need more specific details about your situation. For personalized legal advice, I recommend scheduling a consultation with one of our specialized lawyers who can address your particular circumstances.";
  }
  
  if (lowerMessage.includes('is it legal') || lowerMessage.includes('am i allowed')) {
    return "Legal permissibility in Saudi Arabia depends on specific circumstances and recent regulatory changes. While I can provide general information, for a definitive answer regarding your particular situation, consulting with one of our legal experts would be advisable.";
  }
  
  if (lowerMessage.includes('what are my rights')) {
    return "Your legal rights in Saudi Arabia depend on your specific situation, citizenship status, and the particular area of law involved. Recent reforms have changed many aspects of rights protection in the Kingdom. For a comprehensive understanding of your rights in your specific circumstances, please consult with our legal specialists.";
  }
  
  // General response if no patterns match
  return fallbackResponses.general;
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
      // First try our local smart response generator
      const smartResponse = generateSmartResponse(message, chatHistory);
      
      // Return the generated response
      return new Response(JSON.stringify({ 
        response: smartResponse, 
        success: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
      
    } catch (apiError) {
      console.error('Error generating response:', apiError);
      
      // Provide a fallback response based on the user's message
      const fallbackResponse = getFallbackResponse(message);
      
      return new Response(JSON.stringify({ 
        response: fallbackResponse,
        success: false,
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
