import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`const data = await fetch('url')\nconsole.log(data);`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        console.log("✅ Data coming:", response.data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      setReview("⚠️ Error fetching review. Please try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "1rem 0", color: "#4CAF50" }}>
        JavaScript Error Helper
      </h1>
      <p
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          padding: "0 1rem",
          fontSize: "1rem",
          color: "#ccc",
        }}
      >
        Paste your JavaScript code with errors and get a solution and explanation.
      </p>

      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "1rem",
          maxWidth: "1024px",
          margin: "0 auto",
        }}
      >
        <div
          className="left"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              borderRadius: "8px",
              height: "200px",
              width: "100%",
              backgroundColor: "#1E1E1E",
              color: "#D4D4D4",
              border: "1px solid #4CAF50",
              overflow: "auto",
            }}
          />

          <button
            onClick={reviewCode}
            style={{
              padding: "0.75rem",
              backgroundColor: "#4CAF50",
              border: "none",
              borderRadius: "6px",
              color: "#121212",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              maxWidth: "300px",
              margin: "0 auto",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Loading..." : "Review Code"}
          </button>
        </div>

        <div
          className="right"
          style={{
            width: "100%",
            backgroundColor: "#1E1E1E",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #4CAF50",
            color: "#D4D4D4",
            overflowX: "auto",
            minHeight: "150px",
          }}
        >
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {loading ? "Please wait while we analyze your code..." : review}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
