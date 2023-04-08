export const scrollIntoView = (ref: React.RefObject<HTMLElement>) => {
   ref.current?.scrollIntoView({ behavior: "smooth" });
};
