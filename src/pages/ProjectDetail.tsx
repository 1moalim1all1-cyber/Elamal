import { useParams, Link } from "react-router-dom";
import { useCollection } from "@/hooks/useCollection";
import { projectsService } from "@/services";
import { demoProjects } from "@/data/demoData";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { items: live } = useCollection((cb) => projectsService.subscribe(cb));
  const projects = live.length ? live : demoProjects;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container-site py-24 text-center">
        <p className="text-lg text-stone">المشروع غير موجود</p>
        <Link to="/projects" className="mt-4 inline-block text-petrol-500 underline">
          الرجوع لكل المشاريع
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={project.title} parent="المشاريع" />
      <div className="container-site py-14">
        <div className="grid gap-8 sm:grid-cols-3">
          {project.images.map((img, i) => (
            <img key={i} src={img} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold text-ink-700">تفاصيل المشروع</h2>
            <p className="mt-3 leading-8 text-stone">
              {project.fullDescription ?? project.shortDescription}
            </p>
          </div>
          <dl className="h-fit divide-y divide-plaster-300 rounded-2xl border border-plaster-300">
            {project.client && <Row label="العميل" value={project.client} />}
            {project.location && <Row label="الموقع" value={project.location} />}
            {project.projectType && <Row label="نوع المشروع" value={project.projectType} />}
            {project.executionDate && <Row label="تاريخ التنفيذ" value={project.executionDate} />}
          </dl>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-3 text-sm">
      <dt className="font-semibold text-ink-500">{label}</dt>
      <dd className="text-stone">{value}</dd>
    </div>
  );
}
