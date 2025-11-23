import { motion } from "framer-motion";

const videos = [
  {
    title: "Capital One: Our Technology Story",
    id: "CQjv0wPjZYo"
  },
  {
    title: "Capital One: Move to the Cloud",
    id: "KHbz6i1yInw"
  },
  {
    title: "Inside Capital One's Machine Learning Platform",
    id: "bi1G2jiY6ZU"
  },
  {
    title: "Digital Disruption Explained",
    id: "9vKqVkMQHKQ"
  },
  {
    title: "How Digital Disruption is Changing Banking",
    id: "e6nnQxZrxNQ"
  },
  {
    title: "How Capital One Uses Cybersecurity to Protect Customers",
    id: "sVwVH8ysoMg"
  },
  {
    title: "AI in Fraud Detection and Risk Management",
    id: "BK4EYkJcbbQ"
  },
  {
    title: "Machine Learning in Banking",
    id: "wzN1fY8N6Bw"
  },
  {
    title: "How Banks Use AI Responsibly",
    id: "hK5u7J3z6TM"
  }
];

export default function VideoGallery() {
  return (
    <section className="w-full py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Video Insights: Technology & Digital Disruption
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl hover:scale-[1.03] transition-transform duration-300 bg-gray-900"
            >
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}