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
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "../hooks/hook";
import { resetGame } from "../_lib/features/gameSlice/gameSlice";
import { useState } from "react";
import { loseMessage, winMessage } from "../_utils/constant";

export function GameResultAlert({
  open,
  result,
}: {
  open: boolean;
  result?: "win" | "lose";
}) {
  const dispatch = useAppDispatch();

  const [showAlert, setShowAlert] = useState<boolean>(open);

  const handleReset = () => {
    dispatch(resetGame());
  };
  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {result === "win" ? winMessage.title : loseMessage.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {result === "win" ? winMessage.message : loseMessage.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: `${result === "win" ? "default" : "destructive"}`,
            })}
            onClick={handleReset}
          >
            Restart
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
