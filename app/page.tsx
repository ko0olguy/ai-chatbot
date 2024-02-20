"use client";
import { Textarea, Button } from "@nextui-org/react";
import { Suspense, useState } from "react";
import { run } from "../Components/Functions/api";
import Markdown from "react-markdown";
export default function Home() {
  const [responsetoSubmit, setResponsetoSubmit] = useState("");
  const [response, setResponse] = useState(""); // Initialize response state

  const handleSubmit = async () => {
    if (responsetoSubmit === "") {
      var t = await run("Write a story about a magic backpack.")
      setResponse(t)
    }
    const text = await run(responsetoSubmit);
    console.log(responsetoSubmit);
    setResponse(text);
  };

  // Rest of your component
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Textarea
        label="Prompt"
        value={responsetoSubmit}
        onChange={(e) => setResponsetoSubmit(e.target.value)}
        placeholder="Write a story about a magic backpack."
        rows={4}
        cols={50}
      />
      <Button
        variant="ghost"
        onPress={handleSubmit}
        className="self-center left-10"
      >
        Submit
      </Button>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full h-full rounded-md bg-slate-300 text-center">
          <Markdown>{response}</Markdown>
        </div>
      </Suspense>
    </div>
  );
}
