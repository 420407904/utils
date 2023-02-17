import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'

const env = process.env.env_type

const isProdEnv = env === 'production'

const config = {
    input: 'src/index.js',
    output: {
        name: 'bundleName',
        file: 'umd/bundle_umd.js',
        format: 'umd',
        sourcemap: true
    },
    external: [],
}


const plugins = [
    nodeResolve(),
    babel({
        exclude: '**/node_modules/**',
        babelHelpers: 'bundled'
    }),
    isProdEnv && filesize(),
    replace({
        'process.env.NODE_ENV': JSON.stringify(env)
    }),
    commonjs(),
    isProdEnv && terser()
].filter(Boolean)


config.plugins = plugins

export default config
