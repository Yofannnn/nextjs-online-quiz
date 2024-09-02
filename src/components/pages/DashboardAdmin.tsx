"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { logout } from "@/lib/auth";
import { saveQuestionQuizToDatabaseAction } from "@/actions/quiz.action";
import { useActionErrors } from "@/lib/use-action-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  AnswerOption,
  TemporaryQuestionInLocalStorageType,
} from "@/types/quiz.type";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminDashboardPage() {
  // create quiz
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const defaultAnswerOption: AnswerOption = {
    A: "",
    B: "",
    C: "",
    D: "",
  };
  const [answerOptions, setAnswerOptions] =
    useState<AnswerOption>(defaultAnswerOption);
  const [temporaryQuestionsLocalStorage, setTemporaryQuestionsLocalStorage] =
    useState<TemporaryQuestionInLocalStorageType[]>([]);

  useEffect(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem("temporaryQuestionsInLocalStorage") || "[]"
    );
    setTemporaryQuestionsLocalStorage(savedQuestions);
  }, []);

  const handleSaveQuestionsToLocal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // save question to local
    if (!questionText || !correctAnswer) return;

    setTemporaryQuestionsLocalStorage((prev) => {
      const update = [
        ...prev,
        {
          questionId: uuidv4(),
          questionText,
          answerOptions,
          correctAnswer,
        },
      ];
      localStorage.setItem(
        "temporaryQuestionsInLocalStorage",
        JSON.stringify(update)
      );
      return update;
    });

    setQuestionText("");
    setCorrectAnswer("");
    setAnswerOptions(defaultAnswerOption);
    e.currentTarget.reset();
  };

  async function handleLogout() {
    await logout();
  }

  return (
    <>
      <div>
        <div className="mx-auto flex justify-center items-center gap-4">
          <h1 className="text-center text-2xl my-5">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div className="mx-auto max-w-3xl px-3 py-4">
          <form onSubmit={handleSaveQuestionsToLocal} className="grid gap-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="question">Question</Label>
              <Textarea
                placeholder="Enter the question here and will save to local before submit to database"
                id="question"
                name="question"
                className="min-h-[150px]"
                onChange={(e) => setQuestionText(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Answer Options</Label>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Input
                  name="option1"
                  type="text"
                  placeholder="First Option"
                  required
                  onChange={(e) =>
                    setAnswerOptions((prev) => ({
                      ...prev,
                      A: e.target.value,
                    }))
                  }
                />
                <Input
                  name="option2"
                  type="text"
                  placeholder="Second Option"
                  required
                  onChange={(e) =>
                    setAnswerOptions((prev) => ({
                      ...prev,
                      B: e.target.value,
                    }))
                  }
                />
                <Input
                  name="option3"
                  type="text"
                  placeholder="Third Option"
                  required
                  onChange={(e) =>
                    setAnswerOptions((prev) => ({
                      ...prev,
                      C: e.target.value,
                    }))
                  }
                />
                <Input
                  name="option4"
                  type="text"
                  placeholder="Fourth Option"
                  required
                  onChange={(e) =>
                    setAnswerOptions((prev) => ({
                      ...prev,
                      D: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="correctAnswer">Correct Answer</Label>
              <Input
                id="correctAnswer"
                type="text"
                name="correctAnswer"
                placeholder="Correct Answer"
                onChange={(e) => setCorrectAnswer(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </div>
        {temporaryQuestionsLocalStorage.length !== 0 && (
          <div className="mx-auto max-w-3xl px-4">
            <h1 className="text-xl text-center my-3">
              Question saved to local
            </h1>
            <ol className="list-decimal pl-4">
              {temporaryQuestionsLocalStorage.map((qna, i) => (
                <li key={i} className="my-3">
                  <div className="flex flex-col md:flex-row gap-1 items-start p-1 rounded-xl bg-muted">
                    <span className="font-bold">Question:</span>{" "}
                    <span>{qna.questionText}</span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-1 items-start p-1 rounded-xl bg-muted">
                    <span className="font-bold">Options:</span>
                    <span>
                      <p>A. {qna.answerOptions.A}</p>
                      <p>B. {qna.answerOptions.B}</p>
                      <p>C. {qna.answerOptions.C}</p>
                      <p>D. {qna.answerOptions.D}</p>
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-1 items-start p-1 rounded-xl bg-muted">
                    <span className="font-bold">Answer:</span>{" "}
                    <span>{qna.correctAnswer}</span>
                  </div>
                </li>
              ))}
            </ol>
            <DialogSubmitToDatabase
              localQuestions={temporaryQuestionsLocalStorage}
            />
          </div>
        )}
      </div>
    </>
  );
}

function DialogSubmitToDatabase({
  localQuestions,
}: {
  localQuestions: TemporaryQuestionInLocalStorageType[];
}) {
  const saveToDb = saveQuestionQuizToDatabaseAction.bind(null, localQuestions);
  const [state, formAction] = useFormState(saveToDb, {});
  const { errors, setFieldError } = useActionErrors(state);
  const fieldErrors = errors?.fieldErrors || {};
  const formErrors = errors?.formErrors;

  useEffect(() => {
    if (errors && formErrors?.length !== 0) {
      toast({
        variant: "destructive",
        title: "Upsss",
        description: errors?.formErrors?.join(" "),
      });
    }
    if (state.success) {
      localStorage.removeItem("temporaryQuestionsInLocalStorage");
      toast({
        title: "Success",
        description: "Quiz created successfully",
      });
    }
  }, [errors, formErrors?.length, state.success]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button color="primary" className="my-5">
            Submit to Database
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Its all done?</DialogTitle>
            <DialogDescription>
              Save to Database. Click submit when done.
            </DialogDescription>
          </DialogHeader>
          <form action={formAction}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  className="col-span-3"
                  required
                />
                <p className="text-xs text-destructive">{fieldErrors?.title}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="genre" className="text-right">
                  Genre Quiz
                </Label>
                <Input
                  type="text"
                  id="genre"
                  name="genreOfQuiz"
                  className="col-span-3"
                  required
                />
                <p className="text-xs text-destructive">
                  {fieldErrors?.genreOfQuiz}
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Submit</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
