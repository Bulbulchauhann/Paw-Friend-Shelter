import { cn } from "@/lib/utils";
import { lora } from "@/app/layout";
import { BookHeart, CircleDollarSign, CreditCard } from "lucide-react";
import VolunteerForm from "./volunteer-form";

const SheltorSupportSection = () => {
  return (
    <div className="border bg-[#f9f9fb] relative px-5 lg:px-[120px]">
      <div className="py-16 space-y-10">
        <div className="flex flex-col gap-4">
          <h1
            className={cn(
              lora.className,
              "text-primary text-center text-3xl font-semibold"
            )}
          >
            Shelter Support
          </h1>
          <p className="text-center">
            How can you help the sheltor? Here are some options
          </p>
        </div>

        <div className="my-5 flex flex-col gap-6 lg:flex-row [&>div]:flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <h4 className="font-semibold text-lg">Financial support</h4>
                <CircleDollarSign className="font-semibold text-primary" />
              </div>

              <p className="max-w-xs">
                You can donate to help provide food, medical care, and other
                necessities for the animals in the shelter.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <h4 className="font-semibold text-lg">
                  I want to help financially
                </h4>
              </div>

              <p className="max-w-xs flex flex-row items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>Account to receive the donation</span>
              </p>
              <p>1234 5678 1234 5678</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <h4 className="font-semibold text-lg">Volunteering</h4>
                <BookHeart className="font-semibold text-primary" />
              </div>

              <p className="max-w-xs">
                You can join our team and help with animal care, cleaning, and other tasks
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <h4 className="font-semibold text-lg">
                  I want to become a volunteer
                </h4>
              </div>

              <p className="max-w-xs flex flex-row items-center gap-2">
                <span>Please fill out the form and we will contact you.</span>
              </p>
            </div>

            <VolunteerForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SheltorSupportSection;
