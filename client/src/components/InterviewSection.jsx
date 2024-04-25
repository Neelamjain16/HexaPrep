 
import  { useState } from 'react';
import './style.css'; // Make sure this import points to your CSS file
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
 
const topicsData = {
  tech: ["React", "Angular", "Vue", "Nodejs", "TypeScript"],
  nonTech: ["Communication", "Leadership", "TimeManagement", "CriticalThinking", "Teamwork"],
  position: ["SoftwareEngineer", "DataScientist", "ProductManager", "UXDesigner", "DevOpsEngineer"]
};
 
const exampleQuestions = {
  React: [
    "Explain the virtual DOM.",
    "What are hooks in React?",
    "How do you handle state in React?",
    "Describe the lifecycle of a React component.",
    "What is JSX and why do we use it?"
  ],
  Angular: [
    "What is dependency injection in Angular?",
    "Explain the concept of a directive in Angular.",
    "What are services in Angular?",
    "How do you manage state in Angular applications?",
    "What is the Angular CLI and how is it used?"
  ],
  Vue: [
    "Can you explain the concept of virtual DOM in Vue.js and how it improves performance?",
    "How does Vue.js handle state management, and what are the options available for managing state?",
    "What are mixins in Vue.js and how do they enhance code reusability?",
    "Explain the lifecycle hooks in Vue.js and provide examples of when each hook is used.",
    "What are some best practices for optimizing the performance of Vue.js applications?"
  ],
  Nodejs:[
    "Explain the event-driven architecture of Node.js and how it differs from traditional server-side environments.",
    "What is the role of npm in Node.js development, and how do you handle package dependencies?",
    "Discuss the concept of streams in Node.js and provide examples of when they are useful.",
    "How does Node.js handle asynchronous programming, and what are the different methods for managing asynchronous operations?",
    "Describe the purpose of middleware in Express.js and provide examples of middleware functions."
  ],
  TypeScript:[
    "What is TypeScript, and how does it improve upon JavaScript?",
    "Explain the difference between interfaces and types in TypeScript.",
    "How does TypeScript support static typing, and what are the benefits of using static types?",
    "What are generics in TypeScript, and how are they used to create reusable components?",
    "Discuss the concept of decorators in TypeScript and provide examples of their usage."
  ],
  Communication:[
    "Can you provide an example of a situation where effective communication played a crucial role in the success of a project?",
    "How do you handle misunderstandings or conflicts that arise during team discussions or meetings?",
    "Describe a time when you had to convey complex technical information to a non-technical audience. How did you ensure clarity and understanding?",
    "In what ways do you adapt your communication style when interacting with different stakeholders or team members?",
    "How do you ensure that everyone on your team feels heard and understood during discussions or decision-making processes?"
  ],
  Leadership:[
    "Can you share an example of a project where you demonstrated strong leadership skills?",
    "How do you inspire and motivate your team members to achieve their best?",
    "Describe a time when you had to make a tough decision as a leader. How did you handle it?",
    "What strategies do you use to foster a positive and collaborative team environment?",
    "How do you handle situations where team members are not meeting expectations or underperforming?"
  ],
  TimeManagement:[
    "How do you prioritize tasks when faced with multiple deadlines or competing demands?",
    "Can you provide an example of a time when you successfully managed a tight deadline?",
    "What tools or techniques do you use to organize your workload and manage your time effectively?",
    "How do you handle unexpected delays or interruptions to your planned schedule?",
    "Describe a situation where you had to delegate tasks effectively to ensure timely completion of a project."
  ],
 
  CriticalThinking:[
    "Describe a challenging problem you encountered during a project. How did you approach it and find a solution?",
    "How do you evaluate the credibility and reliability of information when making decisions or solving problems?",
    "Can you provide an example of a time when you had to think creatively to overcome a difficult obstacle?",
    "How do you identify and analyze potential risks or pitfalls in a project or decision?",
    "Describe a situation where you had to weigh multiple options and make a decision under pressure."
  ],
  Teamwork:[
    "Can you provide an example of a successful team project you were a part of? What was your role, and how did you contribute to the team's success?",
    "How do you foster collaboration and open communication within a team?",
    "Describe a time when you had to resolve conflicts or disagreements within a team. How did you approach the situation?",
    "What strategies do you use to ensure that all team members are engaged and motivated?",
    "How do you handle situations where team members have different work styles or personalities?"
  ],
  SoftwareEngineer:[
    "Can you describe a challenging technical problem you encountered in your previous projects? How did you approach solving it?",
    "What programming languages and frameworks are you most proficient in, and how do you stay updated with new technologies?",
    "How do you ensure the quality and reliability of your code?",
    "Describe your experience working in agile or scrum environments. How do you contribute to team sprints and deliverables?",
    "Can you provide an example of a project where you collaborated with cross-functional teams such as QA, design, and product management?"
  ],
  DataScientist:[
    "Can you explain a complex machine learning algorithm or model you have implemented in the past?",
    "How do you approach data cleaning, preprocessing, and feature engineering in your projects?",
    "What tools and programming languages do you primarily use for data analysis and modeling?",
    "Describe a time when you had to communicate technical findings or insights to non-technical stakeholders.",
    "How do you stay updated with the latest advancements and best practices in data science and machine learning?"
  ],
  ProductManager:[
    "Can you describe your approach to developing a product roadmap and prioritizing features?",
    "How do you gather and analyze user feedback to inform product decisions?",
    "Describe a successful product launch you were involved in. What were the key factors that contributed to its success?",
    "How do you collaborate with cross-functional teams such as engineering, design, and marketing to deliver product milestones?",
    "Can you provide an example of a challenging product management decision you had to make, and how you approached it?"
  ],
  UXDesigner:[
    "Can you walk us through your design process from initial concept to final implementation?",
    "How do you conduct user research and gather feedback to inform your design decisions?",
    "Describe a project where you had to balance user needs with technical constraints or business requirements.",
    "What tools and techniques do you use for prototyping and user testing?",
    "How do you collaborate with developers and product managers to ensure the successful implementation of your designs?"
  ],
  DevOpsEngineer:[
    "Can you explain the role of DevOps in the software development lifecycle and its importance?",
    "Describe your experience with continuous integration and continuous deployment (CI/CD) pipelines.",
    "How do you ensure the security and scalability of infrastructure and applications in a DevOps environment?",
    "What monitoring and logging tools do you use for tracking system performance and identifying issues?",
    "Can you provide an example of a time when you had to troubleshoot and resolve a critical production issue?"
  ],
 
  // Additional topics should be added similarly
};
 
