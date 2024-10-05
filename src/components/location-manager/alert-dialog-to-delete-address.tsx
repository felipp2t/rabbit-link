import { Dispatch } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface AlertDialogToDeleteAddressProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<React.SetStateAction<boolean>>;
  handleDeleteAddress: () => void;
}

export function AlertDialogToDeleteAddress({
  isDialogOpen,
  setIsDialogOpen,
  handleDeleteAddress,
}: AlertDialogToDeleteAddressProps) {
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Excluir endereço</AlertDialogTitle>
        <AlertDialogDescription>
          Você tem certeza que deseja excluir este endereço? Esta ação não pode
          ser desfeita.
        </AlertDialogDescription>
        <div className="flex justify-end">
          <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAddress}>
            Confirmar
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
