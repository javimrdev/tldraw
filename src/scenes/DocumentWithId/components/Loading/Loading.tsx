import { Spinner } from "@/components/ui/shadcn-io/spinner";

export const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner variant="circle" />
    </div>
  );
};
