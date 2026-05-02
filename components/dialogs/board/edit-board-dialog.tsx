'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { Board } from '@/lib/types';
import EditBoardForm from '@/components/forms/board/edit-board-form';

type Props = {
  board: Board;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditBoardDialog({ board, open, setOpen }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent className='min-w-[min(calc(100vw-1rem),32rem)]'>
        <DialogHeader>
          <DialogTitle>Edit a Board</DialogTitle>
          <DialogDescription>
            Change details you wish to be different
          </DialogDescription>
        </DialogHeader>
        <EditBoardForm
          board={board}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
