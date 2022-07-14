import {Module} from "@nuxt/types";

export type DataCacheKey = string | {
  key: string,
  secret?: string,
}

export type DataCacheItem = {
  value: string,
  time: number,
  secret: string | null,
}

export type DataCacheItems = Record<string, DataCacheItem>

interface DataCache {
  getAll(): Promise<DataCacheItems>;

  fetch<Data = any>(key: DataCacheKey, dataSource: any, seconds?: number): Promise<Data>;

  set(key: DataCacheKey, data: any, seconds?: number): Promise<boolean>;

  get<Data = any>(key: DataCacheKey): Promise<Data>;

  remove(key: DataCacheKey): Promise<boolean>;
}

interface ModuleOptions {
  disabled?: boolean;
  writeEmpty?: boolean;
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
