import saveAs from 'file-saver'
import * as htmlToImage from 'html-to-image'

export const downloadImage = (id: string, ticker: string) => {
  try {
    const element = document.getElementById(id)

    htmlToImage
      .toBlob(element as HTMLElement, {
        includeQueryParams: true,
      })
      .then(function (blob) {
        saveAs(blob as Blob, `${ticker}.png`)
      })
  } catch (_) {}
}
