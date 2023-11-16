"use client";

import "styles/prism-one-dark.css";
import { copyTextHandler } from "public/scripts/copyCode.js";
import { useEffect } from "react";
import Prism from "prismjs";
import Markdown from "react-markdown";

require("prismjs/components/prism-javascript");
require("prismjs/components/prism-css");
require("prismjs/components/prism-jsx");

export default function CodeBlock({ code }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      
        <div className='rich-code-container'>
          <pre
            className='rich-code language-jsx'
            suppressHydrationWarning={true}>
            <code className='rich-code-content language-jsx'>{code}</code>
          </pre>
          <div>
            <span onClick={copyTextHandler} className='copy-code-button'>
              Copy
            </span>
          </div>
          <div>
            <span className='success-message'>Code copied 🙏🏻</span>
          </div>
        </div>

    </>
  );
}