const InterviewSection = () => {
  const [activeCategory, setActiveCategory] = useState('tech');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [displayQuestion, setDisplayQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setDisplayQuestion('');
  };
 
  const handleAddCustomQuestion = () => {
    if (customQuestion.trim()) {
      setDisplayQuestion(customQuestion);
      setCustomQuestion('');
      // setAnimationKey(prevKey => prevKey + 1);  // Update key to force re-animation
    }
  };
 
  const handleSurpriseMe = () => {
    if (!selectedTopic || !exampleQuestions[selectedTopic]) return;
    setLoading(true);
    setTimeout(() => {
      const questions = exampleQuestions[selectedTopic];
      const randomIndex = Math.floor(Math.random() * questions.length);
      setDisplayQuestion('');
      setTimeout(() => {
        setDisplayQuestion(questions[randomIndex]);
        setLoading(false);
        // setAnimationKey(prevKey => prevKey + 1);  // Update key to force re-animation
      }, 10);
    }, 1000);
  };
 
const handleRecord=()=>{
  navigate('/VideoRecord')
}



  // Animation variants for staggered text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
 
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120
      }
    }
  };
 
 
 
  return (
    <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Interview Practice</h1>
      <p className="text-lg text-gray-600 mb-8">Choose from our question bank or add your own prompts</p>
 
      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-lg shadow-lg" style={{ width: '400px', height: '400px' }}>
        {/* Category Buttons and Topics List */}
 
 
      <div className="flex justify-center mb-4">
            {Object.keys(topicsData).map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setSelectedTopic(''); setDisplayQuestion(''); }}
                className={`text-white bg-indigo-400 hover:from-indigo-200 hover:to-indigo-300 font-semibold py-2 px-4 rounded-lg shadow-md m-2 ${activeCategory === category ? 'ring-4 ring-indigo-400' : ''}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <ul className="space-y-4">
            {topicsData[activeCategory].map((topic, index) => (
              <li key={index}
                onClick={() => handleSelectTopic(topic)}
                className={`bg-gray-100 p-2 rounded-lg shadow-xl cursor-pointer ${selectedTopic === topic ? 'bg-indigo-300' : ''}`}
 
                //Higlight
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
 
        {/*animation --------------------- */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col" style={{ width: '400px', minHeight: '400px', overflowY: 'auto' }}>
        {displayQuestion && (
          <motion.div
            className="mb-4 p-4 bg-gray-100 text-gray-700 rounded shadow"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ overflowWrap: 'break-word' }}
          >
            {displayQuestion.split(' ').map((word, index) => (
              <motion.span key={index} className="mr-1" variants={itemVariants}>
                {word}
              </motion.span>
            ))}
          </motion.div>
         
        )}
        {/*animation --------------------- */}
 
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Add your question here"
            className="border border-gray-300 p-2 mt-auto rounded mb-2"
          />
 
          <div className="flex justify-between mb-2">
            <button
              onClick={handleAddCustomQuestion}
              className="text-white bg-sky-600 flex-1 mr-1 py-2 px-4 rounded shadow"
            >
              Add
            </button>
            <button
              onClick={handleSurpriseMe}
              className="bg-white text-sky-500 border-2 border-gradient-to-r from-sky-500 to-violet-500 flex items-center justify-center font-semibold flex-1 ml-1 py-2 px-4 rounded shadow" // Added gradient outline and changed text color
            >
              {loading ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Loading...
                </>
              ) : (
                'Surprise Me'
              )}
            </button>
          </div>
 
          <button
            disabled={!displayQuestion}
            className="text-white bg-gradient-to-r from-sky-500 to-violet-400 w-full py-2 px-4 rounded shadow" // Changed to gradient background for "Start practicing"
            onClick={handleRecord}
          >
            Start practicing
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default InterviewSection;
 