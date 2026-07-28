import { Link } from "react-router-dom";
import { useCollection } from "@/hooks/useCollection";
import { articlesService } from "@/services";
import { demoArticles } from "@/data/demoData";
import { PageHeader } from "@/components/ui/PageHeader";

export default function Articles() {
  const { items: live } = useCollection((cb) => articlesService.subscribe(cb));
  const articles = (live.length ? live : demoArticles).filter(
    (a) => a.status === "published" && !a.isDeleted
  );

  return (
    <div>
      <PageHeader title="المواضيع والمقالات" />
      <div className="container-site grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.slug}`}
            className="group overflow-hidden rounded-2xl border border-plaster-300 bg-white"
          >
            <div className="aspect-video overflow-hidden bg-plaster-300">
              <img
                src={article.coverImageUrl}
                alt={article.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-ink-700 line-clamp-2">{article.title}</h3>
              {article.author && <p className="mt-2 text-xs text-stone">بقلم: {article.author}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
