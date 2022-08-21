import { useContext } from "react";

import { ManagementOthers } from "./inputs";

export function useValuesContext() {
  return useContext(ManagementOthers);
}
