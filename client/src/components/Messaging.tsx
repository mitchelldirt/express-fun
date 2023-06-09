import { useEffect, useState } from "react";

export default function Messaging() {
  const [ws, setWs] = useState<WebSocket>();

  const [receivedMessages, setMessages] = useState<string[]>([]);
  const [sentMessages, setSentMessages] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = new FormData(event.currentTarget).get("message");

    if (ws && message && typeof message === "string") {
      ws.send(message);
      setSentMessages((messages) => [...messages, message]);
    }
  };

  useEffect(() => {
    // Create a new WebSocket instance
    const newWs = new WebSocket("ws://localhost:8081");

    newWs.addEventListener("open", () => {
      console.log("WebSocket connection established.");
      setWs(newWs);
    });

    newWs.addEventListener("message", (event) => {
      setMessages((messages) => [...messages, event.data]);
    });

    newWs.addEventListener("close", () => {
      console.log("WebSocket connection closed. Reconnecting...");
      // Restart the WebSocket connection after a delay
      setTimeout(() => {
        console.log("Reconnecting...");
        setWs(newWs);

        if (newWs.readyState !== 0 && newWs.readyState !== 1) {
          newWs.close();
          console.error("WebSocket connection failed.");
          return;
        }
      }, 2000);
    });
  }, [setWs]);

  return (
    <>
    <button onClick={() => {
      const messageDialong = document.getElementById("messaging")
      
      if (messageDialong && messageDialong instanceof HTMLDialogElement) {
        messageDialong.showModal()
      }}}>Open the dialog</button>
    <dialog id="messaging">
      <button onClick={() => {
      const messageDialong = document.getElementById("messaging")

      if (messageDialong && messageDialong instanceof HTMLDialogElement) {
        messageDialong.close()
      }}}>Close the dialog</button>
      <h1>Messaging</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
        <input name="message" type="text" id="message" />
        <button type="submit">Send</button>
      </form>

      <h2>Received Messages</h2>
      <ul>
        {receivedMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>

      <h2>Sent Messages</h2>
      <ul className="bg-red-500">
        {sentMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </dialog>
    </>
  );
}
