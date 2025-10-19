export function createHtml({ title }: { title: string }) {
  const fontSize = title.length < 30 ? 140 : title.length < 50 ? 110 : 90
  const subtitleStyle = `
    display: -webkit-box;
    text-align: center;
    font-size: 50px;
    font-family: figtree-bold;
    margin-bottom: 20px;
    color: #7E7CC1;
  `

  const titleStyle = `
    text-align: center;
    font-size: ${fontSize}px;
    font-family: figtree-semi;
    line-height: ${fontSize}px;
    color: #7E7CC1;
  `

  const wrapperStyle = `
    width: 1200px;
    height: 630px;
    background-color: #000;
    background-image: radial-gradient(rgba(12, 10, 14), rgba(5, 5, 7));
    color: #7E7CC1;
    display: flex;
    font-size: 0px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `

  return `
    <div style="${wrapperStyle.replace(/\\n/g, ' ')}">
      <div style="display: flex; flex-direction: column; align-items: center; margin-left: 80px; margin-right: 80px;">
        <h2 style="${subtitleStyle}">arnorhs.dev</h2>
        <h1 style="${titleStyle}">${title}</h1>
      </div>
    </div>
  `
}
