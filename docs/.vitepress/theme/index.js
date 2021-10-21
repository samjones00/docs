import DefaultTheme from 'vitepress/theme'
import CleanUrlsMd from './../includes/clean-urls.md'
import WebNewCorefxMd from '../includes/web-new-corefx.md'
import WebTroubleMd from '../includes/web-trouble.md'


import ClientLoginUis from '../../src/components/ClientLoginUis.vue'
import ClientContactUis from '../../src/components/ClientContactsUis.vue'
import ServerLoginUis from '../../src/components/ServerLoginUis.vue'
import ServerContactUis from '../../src/components/ServerContactsUis.vue'
import HelloApi from "../../src/components/HelloApi.vue";

import './custom.css'

import Layout from './Layout.vue';

export default {
    ...DefaultTheme,
    Layout: Layout,
    enhanceApp: ({ app }) => {
        app.component('CleanUrlsMd',CleanUrlsMd)
        app.component('WebNewCorefxMd',WebNewCorefxMd)
        app.component('WebTroubleMd',WebTroubleMd)
        app.component('ClientLoginUis',ClientLoginUis)
        app.component('ClientContactUis',ClientContactUis)
        app.component('ServerLoginUis',ServerLoginUis)
        app.component('ServerContactUis',ServerContactUis)
        app.component('HelloApi',HelloApi)

        // v-focus attribute directive example
        app.directive('focus', {
            mounted(el) {
                el.focus()
            }
        })
    }
};