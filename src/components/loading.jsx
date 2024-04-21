import { CgSpinner as Spinner } from "react-icons/cg";

export function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Spinner className=" animate-spin text-destructive h-12 w-12" />
    </div>
  );
}
