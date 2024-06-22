import { Howl } from "howler";
import { getSoundURL } from "./useAssets";

const sound = new Howl({
  src: [getSoundURL("Ding")],
});

export { sound };
