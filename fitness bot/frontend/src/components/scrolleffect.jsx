import { useRef, useEffect } from "react";
import { useInView, useAnimation, motion } from "framer-motion";
import { ReactNode } from "react";

type ScrollEffectProps = {
  children: ReactNode;
};

export function ScrollEffect({ children }: ScrollEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-100px 0px 0px 0px", once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate={controls}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}