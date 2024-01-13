import saveAs from 'file-saver'
import html2canvas from 'html2canvas'

export const downloadImage = (id: string, ticker: string) => {
  const element = document.getElementById(id)

  html2canvas(element as HTMLElement, {
    useCORS: true,
    allowTaint: true,
    foreignObjectRendering: false,
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      saveAs(blob as Blob, `${ticker}.png`)
    })
  })
}
