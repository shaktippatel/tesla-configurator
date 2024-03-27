import { Color } from "./color.model";
import { Config } from "./config.model";
import { Tesla } from "./tesla.model";

export interface TeslaOptions {
  selectedModel?: Tesla;
  selectedColor?: Color;
  selectedConfig?: Config;
  includeYoke: boolean,
  includeTow: boolean
}
