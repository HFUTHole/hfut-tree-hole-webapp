import { join } from 'path'
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import react from '@vitejs/plugin-react'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import { ohmytsVite } from '@ohmyts/vite'

function resolve(dir: string): string {
  return join(__dirname, dir)
}

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src/'),
    },
  },
  server: {
    host: true,
  },
  plugins: [
    ohmytsVite({
      target: '/api',
      rootDir: resolve('@types'),
      proxyOptions: {
        target: 'http://localhost:8000',
      },
      overwrite: false,
    }),
    Unocss({
      shortcuts: [
        {
          'center': 'flex items-center justify-center',
          'x-center': 'flex justify-center',
          'y-center': 'flex items-center',
          'col': 'flex flex-col',
          'text-holder': 'text-gray-500/85',
          'text-secondary': 'light:text-black/45 dark:text-white/85',
        },
        [/wh([0-9]+)/, match => `w-[${match[1]}px] h-[${match[1]}px]`],
        [/(top|left|right|bottom)([0-9]+)/, match => `${match[1]}-[${match[2]}rem]`],
        [/flex([0-9]+)/, match => `flex-[${match[1]}]`],
        [/j-([a-z]+)/, match => `justify-${match[1]}`],
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
      ],

    }),
    react(),
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
    }),
  ],
})
