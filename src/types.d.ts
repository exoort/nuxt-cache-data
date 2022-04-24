interface IDataCache {
  fetch<Data>(key: string, dataSource: any, seconds?: number): Promise<Data | null>;

  set(key: string, data: any, seconds?: number): boolean;

  get<Data> (key: string): Promise<Data | null> ;

  remove (key: string): boolean;
}

interface ModuleOptions {
  disabled?: boolean;
  apiEndpoint?: string;
}

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $dataCache: IDataCache
  }
}

declare module '@nuxt/types' {
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
  interface Store<S> {
    $dataCache: IDataCache
  }
}
