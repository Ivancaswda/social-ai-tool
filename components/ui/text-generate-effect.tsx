"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
                                     words,
                                     className,
                                     filter = true,
                                     duration = 0.5,
                                   }: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });
  // once: true → запускает только 1 раз
  // margin: "-100px" → анимация стартует чуть раньше, чем текст полностью войдет

  let wordsArray = words.split(" ");

  useEffect(() => {
    if (isInView) {
      animate(
          "span",
          {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
          },
          {
            duration: duration || 1,
            delay: stagger(0.2),
          }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
        <motion.div ref={scope}>
          {wordsArray.map((word, idx) => (
              <motion.span
                  key={word + idx}
                  className="dark:text-white text-black opacity-0"
                  style={{
                    filter: filter ? "blur(10px)" : "none",
                  }}
              >
                {word}{" "}
              </motion.span>
          ))}
        </motion.div>
    );
  };

  return (
      <div className={cn("font-bold", className)}>
        <div className="mt-4">
          <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
            {renderWords()}
          </div>
        </div>
      </div>
  );
};
