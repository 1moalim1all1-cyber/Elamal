/**
 * فاصل بصري بين الأقسام على هيئة ضربة فرشاة دهان — العنصر المميز للهوية البصرية.
 * flip: يعكس اتجاه الضربة لتنويع الإيقاع بين الأقسام.
 */
export function BrushDivider({
  color = "text-plaster-100",
  flip = false,
}: {
  color?: string;
  flip?: boolean;
}) {
  return (
    <div className={`${color} ${flip ? "-scale-x-100" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 60" className="block w-full" preserveAspectRatio="none">
        <path
          d="M0,40 C240,10 480,55 720,30 C960,5 1200,45 1440,20 L1440,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
