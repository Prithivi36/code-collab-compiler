import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { createPistonRequestBody } from "../functions/CreatePistonBody";
import axios from "axios";
import { connectSocket, sendCode } from "../stomp/Stomp";
import Audio from "./Audio";

let roomId = sessionStorage.getItem('room');
const userId = sessionStorage.getItem('userId')

export default function CodeEditor(props) {

  const defaultSnippets = {
    javascript: "// Write your JavaScript code here",
    python: "# Write your Python code here",
    cpp: "#include <iostream>\nint main() {\n  // Write your C++ code here\n  return 0;\n}",
    java: "public class Main {\n  public static void main(String[] args) {\n    // Write your Java code here\n  }\n}",
    c: "#include <stdio.h>\nint main() {\n  // Write your C code here\n  return 0;\n}",
    go: "package main\nimport \"fmt\"\nfunc main() {\n  fmt.Println(\"Hello from Go\")\n}",
    csharp: "using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Hello from C#\");\n  }\n}",
    ruby: "# Write your Ruby code here\ndef hello\n  puts 'Hello from Ruby'\nend\nhello",
    rust: "fn main() {\n  println!(\"Hello from Rust\");\n}"
  };

  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(defaultSnippets[language]);
  const [loading,setLoading]=useState(false);

  const uid = props.uid

  React.useEffect(
    () => {
      if(roomId!=null){
          connectSocket(uid==-1?userId:props.user[uid], (msg) => {
            if(userId!=msg.userId){
              setCode(msg.content);
            }
          });
      }
  }, [uid]);




  function handleSubmit(){

    if(language=='java'){
      const body ={
        code:btoa(code),
        input:props.stdin
      }
      axios.post("https://comp.back.6thdegree.app:8080/api/java",body).then(
          res=>{
            console.log(res.data)
            props.op({
              code:res.data.statusMes=="Successfully Compiled"?0:res.data.statusMes=="Runtime Error"?2:1,
              output:res.data.stdout||res.data.stderr
            })
          }
      ).catch(
        err=>alert("Something went wrong")
      )

      return;
    }

    props.setLoading(true)
    const body =createPistonRequestBody(language,code,props.stdin)
    axios.post("https://emkc.org/api/v2/piston/execute",body).then(
      res=>{
        props.op(res.data.run)
      }
    ).then(
      res=>props.setLoading(false)
    )
    .catch(
      err=>{alert("Something went wrong : "+err.data)
      props.setLoading(false)}
    )
  }

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    if(roomId==null)
    setCode(defaultSnippets[newLang] || "// Write your code here");
  };

  function handleChange(value){
    setCode(value);
    sendCode(uid==-1 ? userId:props.user[uid], userId, value);
  }
  
  return (
    <div style={{ height: "85%" }} className="bg-light overflow-hidden rounded-5 mt-3 nav">
      <div className="p-2 w-100 d-flex justify-content-between">
        <div className="d-flex gap-3 align-items-center justify-content-center ps-3 pt-2">
          <select
            className="form-select text-dark ps-3"
            onChange={handleLanguageChange}
            value={language}
            style={{ marginBottom: "10px", padding: "5px" }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="go">Go</option>
            <option value="csharp">C#</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
          </select>
          {sessionStorage.getItem('agora-token')!=null && <Audio />}
          {uid === -1 || (
            <div style={{ display: "inline-block" }} className={`rounded-5 me-2 my-2 py-0 pb-0 btn ${props.user[uid]!=null?'btn-primary':'btn-warning'}`}>
              <p className="m-0 fw-normal text-nowrap mb-1 m-0 p-0">{props.user[uid] || 'left the room'}</p>
            </div>
          )}
        </div>
        <button disabled={props.loading} onClick={handleSubmit} className="btn btn-success m-2 rounded-5 px-3 me-4 btn-sm">Run</button>
      </div>
      <Editor
        className="overflow-hidden text-dark rounded-bottom-5 border-top pt-3 bg-white"
        height="100%"
        width="100%"
        language={language}
        value={code}
        onChange={handleChange}
        theme="vs-light"
      />
    </div>
  );
}
