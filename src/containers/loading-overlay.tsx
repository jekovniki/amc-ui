/**
 * @note : requires the parent to have position relative
 */

import { Loader } from "@/components/loader";
import { ReactNode } from "react";

interface LoadingOverlayProps {
  showLoader: boolean;
  children: ReactNode;
}

const LoadingOverlay = ({
  showLoader = true,
  children,
}: LoadingOverlayProps) => {
  return (
    <div className="w-full h-full bg-[rgba(0,0,0,0.33)] z-[1] absolute top-[0] flex items-center justify-center">
      <div className="bg-white shadow-md text-center mx-4 transition-all rounded-sm p-10 flex gap-4 items-center justify-center flex-col">
        {showLoader && <Loader />}
        {children}
      </div>
    </div>
  );
};

export default LoadingOverlay;
