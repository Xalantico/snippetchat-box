
import React from 'react';

const EmbedInstructions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-24">
        <header className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Embedding Instructions
          </div>
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            Chat Widget - Embed on Any Website
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Follow these simple steps to add the chat widget to your website.
          </p>
        </header>

        <div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Embedding Instructions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Step 1: Add the required scripts to your HTML</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm text-left">
                    <code>{`<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
<script src="https://unpkg.com/snippetchat-box@latest/dist/embed.js"></script>`}</code>
                  </pre>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Add these scripts to the <code>&lt;head&gt;</code> or at the end of the <code>&lt;body&gt;</code> section of your HTML.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Step 2: Initialize the chat widget</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm text-left">
                    <code>{`<script>
  window.chatWidgetConfig = {
    title: "Customer Support",
    subtitle: "How can we help you today?",
    position: "bottom-right", // Options: "bottom-right", "bottom-left", "top-right", "top-left"
    apiEndpoint: "https://your-api-endpoint.com/chat" // Optional: Your custom API endpoint
  };
</script>`}</code>
                  </pre>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Customize these options to match your branding and requirements.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Step 3: Advanced usage with JavaScript API</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm text-left">
                    <code>{`<script>
  // Initialize manually instead of using window.chatWidgetConfig
  const chatWidget = window.initChatWidget({
    title: "Product Support",
    subtitle: "Ask us anything about our product",
    position: "bottom-right",
    targetElement: "#chat-container" // Optional: CSS selector for where to mount the widget
  });
  
  // To remove/destroy the widget
  // chatWidget.destroy();
</script>`}</code>
                  </pre>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  This method gives you more control over when and where the widget appears.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-700 dark:text-blue-300 font-medium">
                  Remember to type <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">LIST</code> in the chat to see the special card list view!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedInstructions;
