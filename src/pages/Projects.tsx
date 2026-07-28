import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { projectsService } from "@/services";
import { demoProjects } from "@/data/demoData";
import { PageHeader } from "@/components/ui/PageHeader";

export default function Projects() {
  const { items: live } = useCollection((cb) => projectsService.subscribe(cb));
  const projects = (live.length ? live : demoProjects).filter((p) => p.isPublished);

  return (
    <div>
      <PageHeader title="المشاريع" />
      <div className="container-site grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.slug}`}
            className="group overflow-hidden rounded-2xl border border-plaster-300 bg-white"
          >
            <div className="aspect-[4/3] overflow-hidden bg-plaster-300">
              <img
                src={project.images[0]}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-ink-700">{project.title}</h3>
              {project.location && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-stone">
                  <MapPin size={14} /> {project.location}
                </p>
              )}
              <p className="mt-2 line-clamp-2 text-sm text-stone">{project.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
