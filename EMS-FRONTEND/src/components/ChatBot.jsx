import { useState } from "react";
import "./ChatBot.css";

const faqAnswers = [
  {
    keywords: ["add", "employee", "add employee"],
    answer:
      "Use the Add Employee panel to create a new team member. Fill in the fields and click Submit to save the record.",
  },
  {
    keywords: ["delete", "remove", "delete employee"],
    answer:
      "Open the employee list and use the Delete button for the employee record you want to remove.",
  },
  {
    keywords: ["upload", "csv", "file"],
    answer:
      "Upload a CSV file from the top of the employee panel. The app will parse and refresh the employee list automatically.",
  },
  {
    keywords: ["salary", "pay", "compensation"],
    answer:
      "Salary values are visible in the employee table under the Salary column for each employee.",
  },
  {
    keywords: ["department", "team", "role"],
    answer:
      "Department appears in the table and also in each employee profile. Use the department column to filter or review team assignments.",
  },
  {
    keywords: ["login", "role", "access"],
    answer:
      "Login with your assigned role. Admins and HR can manage employees, while employees can view their own details.",
  },
  {
    keywords: ["refresh", "reload", "update"],
    answer:
      "Click the Refresh Employees button to fetch the latest list from the server.",
  },
];

const getBotReply = (message) => {
  const text = message.trim().toLowerCase();

  if (!text) {
    return "Please type a question so I can help you.";
  }

  for (const faq of faqAnswers) {
    if (faq.keywords.some((keyword) => text.includes(keyword))) {
      return faq.answer;
    }
  }

  if (text.includes("hello") || text.includes("hi")) {
    return "Hi there! Ask me anything about employee management, roles, or how to use the dashboard.";
  }

  if (text.includes("help")) {
    return "I can answer questions about adding, deleting, uploading, and viewing employees. Try something like 'How do I upload a CSV?'";
  }

  return "I don't have a specific answer for that yet, but I can help with employee management tasks like add, delete, upload, or refresh.";
};

function ChatBot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "bot",
      text: "Hello! I am your HR assistant. Ask me any question about employees, departments, salary, or the dashboard.",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userText = query.trim();
    if (!userText) {
      return;
    }

    const nextMessages = [
      ...messages,
      { id: messages.length + 1, author: "user", text: userText },
      {
        id: messages.length + 2,
        author: "bot",
        text: getBotReply(userText),
      },
    ];

    setMessages(nextMessages);
    setQuery("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div>
          <h2 className="section-title">HR Chat Assistant</h2>
          <p className="section-copy">
            Get instant answers about employee actions, departments, salary, and dashboard tools.
          </p>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chatbot-message ${message.author}`}
          >
            <div className="message-label">
              {message.author === "bot" ? "Assistant" : "You"}
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
      </div>

      <form className="chatbot-form" onSubmit={handleSubmit}>
        <input
          className="chatbot-input"
          type=   "text"
          placeholder="Ask a question..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="btn btn-primary chatbot-send">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBot;
