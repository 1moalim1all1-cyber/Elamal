import { useParams, Link } from "react-router-dom";
import { useCollection } from "@/hooks/useCollection";
import { articlesService } from "@/services";
import { demoArticles } from "@/data/demoData";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ArticleDetail() {
  const { slug } = useParams();
  const { items: live } = useCollection((cb) => articlesService.subscribe(cb));
  const articles = live.length ? live : demoArticles;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="container-site py-24 text-center">
        <p className="text-lg text-stone">المقال غير موجود</p>
        <Link to="/articles" className="mt-4 inline-block text-petrol-500 underline">
          الرجوع لكل المقالات
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={article.title} parent="المواضيع" />
      <div className="container-site max-w-3xl py-14">
        <img src={article.coverImageUrl} alt={article.title} className="w-full rounded-2xl" />
        {article.author && <p className="mt-4 text-sm text-stone">بقلم: {article.author}</p>}
        {/* المحتوى قادم من محرر Rich Text في لوحة الإدارة، لذلك يُعرض كـ HTML منسق */}
        <div
          className="prose prose-lg mt-6 max-w-none leading-8 text-ink-600"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
