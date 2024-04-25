import { motion } from 'framer-motion';
 
// eslint-disable-next-line react/prop-types
const SingleCard = ({ title, tags, date, imageSrc, link, children }) => {
  return (
    <motion.div
      className="max-w-md w-full bg-white/10 backdrop-blur-md border border-gray-200/10 shadow-2xl rounded-lg overflow-hidden my-4 mx-4 mb-20 h-auto md:h-96 cursor-pointer"
      whileHover={{ scale: 1.05 }} // Zoom-out effect, makes the card slightly larger on hover
      transition={{ duration: 0.3 }} // Smooth transition for the hover effect
    >
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full" style={{ textDecoration: 'none' }}> {/* Link and styling to remove underline */}
        <div className="px-6 py-4 flex flex-col justify-between" style={{ height: '100%' }}>
          <div>
            <div className="font-bold text-xl mb-2">{title}</div>
            <div className="text-gray-300 text-base">
              {tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200/20 rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2 mb-2">
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-gray-700 text-base mb-1">{date}</p>
          </div>
          <div>
            {children}
          </div>
          {imageSrc && (
            <div className="px-1 pt-2 pb-2 mb-2">
              <img src={imageSrc} alt="Card" style={{ height: '200px', width: '100%', objectFit: 'cover' }} className="rounded-lg shadow-lg" />
            </div>
          )}
        </div>
      </a>
    </motion.div>
  );
};
 
export default SingleCard;
 
 