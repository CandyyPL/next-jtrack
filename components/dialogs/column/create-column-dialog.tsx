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
import CreateColumnForm from '@/components/forms/column/create-column-form';

type Props = {
  board: Board;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CreateColumnDialog({ board, open, setOpen }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent className='min-w-[min(calc(100vw-1rem),32rem)]'>
        <DialogHeader>
          <DialogTitle>Add a Column</DialogTitle>
          <DialogDescription>
            Create new column for your job applications.
          </DialogDescription>
        </DialogHeader>
        <CreateColumnForm
          boardId={board.id}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
