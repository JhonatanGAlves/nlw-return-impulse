import { useState } from "react"
import { CloseButton } from "../CloseButton"
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep"
import { FeedbackContentStep } from "./Steps/FeedbackContentStep"

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto"
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada"
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão"
    }
  }
}

// Object.entries(feedbackTypes) =>
/*
  * [
  *   ['BUG', {...}],
  *   ['IDEA', {...}],
  *   ['OTHER', {...}]
  * ]
*/

// Ta dizendo que o tipo do FeedbackTypes é somente as chaves de feedbackTypes ('BUG', 'IDEA' e 'OTHER')
export type FeedbackTypes = keyof typeof feedbackTypes

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | null>(null)

  return (
    <div className="flex flex-col items-center relative p-4 mb-4 rounded-2xl shadow-lg bg-zinc-900 w-[calc(100vw-2rem)] md:w-auto">
      <header className="flex justify-between">
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>

      {!feedbackType ? (
        <FeedbackTypeStep onFeedbackTypesChange={setFeedbackType} />
      ) : (
        // <FeedbackContentStep />
        <p>Hello World</p>
      )
      }

      <footer className="text-xs text-neutral-400">
        Feito por <a className="underline underline-offset-2" href="https://github.com/JhonatanGAlves">Jhonatan Alves</a>
      </footer>
    </div >
  )
}