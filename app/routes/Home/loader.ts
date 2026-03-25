import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  RequestHandler,
} from "react-router";
import { members } from "../../../src/modules/HomeModule/const";

export async function loader({ request }: LoaderFunctionArgs) {
  return { members };
}
