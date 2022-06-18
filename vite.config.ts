import { defineConfig } from 'vite'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetIcons from '@unocss/preset-icons'
import Unocss from 'unocss/vite'
import react from '@vitejs/plugin-react'
import { presetUno } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
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
  ],
})
