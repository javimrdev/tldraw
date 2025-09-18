import { Spinner } from "@/components/ui/shadcn-io/spinner";

export const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner variant="circle" />
    </div>
  );
};
