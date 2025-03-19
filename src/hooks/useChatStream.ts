
import { useState, useCallback, useRef } from 'react';

interface UseChatStreamOptions {
  apiEndpoint: string;
  onStreamComplete?: (messageId: string) => void;
}

export function useChatStream({ apiEndpoint, onStreamComplete }: UseChatStreamOptions) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamingId, setCurrentStreamingId] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsStreaming(false);
      setCurrentStreamingId(null);
    }
  }, []);

  const streamMessage = useCallback(
    async (
      message: string, 
      messageId: string,
      onChunk: (chunk: string) => void
    ): Promise<void> => {
      // Cancel any ongoing stream
      if (isStreaming) {
        cancelStream();
      }

      setIsStreaming(true);
      setCurrentStreamingId(messageId);
      abortControllerRef.current = new AbortController();

      // For demo purposes, we'll simulate a streaming response
      // In a real implementation, this would make an API call to your streaming endpoint
      try {
        const mockResponse = generateMockResponse(message);
        
        // Check if it's a special LIST command - send as one chunk
        if (message.trim().toUpperCase() === "LIST") {
          await new Promise(resolve => setTimeout(resolve, 500));
          onChunk(mockResponse);
          setIsStreaming(false);
          setCurrentStreamingId(null);
          
          if (onStreamComplete) {
            onStreamComplete(messageId);
          }
          return;
        }
        
        // Normal text streaming for other messages
        const chunks = mockResponse.split(' ');
        
        for (let i = 0; i < chunks.length; i++) {
          if (abortControllerRef.current?.signal.aborted) {
            throw new DOMException('Stream was canceled by user', 'AbortError');
          }

          // Simulate network latency
          await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
          
          // Append space except for the first chunk
          const text = (i > 0 ? ' ' : '') + chunks[i];
          onChunk(text);
        }

        setIsStreaming(false);
        setCurrentStreamingId(null);
        
        if (onStreamComplete) {
          onStreamComplete(messageId);
        }
      } catch (error) {
        if ((error as DOMException).name !== 'AbortError') {
          console.error('Error in stream:', error);
        }
        setIsStreaming(false);
        setCurrentStreamingId(null);
        throw error;
      } finally {
        abortControllerRef.current = null;
      }
    },
    [isStreaming, cancelStream, onStreamComplete]
  );

  return {
    streamMessage,
    isStreaming,
    currentStreamingId,
    cancelStream
  };
}

// Helper function to generate mock responses
function generateMockResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase();
  
  if (message.trim().toUpperCase() === "LIST") {
    return `
<list-cards>
  <card>
    <image>https://images.unsplash.com/photo-1488590528505-98d2b5aba04b</image>
    <title>Web Development</title>
    <description>Learn to build beautiful, responsive websites with the latest web technologies.</description>
    <button>Learn More</button>
  </card>
  <card>
    <image>https://images.unsplash.com/photo-1518770660439-4636190af475</image>
    <title>Machine Learning</title>
    <description>Discover how AI and ML are transforming industries and creating new opportunities.</description>
    <button>Explore</button>
  </card>
  <card>
    <image>https://images.unsplash.com/photo-1461749280684-dccba630e2f6</image>
    <title>Cloud Computing</title>
    <description>Master cloud technologies and learn to deploy scalable applications.</description>
    <button>Get Started</button>
  </card>
</list-cards>
    `;
  } else if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    return "Hello! How can I assist you today? I'm here to help with any questions you might have about our products or services.";
  } else if (lowercaseMessage.includes('help')) {
    return "I'd be happy to help! Could you please provide more details about what you need assistance with? Our support team is available 24/7 to address your concerns.";
  } else if (lowercaseMessage.includes('product') || lowercaseMessage.includes('service')) {
    return "We offer a range of premium products and services designed to meet your needs. Our most popular options include our Pro subscription, Enterprise solutions, and custom integrations. Would you like more specific information about any of these?";
  } else if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost')) {
    return "Our pricing is flexible and tailored to your specific needs. Basic plans start at $19/month, while our Pro plans, which include additional features and support, start at $49/month. We also offer custom Enterprise pricing for larger organizations.";
  } else if (lowercaseMessage.includes('thank')) {
    return "You're very welcome! If you have any other questions in the future, don't hesitate to reach out. We're always here to help.";
  } else {
    return "Thank you for your message. I understand you're interested in learning more. To better assist you, could you provide additional details about your specific needs or questions? I'm here to help and will do my best to provide the information you're looking for.";
  }
}
