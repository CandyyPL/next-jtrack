'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { Application, Column } from '@/lib/types';
import EditJobForm from '@/components/forms/edit-job-form';
import EditColumnForm from '@/components/forms/edit-column-form';

type Props = {
  column: Column;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditColumnDialog({ column, open, setOpen }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent className='max-w-[screen - 1rem] w-120'>
        <DialogHeader>
          <DialogTitle>Edit a Column</DialogTitle>
          <DialogDescription>
            Change details you wish to be different
          </DialogDescription>
        </DialogHeader>
        <EditColumnForm
          column={column}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
