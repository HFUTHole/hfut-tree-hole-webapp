import { join } from 'path'
import { defineConfig } from 'vite'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetIcons from '@unocss/preset-icons'
import Unocss from 'unocss/vite'
import react from '@vitejs/plugin-react'
import { presetUno } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'

function resolve(dir: string): string {
  return join(__dirname, dir)
}

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src/'),
    },
  },
  plugins: [
    react(),
    Unocss({
      shortcuts: {
        'center': 'flex items-center justify-center',
        'x-center': 'flex justify-center',
        'y-center': 'flex items-center',
        'col': 'flex flex-col',
      },
      presets: [
        presetUno(),
        presetIcons(),
        transformerVariantGroup(),
      ],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      imports: [
        'react',
      ],
      dirs: [
        './src',
      ],
      dts: true,
    }),
  ],
})
