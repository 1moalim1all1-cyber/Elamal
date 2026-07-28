import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { productsService, productCategoriesService } from "@/services";
import { demoProducts, demoCategories } from "@/data/demoData";
import { ProductCard } from "@/components/ui/ProductCard";
import { PageHeader } from "@/components/ui/PageHeader";

const PAGE_SIZE = 12;

export default function Products() {
  const { items: liveProducts } = useCollection((cb) => productsService.subscribe(cb));
  const { items: liveCategories } = useCollection((cb) => productCategoriesService.subscribe(cb));
  const products = liveProducts.length ? liveProducts : demoProducts;
  const categories = liveCategories.length ? liveCategories : demoCategories;

  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"latest" | "name">("latest");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCategorySlug = params.get("category");

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.isPublished && !p.isDeleted);
    if (activeCategorySlug) {
      const cat = categories.find((c) => c.slug === activeCategorySlug);
      if (cat) list = list.filter((p) => p.categoryId === cat.id);
    }
    if (search.trim()) {
      list = list.filter((p) => p.name.includes(search.trim()));
    }
    list = [...list].sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name, "ar") : b.createdAt - a.createdAt
    );
    return list;
  }, [products, categories, activeCategorySlug, search, sort]);

  const visible = filtered.slice(0, page * PAGE_SIZE);

  const FiltersPanel = (
    <div className="space-y-2">
      <button
        onClick={() => setParams({})}
        className={`block w-full rounded-xl px-4 py-2.5 text-right text-sm font-semibold ${
          !activeCategorySlug ? "bg-petrol-500 text-white" : "bg-plaster-300 text-ink-500"
        }`}
      >
        كل المنتجات
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setParams({ category: cat.slug })}
          className={`block w-full rounded-xl px-4 py-2.5 text-right text-sm font-semibold ${
            activeCategorySlug === cat.slug ? "bg-petrol-500 text-white" : "bg-plaster-300 text-ink-500"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <PageHeader title="المنتجات" />
      <div className="container-site grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <h3 className="mb-4 font-display font-bold text-ink-700">التصنيفات</h3>
          {FiltersPanel}
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-xs">
              <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن منتج..."
                className="w-full rounded-full border border-plaster-300 bg-white py-2.5 pr-10 pl-4 text-sm outline-none focus:border-petrol-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-plaster-300 px-4 py-2.5 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal size={15} /> فلاتر
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "latest" | "name")}
                className="rounded-full border border-plaster-300 bg-white px-4 py-2.5 text-sm outline-none"
              >
                <option value="latest">الأحدث</option>
                <option value="name">الاسم</option>
              </select>
            </div>
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-stone">لا توجد منتجات مطابقة لبحثك</p>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {visible.length < filtered.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full bg-ink-500 px-8 py-3 text-sm font-bold text-white hover:bg-ink-600"
              >
                عرض المزيد
              </button>
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-700/60" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-3xl bg-white p-6">
            <h3 className="mb-4 font-display font-bold text-ink-700">التصنيفات</h3>
            {FiltersPanel}
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-5 w-full rounded-full bg-petrol-500 py-3 text-sm font-bold text-white"
            >
              تطبيق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
