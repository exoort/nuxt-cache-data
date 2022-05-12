import {DataCache} from "./index";

// augment typings of Vue.js
import "./vue";

declare module "vue/types/vue" {
  interface Vue {
    $dataCache: DataCache
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $dataCache: DataCache
  }
}
