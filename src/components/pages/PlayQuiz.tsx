"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitUserAnswerAndGetScore } from "@/actions/quiz.action";
import { cn } from "@/lib/utils";
import { QuizType, UserAnswer } from "@/types/quiz.type";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronLeftIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";

interface QuizLayoutProps {
  quiz: QuizType;
  index: number;
  userId: string;
}

export default function PlayQuizPage({ quiz, index, userId }: QuizLayoutProps) {
  const currentQuestion = quiz.questions[index];
  const previousIndex = index - 1;
  const nextIndex = index + 1;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answerInLocalStorage, setAnswerInLocalStorage] = useState<
    UserAnswer[]
  >([]);

  const router = useRouter();

  // Find the answer from local storage if it exists
  const previousAnswer = answerInLocalStorage.find(
    (storedAnswer) => storedAnswer.questionId === currentQuestion.questionId
  )?.userAnswer;

  useEffect(() => {
    const local = JSON.parse(
      localStorage.getItem("answerInLocalStorage") || "[]"
    );
    setAnswerInLocalStorage(local);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedAnswer) return;

    setAnswerInLocalStorage((prevAnswers) => {
      const existingAnswer = prevAnswers.find(
        (storedAnswer) => storedAnswer.questionId === currentQuestion.questionId
      );

      let updatedAnswers;
      if (existingAnswer) {
        existingAnswer.userAnswer = selectedAnswer;
        updatedAnswers = prevAnswers;
      } else {
        updatedAnswers = [
          ...prevAnswers,
          {
            questionId: currentQuestion.questionId,
            userAnswer: selectedAnswer,
          },
        ];
      }

      localStorage.setItem(
        "answerInLocalStorage",
        JSON.stringify(updatedAnswers)
      );
      return updatedAnswers;
    });

    // Navigate to the next question if it's not the last one
    if (nextIndex !== quiz.questions.length) {
      router.push(`/quiz/${quiz.quizId}/${nextIndex}`);
    }
  };

  const [isAlertSubmit, setIsAlertSubmit] = useState(false);

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return;

  return (
    <>
      <div className="max-w-3xl mx-auto px-3">
        <PlayQuizNavigation
          quiz={quiz}
          index={index}
          answerInLocalStorage={answerInLocalStorage}
          setIsAlertOpen={setIsAlertSubmit}
        />
        <form onSubmit={handleSubmit}>
          <div className="py-2 flex gap-3">
            <h1>{++index}.</h1>
            <div>
              <p className="mb-4">{currentQuestion.questionText}</p>
              <RadioGroup
                defaultValue={previousAnswer}
                value={selectedAnswer || previousAnswer}
                onValueChange={setSelectedAnswer}
                className="grid md:grid-cols-2 gap-3 py-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={currentQuestion.answerOptions.A}
                    id={currentQuestion.answerOptions.A}
                  />
                  <Label htmlFor={currentQuestion.answerOptions.A}>
                    {currentQuestion.answerOptions.A}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={currentQuestion.answerOptions.B}
                    id={currentQuestion.answerOptions.B}
                  />
                  <Label htmlFor={currentQuestion.answerOptions.B}>
                    {currentQuestion.answerOptions.B}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={currentQuestion.answerOptions.C}
                    id={currentQuestion.answerOptions.C}
                  />
                  <Label htmlFor={currentQuestion.answerOptions.C}>
                    {currentQuestion.answerOptions.C}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={currentQuestion.answerOptions.D}
                    id={currentQuestion.answerOptions.D}
                  />
                  <Label htmlFor={currentQuestion.answerOptions.D}>
                    {currentQuestion.answerOptions.D}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex justify-between mt-8 mb-5">
            <Button variant="outline" size="icon" asChild>
              <Link
                href={`/quiz/${quiz.quizId}/${previousIndex}`}
                aria-disabled={index === 0}
                className={cn(
                  previousIndex === -1 && "pointer-events-none opacity-50"
                )}
              >
                <DoubleArrowLeftIcon className="size-5" />
              </Link>
            </Button>
            <Button
              type="submit"
              color={selectedAnswer ? "primary" : "secondary"}
            >
              Submit
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link
                href={`/quiz/${quiz.quizId}/${nextIndex}`}
                aria-disabled={index === quiz.questions.length - 1}
                className={cn(
                  nextIndex === quiz.questions.length &&
                    "pointer-events-none opacity-50"
                )}
              >
                <DoubleArrowRightIcon className="size-5" />
              </Link>
            </Button>
          </div>
        </form>
      </div>
      <DialogSubmitUserAnswer
        userId={userId}
        quizId={quiz.quizId}
        userAnswer={answerInLocalStorage}
        isAlertOpen={isAlertSubmit}
        setIsAlertOpen={setIsAlertSubmit}
      />
    </>
  );
}

function DialogSubmitUserAnswer({
  userId,
  quizId,
  userAnswer,
  isAlertOpen,
  setIsAlertOpen,
}: {
  userId: string;
  quizId: string;
  userAnswer: UserAnswer[];
  isAlertOpen: boolean;
  setIsAlertOpen: (arg0: boolean) => void;
}) {
  const router = useRouter();
  const handleClick = async () => {
    await submitUserAnswerAndGetScore(userId, quizId, userAnswer);
    localStorage.removeItem("answerInLocalStorage");
    setIsAlertOpen(false);
    router.push("/dashboard");
  };

  return (
    <>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleClick}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const PlayQuizNavigation = ({
  quiz,
  index,
  answerInLocalStorage,
  setIsAlertOpen,
}: {
  quiz: QuizType;
  index: number;
  answerInLocalStorage: UserAnswer[];
  setIsAlertOpen: (arg0: boolean) => void;
}) => {
  return (
    <>
      <div className="w-full flex justify-between items-center mb-6 h-14">
        <div className="flex items-center gap-2">
          <Link href="/quiz">
            <ChevronLeftIcon className="size-6" />
          </Link>
          <h1>{quiz.title}</h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <HamburgerMenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Question</SheetTitle>
              <SheetDescription>
                Make sure your answers are double checked.
              </SheetDescription>
            </SheetHeader>
            <ol className="grid py-4 w-full h-full overflow-x-hidden list-decimal list-inside">
              {quiz.questions.map((question, i) => {
                const questionAnswered = answerInLocalStorage.find(
                  (answer) => answer.questionId === question.questionId
                );
                return (
                  <Link key={i} href={`${i}`}>
                    <li
                      className={cn(
                        index === i && "bg-muted",
                        questionAnswered && "text-green-500",
                        "truncate p-2 hover:bg-muted"
                      )}
                    >
                      {question.questionText}
                    </li>
                  </Link>
                );
              })}
            </ol>
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="button"
                  className={
                    answerInLocalStorage.length !== quiz.questions.length
                      ? "opacity-20"
                      : "opaciqty-100"
                  }
                  disabled={
                    answerInLocalStorage.length !== quiz.questions.length
                  }
                  onClick={() => setIsAlertOpen(true)}
                >
                  Finish Quiz
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
