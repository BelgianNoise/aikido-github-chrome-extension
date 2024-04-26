import { createRoot } from "react-dom/client";
import { DetailsMessage, MessageType, NavigateMessage } from "./types";
import React from "react";
import AikidoComp from "./components/aikido-comp";

console.log('RUNNING CONTENT SCRIPT GH')

chrome.runtime.onMessage.addListener((request: NavigateMessage, sender, sendResponse) => {
  if (request.type === MessageType.NAVIGATE) {
    if (document.getElementById("aikido-root")) return;
    const el = document.querySelector('table[aria-labelledBy="folders-and-files"]');
    if (!el) return;
    const newDiv = document.createElement("div");
    newDiv.id = "aikido-root";
    el.parentNode!.insertBefore(newDiv, el);
    const root = createRoot(newDiv);
    root.render(
      <React.StrictMode>
        <AikidoComp repoName={request.payload.repoName} repoOwner={request.payload.repoOwner} />
      </React.StrictMode>
    );

    chrome.runtime.sendMessage<DetailsMessage>({
      type: MessageType.GET_DETAILS,
      payload: {
        repoName: request.payload.repoName,
        repoOwner: request.payload.repoOwner,
      },
    });
  }
});
