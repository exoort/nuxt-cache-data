import {Module} from "@nuxt/types";

interface DataCache {
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

declare module '@nuxt/vue-app' {
  interface Context {
    $dataCache: DataCache
  }

  interface NuxtAppOptions {
    $dataCache: DataCache
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $dataCache: DataCache
  }
  interface NuxtAppOptions {
    $dataCache: DataCache
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $dataCache: DataCache
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $dataCache: DataCache
  }
}
