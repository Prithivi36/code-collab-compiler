import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor(props) {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("public class Main {\n  public static void main(String[] args) {\n    // Write your Java code here\n  }\n}");

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;

    const defaultSnippets = {
      javascript: "// Write your JavaScript code here",
      python: "# Write your Python code here",
      cpp: "#include <iostream>\nint main() {\n  // Write your C++ code here\n  return 0;\n}",
      java: "public class Main {\n  public static void main(String[] args) {\n    // Write your Java code here\n  }\n}"
    };

    setLanguage(newLang);
    setCode(defaultSnippets[newLang]);
  };

  return (
    <div style={{height:'85%'}} className="bg-light overflow-hidden col-md-6 rounded-5 mt-3  nav">
        <div className="p-2 w-100 d-flex justify-content-between">
            <div className=" d-flex gap-3 align-items-center  ps-3 pt-2">
                <select className="form-select text-dark ps-3" onChange={handleLanguageChange} value={language} style={{ marginBottom: "10px", padding: "5px" }}>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="cpp">C++</option>
                    <option value="java">Java</option>
                </select>
                {props.uid==-1||<div style={{display:'inline-block'}}  className={`rounded-5 me-2 my-2 py-0 pb-0 btn btn-primary`}>
                    <p  className="m-0 fw-normal m-0 p-0 ">{props.user[props.uid]}</p>
                </div>}
            </div>
            <button className="btn btn-success m-2 rounded-5 px-3 me-4 btn-sm">Run</button>
        </div>

      <Editor
        className="overflow-hidden text-dark rounded-bottom-5 border-top pt-3 bg-white"
        height="100%"
        width="100%"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-light"
      />
    </div>
  );
}