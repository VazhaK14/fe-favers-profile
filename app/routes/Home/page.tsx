import HomeModule from "../../../src/modules/HomeModule";
import { loader } from "./loader";
import { action } from "./action";

export { loader, action };

export default function Home() {
  return <HomeModule />;
}
