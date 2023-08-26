import "../css/SpeechRecognition.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const Speech_Recognition = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleCopyAndRedirect = (text) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://www.google.com/search?q=${encodedText}`, "_blank");
  };

  return (
    <>
      <div className="alignCenter">
        <div className="centerComponent">
          <p className="heading">Speech Recognition</p>
          <div
            className="main-content"
            onClick={() => setTextToCopy(transcript)}>
            {transcript}
          </div>
          <div className="buttonContainer">
            <button
              onClick={startListening}
              className="recognitionBtn">
              Start Listening
            </button>
            <button
              onClick={SpeechRecognition.stopListening}
              className="recognitionBtn">
              Stop Listening
            </button>
          </div>
          <div className="buttonContainerPro">
            <button
              onClick={setCopied}
              className="recognitionBtn">
              {isCopied ? "Copied!" : "Copy To Clipboard"}
            </button>
            <button
              onClick={resetTranscript}
              className="recognitionBtn">
              Clear!
            </button>
            <button
              onClick={() => handleCopyAndRedirect(transcript)}
              className="recognitionBtn">
              Search On Internet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { Speech_Recognition };
