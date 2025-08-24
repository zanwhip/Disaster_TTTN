"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiCheckCircle, FiRotateCw, FiGlobe, FiUsers } from "react-icons/fi";

import { STEPS } from "@/constants/features";


export default function ProcessSteps() {
  const [activeIndex, setActiveIndex] = useState(0);

  const ICONS: Record<string, React.ElementType> = {
    search: FiSearch,
    check: FiCheckCircle,
    rotate: FiRotateCw,
    global: FiGlobe,
    person: FiUsers,
  };

  return (
    <div className="rounded border border-gray-100 shadow-xl">
      <h2 className="text-4xl font-bold mb-8 md:px-40 px-0 pt-10">
        Hướng dẫn an toàn khi thiên tai xảy ra
      </h2>
      <div className="flex flex-col md:flex-row gap-16 items-center px-6  pb-10">
        <div className="flex flex-col gap-4 w-full md:w-1/2 relative">
          <div className="relative pl-16">
            <div className="absolute left-22 top-0 bottom-0 w-[2px] bg-gray-300"></div>

            {STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              const Icon = ICONS[step.icon];

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-center gap-6 mb-8 cursor-pointer transition-all ${
                    isActive ? "text-[#49271c]" : "text-gray-800"
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div
                    className={`flex z-10 bg-white ${
                      isActive ? "py-4" : "py-2"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "bg-orange-100 border-white text-orange-600 scale-125"
                          : "bg-white border-gray-400"
                      }`}
                    >
                      <Icon size={isActive ? 32 : 28} />
                    </div>
                  </div>
                  <div>
                    <h3
                      className={`transition-all duration-300 leading-snug ${
                        isActive ? "text-3xl font-bold" : "text-xl font-normal"
                      }`}
                    >
                      {step.title}
                    </h3>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600 text-lg mt-2 max-w-[450px]"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[700px] h-[450px] relative overflow-hidden rounded-xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={STEPS[activeIndex].image}
                  alt={STEPS[activeIndex].title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
