/// <reference types="vite/client" />

declare module '*.png?w=90&format=webp&as=url' {
  const src: string
  export default src
}

declare module '*.png?w=90&as=url' {
  const src: string
  export default src
}
