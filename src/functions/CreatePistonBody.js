import versions from './versions.json';

export function createPistonRequestBody(language, code,stdin) {
  const version = versions[language];
  
  if (!version) {
    console.error(`❌ Unsupported language: ${language}`);
    return null;
  }

  const defaultFileNames = {
    java: "Main.java",
    python: "main.py",
    javascript: "main.js",
    c: "main.c",
    cpp: "main.cpp",
    go: "main.go",
    rust: "main.rs",
    csharp: "Program.cs"
  };

  const fileName = defaultFileNames[language] || "main.txt";

  const body = {
    language: language,
    version: version,
    files: [
      {
        name: fileName,
        content: code
      }
    ],
    stdin:stdin
  };

  console.log("📤 Request Body:", JSON.stringify(body, null, 2));
  return body;
}
