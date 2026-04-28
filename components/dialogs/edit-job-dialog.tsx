'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { Application } from '@/lib/types';
import EditJobForm from '@/components/forms/edit-job-form';

type Props = {
  job: Application;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditJobDialog({ job, open, setOpen }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent className='min-w-120'>
        <DialogHeader>
          <DialogTitle>Edit a Job Application</DialogTitle>
          <DialogDescription>
            Change details you wish to be different
          </DialogDescription>
        </DialogHeader>
        <EditJobForm
          job={job}
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
