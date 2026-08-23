import { Calendar, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useContent } from "../../lib/content";

export function NewsSection() {
  const content = useContent();

  const newsArticles = (content.news || []).map((article: any) => ({
    id: article.id,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    image: article.image_url,
    date: article.published_at
      ? new Date(article.published_at).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "",
  }));

  return (
    <section id="news" className="min-h-screen px-6 md:px-32 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
          LATEST <span className="text-[#FACC15]">NEWS</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          Stay updated with our latest programs, initiatives, and success stories from the field.
        </p>

        {newsArticles.length === 0 && (
          <p className="text-gray-400">No published news articles yet.</p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="bg-[#1a1a1a] border border-[#FACC15]/20 overflow-hidden group hover:border-[#FACC15] transition-all hover:scale-[1.02]"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#FACC15] text-black px-4 py-1 text-xs font-black uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar size={16} />
                  <span>{article.date}</span>
                </div>

                <h3 className="text-2xl font-black mb-3 text-white group-hover:text-[#FACC15] transition-colors">
                  {article.title}
                </h3>

                <p className="text-gray-400 mb-4">{article.excerpt}</p>

                <button className="flex items-center gap-2 text-[#FACC15] font-black uppercase text-sm tracking-wider group-hover:gap-4 transition-all">
                  Read More
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-[#FACC15] text-[#FACC15] px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#FACC15] hover:text-black transition-all">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
}
