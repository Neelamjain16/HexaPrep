import SingleCard from '../components/SingleCard';
 
import cardImage1 from '../assets/card_1.jpeg';
import cardImage2 from '../assets/card_2.png';
import cardImage3 from '../assets/card_3.png';
import cardImage4 from '../assets/card_4.png';
import cardImage5 from '../assets/card_5.png';
import cardImage6 from '../assets/card_6.png';
 
const CardsSection = () => {
  const cardData = [
    {
      title: "CSS color-scheme-dependent colors with light-dark()",
      tags: ['#css', '#webdev','#dark'],
      date: "Apr 22",
      link: "https://web.dev/articles/light-dark", // Ensure links include http:// or https://
      imageSrc: cardImage1,
    },
    {
      title: "Sorry Devin You Can't Replace our Jobs",
      tags: ['ai', '#github','#devtools'],
      date: "Apr 23",
      link: "https://dev.to/codewithshahan/sorry-devin-you-cant-replace-our-jobs-192b?ref=dailydev", // Add links for each card
      imageSrc: cardImage2,
    },
    {
      title: "How to React in 2024",
      tags: ['#webdev', '#react', '#typescript'],
      date: "Apr 23",
      link: "https://povio.com/blog/how-to-react-in-2024-vol-2/?ref=dailydev",
      imageSrc: cardImage3,
    },
    {
      title: "Transforming Teaching: How Generative AI is Enhancing Educator",
      tags: ['#genai'],
      date: "Apr 22",
      link: "https://app.daily.dev/posts/transforming-teaching-how-generative-ai-is-enhancing-educator-tools-and-methods-niligcjze", // Ensure links include http:// or https://
      imageSrc: cardImage4,
    },
    {
      title: "What is the ideal Tech stack to build a website in 2024? 👨‍💻",
      tags: ['#webdev', '#react','#devtools'],
      date: "Apr 23",
      link: "https://app.daily.dev/posts/what-is-the-ideal-tech-stack-to-build-a-website-in-2024--eqnrnsmlh", // Add links for each card
      imageSrc: cardImage5,
    },
    {
      title: "Developer Roadmaps",
      tags: ['#cloud', '#devops'],
      date: "Apr 23",
      link: "https://app.daily.dev/posts/developer-roadmaps-8szw9txwg",
      imageSrc: cardImage6,
    },
    // ... add more card objects as needed
  ];
 
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-2">
        {cardData.map((card, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-6  py-8">
            <SingleCard
              title={card.title}
              tags={card.tags}
              date={card.date}
              link={card.link}
              imageSrc={card.imageSrc}
            >
              {/* children components, if any */}
            </SingleCard>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default CardsSection;