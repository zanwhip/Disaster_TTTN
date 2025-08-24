"use client";

import { FEATURES, FeatureItem } from "@/constants/features";

function FeatureCard({ icon: Icon, title, description, targetId }: FeatureItem) {
  const handleClick = () => {
    const section = document.getElementById(targetId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#4A2620] hover:bg-[#5A2E26] rounded-xl px-6 py-6 sm:px-8 sm:py-8 flex flex-col gap-6 text-white w-full h-full min-h-[250px] transition group cursor-pointer"
    >
      <div className="bg-white/10 p-4 rounded-full w-fit text-3xl sm:text-4xl lg:text-5xl text-[#FFFFFF14] group-hover:text-[#FF6600] transition">
        <Icon />
      </div>
      <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
      <div className="flex-1">
        <p className="text-sm sm:text-base text-gray-300 line-clamp-3">{description}</p>
      </div>
    </div>
  );
}

export default function FeatureSection() {
  return (
    <section className="bg-[#3B1E16] py-12 sm:py-16">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
        {FEATURES.map((item, index) => (
          <FeatureCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            targetId={item.targetId}
          />
        ))}
      </div>
    </section>
  );
}
