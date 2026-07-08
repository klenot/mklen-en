import { forMachinesMd } from "@/data/for-machines-content";
import { markdownResponse } from "@/lib/markdown-response";

export async function GET() {
  return markdownResponse(forMachinesMd);
}
