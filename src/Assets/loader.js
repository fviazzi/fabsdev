const importAll = r => r.keys().map(r)

const img   = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/))
const fonts = importAll(require.context('./fonts', false, /\.(ttf|woff|woff2)$/))

console.log(img, fonts)

export { img, fonts }
