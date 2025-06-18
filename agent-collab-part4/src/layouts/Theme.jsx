import { Theme as RadixTheme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import './index.css'

export default function Theme({ children }) {
  return (
    <RadixTheme
      appearance='dark'
      accentColor='green'
      scaling='100%'
      radius='full'>
      {children}
    </RadixTheme>
  )
}
