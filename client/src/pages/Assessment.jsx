


import { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
// Import the necessary hooks from react-router-dom at the beginning of your component file
import { useLocation } from 'react-router-dom';

// Inside the Assessment component function


// You can now use this snapshot URL to display the image wherever needed in your component

const Assessment = () => {
  const [activeTab, setActiveTab] = useState('transcript');
  const [showWordChoiceDetails, setShowWordChoiceDetails] = useState(true);
  const [expandCard1, setExpandCard1] = useState(false);
  // const [expandCard2, setExpandCard2] = useState(false);
  const [expandCard3, setExpandCard3] = useState(false);
  const [expandCard4, setExpandCard4] = useState(false);
  const [loading, setLoading] = useState(true);  // State to manage loading effect
  const location = useLocation();
  const snapshot = location.state?.snapshot;
  console.log(snapshot)
  useEffect(() => {
    // Simulate a fetch call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);  // Simulate a 2 second loading time
    return () => clearTimeout(timer);
  }, []);

  const handleTabSwitch = (tabName) => {
    setLoading(true);  // Simulate loading on tab switch
    setTimeout(() => {
      setActiveTab(tabName);
      setLoading(false);
    }, 2000);
  };

  const toggleWordChoiceDetails = () => {
    setShowWordChoiceDetails(!showWordChoiceDetails);
  };

  const toggleExpandCard1 = () => {
    setExpandCard1(!expandCard1);
  };

  // const toggleExpandCard2 = () => {
  //   setExpandCard2(!expandCard2);
  // };
  const toggleExpandCard3 = () => {
    setExpandCard3(!expandCard3);
  };

  const toggleExpandCard4 = () => {
    setExpandCard4(!expandCard4);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-semibold">Loading...</div>
    </div>;
  }
  return (
        <>
          <div className="min-h-screen ">
            <header className="text-center mb-8">
              <h1 className="text-xl font-semibold py-3"> AI Interview</h1>
            </header>
     
            <div className="container  flex gap-4">
              {/* Left Card containing video and interactive buttons for transcript and comments */}
              <div className="flex flex-col w-2/3 bg-white rounded-lg shadow-md">
                <div className="p-4 flex justify-center">
                  <div className="w-2/3 bg-black rounded aspect-video">
                    <img src={snapshot} alt="" />
                  </div>
                </div>
                <hr className="my-4" />
     
                <div className="bg-indigo-300 shadow p-4 rounded-md mx-4 mb-4">
                  <div className="flex justify-around mb-1">
                    <button onClick={() => handleTabSwitch('transcript')} className={`font-bold py-1 px-4 rounded-lg ${activeTab === 'transcript' ? 'bg-white text-blue-500 border-2 border-blue-500' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
                      Transcript
                    </button>
                    <button onClick={() => handleTabSwitch('comments')} className={`font-bold py-1 px-4 rounded-lg ${activeTab === 'comments' ? 'bg-white text-blue-500 border-2 border-blue-500' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>
                      Coach Comments 
                    </button>
                  </div>
     
                  {activeTab === 'transcript' && (
                    <div className="flex flex-col gap-4">
                      {/* {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
                          <p className="text-sm">{dummyTextTranscript}</p>
                        </div>
                      ))} */}
    
    React Hooks are a set of tools in React that allow you to manage state and other React features in function components. Previously, these capabilities were only available in class components, which are more complex to use and understand. With Hooks, you can easily keep track of data within uhmmm your components, handle side effects after rendering, and share functionality between components without writing classes. This makes your code cleaner and easier to manage, leading uhmmm to simpler and more maintainable React applications.
    Now i will uhmmm speak really fast and will say something stupid and i want to check if this is able to extract the word stupid or not ,lets see what we are getting as an analysis report
                    </div>
                  )}
                  {activeTab === 'comments' && (
                    <div className="flex flex-col gap-4">
                      {/* {Array.from({ length: coachCommentsCount }).map((_, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
                          <p className="text-sm">{dummyTextComments}</p>
                        </div>
                      ))} */}
                      <div>
    
                      Technical Accuracy: Your explanation was technically accurate, demonstrating a good understanding of the subject matter. This helps in clearly conveying complex concepts to those who may be new to React.
                      </div>
    
                   <div>
    
                      Pace of Speech: While your enthusiasm for the topic is clear, the pace of your speech was quite fast. Slowing down can help in making your points more digestible and ensures that all listeners can follow along easily.
                   </div>
                       Use of Informal Language: Be mindful of the language you use. The term stupid came up in your speech, which may be seen as unprofessional. Its important to maintain a professional tone throughout, especially in formal or educational settings.
                    </div>
                  )}
                </div>
              </div>
     
              <div className="w-1/3 bg-white rounded-lg shadow-md p-4 text-center">
                <h2 className="text-lg font-semibold text-indigo-700 pb-2">Speaking Analytics</h2>
                <hr className="my-2" />
     
                <div className="flex justify-center mt-4 mb-6">
                  <button onClick={toggleWordChoiceDetails} className="bg-blue-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-blue-700 mr-2">
                    Word Choice
                  </button>
                  <button className="bg-blue-500 text-white font-bold py-1 px-4 rounded-lg hover:bg-blue-700">
                    Delivery
                  </button>
                </div>
     
                <div className="text-left">
                  <div className="text-left">
      <h3 className="text-md font-semibold">What went well</h3>
      <div className="mt-2">
        <div className={`bg-white p-2 rounded-xl shadow-lg mb-2 flex items-center justify-between cursor-pointer ${expandCard1 ? 'border-2 border-sky-600' : ''}`} onClick={toggleExpandCard1}>
          <span>{expandCard1 ? <FaChevronDown /> : <FaChevronRight />}</span>
          <span className="flex-1 text-left">Explanation Clarity</span>
          <span>clear...</span>
        </div>
        {expandCard1 && (
          <div className="p-4">
            <hr />
            <h4 className="text-center mt-2">Excellent explanation of React Hooks, highlighting their benefits and usability.</h4>
            <ul className="list-decimal list-inside text-left mt-4">
              <li>Effectively described the transition from class components to function components.</li>
              <li>Clearly articulated the advantages of Hooks for state management and side effects.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
    
    <div className="text-left">
      <h3 className="text-md font-semibold  mt-6">What could have gone better</h3>
      <div className="mt-2">
        <div className={`bg-white p-2 rounded-xl shadow-lg mb-2 flex items-center justify-between cursor-pointer ${expandCard3 ? 'border-2 border-sky-600' : ''}`} onClick={toggleExpandCard3}>
          <span>{expandCard3 ? <FaChevronDown /> : <FaChevronRight />}</span>
          <span className="flex-1 text-left">Speaking Pace</span>
          <span>fast, needs control</span>
        </div>
        {expandCard3 && (
          <div className="p-4">
            <hr />
            <h4 className="text-center mt-2">Consider slowing down your pace to enhance understanding and retention.</h4>
            <ul className="list-decimal list-inside text-left mt-4">
              <li>Practice pacing your words to allow time for the listener to process information.</li>
            </ul>
          </div>
        )}
        <div className={`bg-white p-2 rounded-xl shadow-lg mb-2 flex items-center justify-between cursor-pointer ${expandCard4 ? 'border-2 border-sky-600' : ''}`} onClick={toggleExpandCard4}>
          <span>{expandCard4 ? <FaChevronDown /> : <FaChevronRight />}</span>
          <span className="flex-1 text-left">Inappropriate Language</span>
          <span>use detected</span>
        </div>
        {expandCard4 && (
          <div className="p-4">
            <hr />
            <h4 className="text-center mt-2">Avoid using language that might be considered unprofessional or offensive in professional settings.</h4>
            <ul className="list-decimal list-inside text-left mt-4">
              <li>Word stupid detected—consider more neutral phrasing.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
    
                </div>
     
                <div className="text-left">
                <h3 className="text-md font-semibold  mt-6">What could have gone better</h3>
                <div className="mt-2">
                  <div className={`bg-white p-2 rounded-xl shadow-lg mb-2 flex items-center justify-between cursor-pointer ${expandCard3 ? 'border-2 border-sky-600' : ''}`} onClick={toggleExpandCard3}>
                    <span>{expandCard3 ? <FaChevronDown /> : <FaChevronRight />}</span>
                    <span className="flex-1 text-left">Filter Words</span>
                    <span>12 filters, 10%</span>
                  </div>
                  {expandCard1 && (
                    <div className="p-4">
                      <hr />
                      <h4 className="text-center mt-2">Try getting to 3% by pausing instead</h4>
                      <ul className="list-decimal list-inside text-left mt-4">
                        <li>Uhmm</li>
                     
                      </ul>
                    </div>
                  )}
                  {/* Second expandable card for "Top Key Words" */}
                  <div className={`bg-white p-2 rounded-xl shadow-lg mb-2 flex items-center justify-between cursor-pointer ${expandCard4 ? 'border-2 border-sky-600' : ''}`} onClick={toggleExpandCard4}>
                    <span>{expandCard4 ? <FaChevronDown /> : <FaChevronRight />}</span>
                    <span className="flex-1 text-left">Non Inclusiveness</span>
                    <span>0 instances</span>
                  </div>
                  {expandCard4 && (
                    <div className="p-4">
                      <hr />
                      <h4 className="text-center mt-2"> We detected some noninclusive language</h4>
                      <ul className="list-decimal list-inside text-left mt-4">
                        <li>Stupid</li>
    
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>
        </>
      );

};

export default Assessment;
