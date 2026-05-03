import { Application, Board } from '@/lib/types';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const testApplications: Omit<Application, 'columnId'>[][] = [
  // Column 1 (2 items)
  [
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      company: 'TechNova',
      position: 'Senior React Developer',
      location: 'Remote',
      listOrder: 0,
      salary: '$150,000',
      url: 'https://technova.io/jobs/1',
      desc: 'Frontend architecture and component library maintenance.',
      tags: 'React,TypeScript',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      company: 'DataStream',
      position: 'UI Engineer',
      location: 'New York, NY',
      listOrder: 1,
      salary: '$135,000',
      url: 'https://datastream.ai/careers',
      desc: 'Building data visualization dashboards.',
      tags: 'D3.js,CSS',
    },
  ],

  // Column 2 (3 items)
  [
    {
      id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      company: 'GreenGrid',
      position: 'Full Stack Developer',
      location: 'Austin, TX',
      listOrder: 0,
      salary: '$120,000',
      url: 'https://greengrid.com/apply',
      desc: 'Node.js backend with a React frontend.',
      tags: 'Node,Postgres',
    },
    {
      id: 'ad68b948-2615-4687-9952-4a004667d60a',
      company: 'CyberShield',
      position: 'Security Engineer',
      location: 'Remote',
      listOrder: 1,
      salary: '$160,000',
      url: 'https://cybershield.com/jobs',
      desc: 'Implementing OAuth and security protocols.',
      tags: 'Security,Auth',
    },
    {
      id: '3e36928e-59f5-4422-9214-72647702f306',
      company: 'CloudPath',
      position: 'DevOps Engineer',
      location: 'Seattle, WA',
      listOrder: 2,
      salary: '$145,000',
      url: 'https://cloudpath.com/openings',
      desc: 'Managing AWS infrastructure and CI/CD pipelines.',
      tags: 'AWS,Docker',
    },
  ],

  // Column 3 (2 items)
  [
    {
      id: '8f74e644-848e-49b0-951c-4299b9e6919e',
      company: 'PixelPerfect',
      position: 'Product Designer',
      location: 'San Francisco, CA',
      listOrder: 0,
      salary: '$130,000',
      url: 'https://pixelperfect.design',
      desc: 'Designing user flows and high-fidelity mockups.',
      tags: 'Figma,UX',
    },
    {
      id: 'd9e83f2a-6f0d-400c-b262-4217f227b7b1',
      company: 'Finflow',
      position: 'Backend Engineer',
      location: 'Remote',
      listOrder: 1,
      salary: '$155,000',
      url: 'https://finflow.com/jobs',
      desc: 'Scaling Go-based microservices.',
      tags: 'Golang,Microservices',
    },
  ],

  // Column 4 (1 item)
  [
    {
      id: '77747e62-c115-4672-9d32-d1d86d528b76',
      company: 'SwiftLogistics',
      position: 'QA Tester',
      location: 'Chicago, IL',
      listOrder: 0,
      salary: '$95,000',
      url: 'https://swiftlogistics.com/careers',
      desc: 'Manual and automated regression testing.',
      tags: 'QA,Selenium',
    },
  ],
];

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHABLE_KEY!
);

const USER_ID = process.env.SEEDING_USER_ID!;

async function seed() {
  if (!USER_ID) {
    console.log('Add `SEEDING_USER_ID` to your .env file');
    return;
  }

  console.log(`Seeding data for user ${USER_ID}..`);

  const { data: boardData, error: boardError } = await supabase
    .from('board')
    .select()
    .eq('userId', USER_ID)
    .single();

  if (!boardData || boardError) {
    console.log("Could not find user's board. Creating..");
    const { initUserBoards } = await import('../lib/actions/init-user-board');
    await initUserBoards(USER_ID);

    const { data: boardData, error: boardError } = await supabase
      .from('board')
      .select()
      .eq('userId', USER_ID)
      .single();

    if (!boardData || boardError) {
      console.log('Error occurred during creating user board:');
      console.log(boardError);
      return;
    }

    const board = boardData as Board;

    const { data: columnsData, error: columnsError } = await supabase
      .from('column')
      .select()
      .eq('boardId', board.id);

    if (!columnsData || columnsError) {
      console.log('Error occurred during creating user board:');
      console.log(columnsError);
      return;
    }
  }

  console.log("Found user's board");

  const board = boardData as Board;

  const { data: columnsData, error: columnsError } = await supabase
    .from('column')
    .select()
    .eq('boardId', board.id);

  if (!columnsData || columnsError) {
    console.log('Error occurred during creating user board:');
    console.log(columnsError);
    return;
  }

  console.log('Found columns');

  const columns = columnsData.sort((a, b) => a.listOrder - b.listOrder);

  console.log('Adding job applications..');
  let i = 1;

  for (const column of columns) {
    const idx = columns.findIndex((col) => col.id === column.id);

    const newApplications = testApplications[idx].map((app) => ({
      ...app,
      columnId: column.id,
    }));

    const { error } = await supabase
      .from('application')
      .insert(newApplications);

    if (error) {
      console.log('Error occurred during seeding data:');
      console.log(error);
      return;
    }

    console.log(`Done seeding ${i}/4 columns`);
    i += 1;
  }

  console.log('Seeding successful');
}

seed();
