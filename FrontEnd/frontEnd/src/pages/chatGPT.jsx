import React, { useState, useEffect } from "react";
import { generateResponse } from "../RAG_LLM";
import '../styles/chatbotUI.css';

const ChatGPTPage = () => {
    const [input, setInput] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [error, setError] = useState("");
    const [mediaRecorder, setMediaRecorder] = useState(null);

    useEffect(() => {
        console.log("audioBlob state updated:", audioBlob);
    }, [audioBlob]);

    const cleanResponse = (rawResponse) => {
        // Split the response into lines
        const lines = rawResponse.split("\n").filter((line) => line.trim() !== "");
    
        let formattedResponse = "Response:\n"; // Start with a plain title
    
        lines.forEach((line) => {
            if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.")) {
                // Numbered points
                formattedResponse += `\n${line.trim()}\n`;
            } else if (line.startsWith("-")) {
                // Bullet points
                formattedResponse += `  • ${line.trim().slice(1).trim()}\n`;
            } else {
                // General text
                formattedResponse += `${line.trim()}\n`;
            }
        });
    
        return formattedResponse.trim(); // Trim extra whitespace at the end
    }

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Media stream started for recording...");
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            const chunks = [];

            recorder.ondataavailable = (event) => {
                chunks.push(event.data);
                console.log("Audio chunk captured:", event.data);
            };

            recorder.onstop = () => {
                console.log("mediaRecorder.onstop fired.");
                if (chunks.length === 0) {
                    console.error("No audio chunks captured.");
                    return;
                }

                const blob = new Blob(chunks, { type: "audio/webm" });
                console.log("Blob created:", blob);
                setAudioBlob(blob); // Set the audio blob
            };

            recorder.start();
            setIsRecording(true);
            console.log("Recording started...");
        } catch (err) {
            console.error("Error starting recording:", err);
            setError("Failed to access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log("Recording stopped by user.");
            setIsRecording(false);
        } else {
            console.error("No active mediaRecorder to stop.");
        }
    };

    const processAudio = async () => {
        if (!audioBlob) {
            console.error("No audioBlob found for processing.");
            setError("No audio recorded.");
            return;
        }

        try {
            console.log("Uploading audio blob to transcription server...");
            const formData = new FormData();
            formData.append("file", audioBlob, "audio.webm");

            const response = await fetch("http://localhost:5000/transcribe-audio", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Transcription server error:", errorResponse.error);
                setError("Error from transcription server.");
                return;
            }

            const data = await response.json();
            const transcription = data.transcription;
            console.log("Transcription received:", transcription);

            const rawAiResponse = await generateResponse(transcription);
            console.log("Raw AI Response received:", rawAiResponse);

            // Clean and format the AI response
            processResponse(rawAiResponse);

            setChatHistory((prev) => [
                ...prev,
                { type: "user", content: transcription },
                { type: "bot", content: cleanResponse(rawAiResponse) },
            ]);
        } catch (err) {
            console.error("Error processing audio:", err);
            setError("Failed to process audio or generate a response.");
        }
    };

    const processResponse = async (responseText) => {
        const cleanedResponse = cleanResponse(responseText);
        return cleanedResponse;
    };

    const handleSend = async () => {
        if (!input.trim()) {
            console.warn("No input provided.");
            return;
        }

        console.log("Sending user input:", input);
        setChatHistory((prev) => [...prev, { type: "user", content: input }]);

        try {
            const aiResponse = await generateResponse(input);
            console.log("AI Response received:", aiResponse);

            setChatHistory((prev) => [
                ...prev,
                { type: "bot", content: aiResponse },
            ]);

            setInput("");
        } catch (err) {
            console.error("Error generating response:", err);
            setError("Failed to generate a response.");
        }
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") handleSend();
    };

    const renderMessages = () =>
        chatHistory.map((msg, index) => (
            <div
                key={index}
                className={`message ${msg.type === "user" ? "user-message" : "bot-message"}`}
            >
                {msg.content}
                {msg.type === "bot" && (
                    <button
                        onClick={() => speakResponse(msg.content)}
                        className="speak-button"
                        style={{
                            marginTop: "5px",
                            marginLeft: "10px",
                            padding: "5px 10px",
                            backgroundColor: "#0078d4",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Speak
                    </button>
                )}
            </div>
        ));

    const speakResponse = (text) => {
        if (!text) return;
        speechSynthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
    };

    return (
        <div className="chatbot-container">
            <div className="chat-window">{renderMessages()}</div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input"
                    onKeyDown={handleEnter}
                />
                <button onClick={handleSend} className="send-button">
                    Send
                </button>
                {!isRecording ? (
                    <button onClick={startRecording} className="record-button">
                        Start Recording
                    </button>
                ) : (
                    <button onClick={stopRecording} className="stop-button">
                        Stop Recording
                    </button>
                )}
                <button onClick={processAudio} disabled={!audioBlob} className="process-button">
                    Process Audio
                </button>
            </div>
        </div>
    );
};

export default ChatGPTPage;