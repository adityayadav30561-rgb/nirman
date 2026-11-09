import type { ReactNode } from "react";
import { AppFrame, type CrmView } from "@/components/crm/app-frame";

/*
 * The real Nirman CRM window (components/crm) shown large enough to read and
 * cropped by its parent, like a zoomed screenshot. Position it with
 * className (left / top, in rem so it shrinks a little on phones).
 */
export function CrmShot({ active, className = "", children }: { active: CrmView; className?: string; children: ReactNode }) {
  return (
    <div className={`absolute w-[60rem] ${className}`}>
      <AppFrame active={active}>{children}</AppFrame>
    </div>
  );
}
