import { AppFrame, type CrmView } from "@/components/crm/app-frame";
import { crmScreens } from "@/components/crm/screen-map";

/** Phones: a crop of a Nirman CRM window rendered at a readable width, sidebar left out. */
export function WindowCrop({ view, height = 300 }: { view: CrmView; height?: number }) {
  const S = crmScreens[view];
  return (
    <div className="overflow-hidden rounded-[1rem] shadow-[0_1.5rem_3rem_-1rem_rgba(18,20,24,0.3)] ring-1 ring-line" style={{ height }}>
      <div style={{ width: 760, marginLeft: -112 }}>
        <AppFrame active={view}>
          <S />
        </AppFrame>
      </div>
    </div>
  );
}
