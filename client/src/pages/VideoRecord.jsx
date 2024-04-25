import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function VideoRecord() {
  const [recording, setRecording] = useState(false);
  const [snapshot, setSnapshot] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();

  const takeSnapshot = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/png');
    setSnapshot(image);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;
      videoRef.current.muted = true;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      let chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const formData = new FormData();
        formData.append('video', blob);
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        chunks = [];
      };

      recorder.start();
      setRecording(true);
      setTimeout(takeSnapshot, 1000);  // Take snapshot after 1 second
    } catch (error) {
      console.error('Error starting video recording:', error);
      alert('Could not access your camera and microphone');
    }
  };
  const stopRecording = () => {
    if (recording && mediaRecorderRef.current) {
      // Stop the media recorder
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
    // Ensure all tracks are stopped as well when stopping the recording
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    navigate('/assesment', { state: { snapshot } });
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <video ref={videoRef} autoPlay className="rounded-lg shadow-xl border border-gray-300" />
      {!recording ? (
        <button onClick={startRecording} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-700 transition duration-150 ease-in-out">
          Start Recording
        </button>
      ) : (
        <button onClick={stopRecording} className="mt-4 px-6 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-700 transition duration-150 ease-in-out">
          Stop Recording
        </button>
      )}
    </div>
  );
}

export default VideoRecord;
