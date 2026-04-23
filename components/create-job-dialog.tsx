'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateJobForm from '@/components/create-job-form';
import { useState } from 'react';

type Props = {
  columnId: string;
};

export default function CreateJobDialog({ columnId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Plus />
          Add Job
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-120'>
        <DialogHeader>
          <DialogTitle>Add Job Application</DialogTitle>
          <DialogDescription>Track a new job application</DialogDescription>
        </DialogHeader>
        <CreateJobForm
          closeDialog={() => setOpen(false)}
          columnId={columnId}
        />
      </DialogContent>
    </Dialog>
  );
}
