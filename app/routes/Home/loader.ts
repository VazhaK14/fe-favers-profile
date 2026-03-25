import { members } from "../../../src/modules/HomeModule/const";

export async function loader() {
  return { members };
}
