import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export function PageHeader({ title, parent }: { title: string; parent?: string }) {
  return (
    <div className="bg-ink-500 py-14 text-white">
      <div className="container-site">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h1>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-plaster-200">
          <Link to="/" className="hover:text-amber-400">الرئيسية</Link>
          <ChevronLeft size={14} />
          {parent && (
            <>
              <span>{parent}</span>
              <ChevronLeft size={14} />
            </>
          )}
          <span className="text-amber-400">{title}</span>
        </div>
      </div>
    </div>
  );
}
