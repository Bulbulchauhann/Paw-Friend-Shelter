import { lora } from "@/app/layout";
import { cn } from "@/lib/utils";
import HeroSectionFirstCTAGroup from "./hs-first-cta-group";
import HsSecondPhotos from "./hs-second-photos";

const HeroSection = () => {
  return (
    <div className="bg-[#f9f9fb] relative px-5 lg:px-[120px]">
      <div className="py-10 flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col gap-3 order-1 lg:order-[0] max-w-md self-center">
          <h1
            className={cn(
              lora.className,
              "text-5xl capitalize font-semibold leading-[1.18] hidden lg:block"
            )}
          >
            Paws Friends Shelter
          </h1>
          <p className="text-lg text-center lg:text-left">
            We are an organization that exists on a volunteer basis and help
            animals find loving and caring homes.
          </p>

          <HeroSectionFirstCTAGroup />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <HsSecondPhotos />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
