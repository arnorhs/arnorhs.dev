export function createHtml({ title }: { title: string }) {
  const titleStyle = `
      text-align: center;
      font-size: 100px;
      font-family: figtree-semi;
      line-height: 100px;
      color: #4151b5;

    `
  const subtitleStyle = `
      display: -webkit-box;
      text-align: center;
      font-size: 50px;
      font-family: figtree-bold;
      margin-bottom: 30px;
      color: #4151b5;
    `
  const wrapperStyle = `
      width: 1200px;
      height: 630px;
      background-color: #0c0a0e;
      background-image: radial-gradient(rgba(0, 0, 0), rgba(12, 10, 14));
      color: #4151b5;
      display: flex;
      font-size: 0px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    `

  return `
    <div style="${wrapperStyle.replace(/\\n/g, ' ')}">
      <div style="display: flex; flex-direction: column; align-items: center; margin-left: 50px; margin-right: 50px;">
        <h2 style="${subtitleStyle}">arnorhs.dev</h2>
        <h1 style="${titleStyle}">${title}</h1>
      </div>
    </div>
  `
}
