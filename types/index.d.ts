import {Module} from "@nuxt/types";
// augment typings of Vue.js
import "./vue";

export interface DataCache {
  fetch<Data = any>(key: string, dataSource: any, seconds?: number): Promise<Data | null>;

  set(key: string, data: any, seconds?: number): Promise<boolean>;

  get<Data = any> (key: string): Promise<Data | null> ;

  remove (key: string): Promise<boolean>;
}

interface ModuleOptions {
  disabled?: boolean;
  apiEndpoint?: string;
}

type ICacheModule = Module<ModuleOptions>

declare module "@nuxt/vue-app" {
  interface NuxtAppOptions {
    $dataCache: DataCache
  }
}
// Nuxt 2.9+
declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $dataCache: DataCache
  }

  interface Context {
    $dataCache: DataCache
  }
}
