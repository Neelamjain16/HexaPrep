import { useState, useRef } from 'react';

function VideoStream() {
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null); // To keep reference to MediaRecorder instance

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true // Ensure audio is recorded
      });
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true; 
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder; // Store the recorder instance
      let chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const formData = new FormData();
        formData.append('video', blob);

        fetch('http://localhost:3000/upload-video', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Success:', data);
            setRecording(false);
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Upload failed');
          });

        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        chunks = [];
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting video recording:', error);
      alert('Could not access your camera and microphone');
    }
  };

  const stopRecording = () => {
    if (recording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Stop the recording
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
    </div>
  );
}

export default VideoStream;
