import { FeedbackTypes, feedbackTypes } from '..'
import { CloseButton } from '../../CloseButton'

type FeedbackTypeStepProps = {
  onFeedbackTypesChange: (key: FeedbackTypes) => void
}

export const FeedbackTypeStep = ({onFeedbackTypesChange}: FeedbackTypeStepProps) => {
  return (
    <>
      <header className="flex justify-between">
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              // ta dizendo que obrigatoriamente key é do tipo FeedbackTypes ('BUG', 'IDEA' e 'OTHER')
              onClick={() => onFeedbackTypesChange(key as FeedbackTypes)}
              type="button"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}
