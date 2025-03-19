
import React from 'react';
import ChatWidget from '@/components/ChatWidget/ChatWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-24">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Introducing
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Chat Widget
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A beautiful, customizable chat widget that can be embedded in any website, 
            with real-time message streaming capabilities.
          </p>
        </header>

        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span>Elegant, minimalist design inspired by Apple's design principles</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span>Real-time message streaming with typing indicators</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span>Smooth animations and glass morphism effects</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span>Fully responsive design that works on all devices</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span>Lightweight and easy to integrate</span>
              </li>
            </ul>
            
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-3">Try it now! Click the chat button in the corner.</p>
            </div>
          </div>
        </div>
      </div>

      {/* The chat widget */}
      <ChatWidget 
        title="Product Support"
        subtitle="Ask us anything about our product"
        position="bottom-right"
      />
    </div>
  );
};

export default Index;
