import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger);

/** The same curve as CSS --ease-standard, so tweens and transitions decelerate alike. */
CustomEase.create("quiet", "0.22,1,0.36,1");
gsap.defaults({ ease: "quiet", duration: 0.9 });

export { gsap, ScrollTrigger, useGSAP };
