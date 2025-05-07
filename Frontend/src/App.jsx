import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

const DEFAULT_CODE = `const rows = 5;

for (let i = 1; i <= rows; i++) {
  let starRow = "";
  for (let j = 1; j <= i; j++) {
    starRow += "*";
  }
  console.log(starRow);
}
`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setReview(""); // Hide previous review
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/get-review`, {
        code,
      });
      setReview(response.data?.data || "No review received.");
    } catch (error) {
      setReview("An error occurred while reviewing your code.");
    }
    setLoading(false);
  }

  function resetCode() {
    setCode(DEFAULT_CODE);
    setReview("");
    setLoading(false);
  }

  return (
    <div className="bg-gray-950">
      {/* Navbar */}
      <nav className="p-4 bg-gray-900 w-full text-white text-center text-xl font-bold">
        AI Code Reviewer
      </nav>

      {/* Main Content */}
      <main className="flex h-screen flex-col md:flex-row gap-8 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
        {/* Code Input Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-blue-500 text-center text-lg font-semibold">
            Enter Your Code
          </h2>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={12}
            className="font-mono text-sm rounded-md h-72 bg-gray-800 text-gray-300 border border-blue-500 overflow-auto"
          />

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={reviewCode}
              className="px-4 py-2 bg-blue-500 rounded-md text-white font-bold hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Review Code"}
            </button>
            <button
              onClick={resetCode}
              className="px-4 py-2 bg-red-500 rounded-md text-white font-bold hover:bg-red-600"
            >
              Reset
            </button>
          </div>
          <p className="text-gray-500">Backend is not connected...</p>
        </div>

        {/* Review Section */}
        <div className="w-full md:w-1/2 max-h-10/12 overflow-x-hidden bg-gray-800 p-4 rounded-md border border-blue-500 text-gray-300 min-h-72">
          <h2 className="text-blue-500 text-center text-lg font-semibold border-b border-gray-600 pb-2">
            Reviewed Code
          </h2>

          <div className="py-4 overflow-y-auto text-sm">
            {loading ? (
              <p className="text-yellow-300 text-center text-sm">
                Please wait while we analyze your code...
              </p>
            ) : review ? (
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            ) : (
              <p className="text-gray-400 text-center italic">
                No review to display.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}

export default App;
