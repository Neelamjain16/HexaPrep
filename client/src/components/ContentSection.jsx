import { motion } from 'framer-motion';
import content_section_img_1 from '../assets/content_section_img_1.png'; // First image path
import content_section_img_2 from '../assets/content_section_img_2.png'; // Second image path
 
const ContentSection = () => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
 
  return (
    <div className="bg-sky-50 py-20 relative">
      <h2 className="text-center text-4xl mb-40 font-semibold text-blue-900">How HexaPrep Works</h2>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between mb-16">
        {/* First image - left side with fade-in animation */}
        <motion.img
          src={content_section_img_1}
          alt="Machine App"
          className="w-full md:w-1/2 lg:w-2/5 md:-mr-16 z-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={variants}
        />
        {/* First card - right side with fade-in animation */}
        <motion.div
          className="w-full md:w-3/5 bg-white p-8 rounded-xl shadow-2xl md:-ml-10 z-10"
          style={{ transform: 'translateX(-5%)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          variants={variants}
        >
          <h3 className="text-2xl text-blue-900 font-semibold mb-4">Quantify your speaking</h3>
          <p className="text-black">
            Get personalized and private analytics on your visual, verbal, and vocal delivery. Um no more filler words
          </p>
        </motion.div>
      </div>
 
      <div className="my-40"></div>
 
      {/* Second set with reversed order and animations */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Second card - left side with fade-in animation */}
        <motion.div
          className="w-full md:w-3/5 bg-white p-8 rounded-xl shadow-2xl md:-mr-10 z-10"
          style={{ transform: 'translateX(5%)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={variants}
        >
          <h3 className="text-2xl text-blue-900 font-semibold mb-4">Practice with AI drills</h3>
          <p className="text-black">
            Practice fun 30 second drills to improve your impromptu speaking and manage your fear of public speaking
          </p>
        </motion.div>
        {/* Second image - right side with fade-in animation */}
        <motion.img
          src={content_section_img_2}
          alt="Collaboration"
          className="w-full md:w-1/2 lg:w-2/5 md:-ml-16 z-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          variants={variants}
        />
      </div>
 
      <div className="container mx-auto my-40 px-6 flex flex-col md:flex-row items-center justify-between mb-16">
        {/* Third image and card repeated with fade-in animation */}
        <motion.img
          src={content_section_img_1}
          alt="Machine App"
          className="w-full md:w-1/2 lg:w-2/5 md:-mr-16 z-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={variants}
        />
        <motion.div
          className="w-full md:w-3/5 bg-white p-8 rounded-xl shadow-2xl md:-ml-10 z-10"
          style={{ transform: 'translateX(-5%)' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          variants={variants}
        >
          <h3 className="text-2xl text-blue-900 font-semibold mb-4">Track your progress over time</h3>
          <p className="text-black">
            Measure your improvement with a dashboard showing your statistics over time! See how you’re doing relative to recommended benchmarks
          </p>
        </motion.div>
      </div>
    </div>
  );
};
 
export default ContentSection;