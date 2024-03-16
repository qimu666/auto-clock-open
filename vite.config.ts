import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from '@vant/auto-import-resolver';
import banner from 'vite-plugin-banner'
import colors from 'picocolors'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), Components({
        resolvers: [VantResolver()],
    }), banner(`2222222`)
        ,
        {

            apply: 'serve',
            enforce: 'pre',
            configureServer(server) {
                const print = server.printUrls;
                server.printUrls = () => {
                    console.info(colors.red(`  ➜  代码出处信息`))
                    console.info(colors.red(`  ➜  By：qimu`))
                    console.info(colors.red(`  ➜  Wx：aqimu66`))
                    console.info(colors.red(`  ➜  Github：https://github.com/qimu666/Auto-Clock`))
                    console.info(colors.green(``))
                    print();
                }
            }
        }],
})

