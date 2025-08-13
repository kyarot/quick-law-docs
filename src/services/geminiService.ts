import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyC6xjyDOljVA_vTNWbDurcWp8hisllZ-g0';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const geminiService = {
  // Legal Assistant Chat
  async getLegalAdvice(message: string, language: string = 'en'): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `You are a professional legal assistant. Provide accurate, helpful legal guidance in ${language}. 
      Always remind users to consult with a qualified attorney for specific legal matters.
      
      User question: ${message}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini Legal Assistant Error:', error);
      throw new Error('Failed to get legal advice');
    }
  },

  // Translation Service
  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `Translate the following text to ${targetLanguage}. 
      Maintain the original meaning and context, especially for legal terminology.
      
      Text to translate: ${text}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Translation Error:', error);
      throw new Error('Failed to translate text');
    }
  },

  // Document Analysis
  async analyzeDocument(documentText: string, language: string = 'en'): Promise<{
    summary: string;
    keyPoints: string[];
    legalImplications: string[];
  }> {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `Analyze this legal document and provide:
      1. A concise summary
      2. Key points (as bullet points)
      3. Legal implications
      
      Respond in ${language}. Document text: ${documentText}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Parse the response into structured format
      const lines = text.split('\n').filter(line => line.trim());
      
      return {
        summary: lines.find(line => line.includes('Summary') || line.includes('summary'))?.replace(/.*?:/, '').trim() || text.substring(0, 200),
        keyPoints: lines.filter(line => line.startsWith('•') || line.startsWith('-')).map(point => point.replace(/^[•-]\s*/, '')),
        legalImplications: lines.filter(line => line.toLowerCase().includes('implication')).map(imp => imp.replace(/.*?:/, '').trim())
      };
    } catch (error) {
      console.error('Document Analysis Error:', error);
      throw new Error('Failed to analyze document');
    }
  }
};