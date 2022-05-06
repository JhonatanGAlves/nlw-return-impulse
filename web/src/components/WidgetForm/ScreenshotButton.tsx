import { useState } from "react"
import { Camera, Trash } from "phosphor-react"
import html2canvas from "html2canvas"
import { Loading } from "../Loading"

type ScreenshotButton = {
  screenshot: string | null
  onScreenshotTook: (screenshot: string | null) => void
}

export const ScreenshotButton = ({
  screenshot,
  onScreenshotTook
}: ScreenshotButton) => {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  const handleTakeScreenshot = async () => {
    setIsTakingScreenshot(true)
    // O querySelector pede que passe um valor nulo também caso não encontre o que está pedindo, mas nesse caso
    // como temos certeza de que tem a tag HTML, o ! ao lado é meio que "confia, tem uma tag HTML, pode continuar
    // lindamente"
    const canvas = await html2canvas(document.querySelector('html')!)
    // Vai tirar uma print e converter para uma imagem PNG no formato base64, base64 é um formato de texto e esse texto
    // representa uma imagem.
    const base64image = canvas.toDataURL('image/png')

    onScreenshotTook(base64image)
    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  )
}