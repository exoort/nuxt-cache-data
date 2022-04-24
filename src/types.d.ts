declare module 'nuxt-cache-data' {
  import {Module} from "@nuxt/types";

  export interface IDataCache {
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
}

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  import {IDataCache} from "nuxt-cache-data";

  interface Vue {
    $dataCache: IDataCache
  }
}

declare module '@nuxt/types' {
  import {IDataCache, ModuleOptions} from "nuxt-cache-data";

  interface NuxtConfig {
    dataCache: ModuleOptions
  } // Nuxt 2.14+
  interface Configuration {
    dataCache: ModuleOptions
  } // Nuxt 2.9 - 2.13

  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $dataCache: IDataCache
  }

  // nuxtContext.$myInjectedFunction
  interface Context {
    $dataCache: IDataCache
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import {IDataCache} from "nuxt-cache-data";

  interface Store<S> {
    $dataCache: IDataCache
  }
}
