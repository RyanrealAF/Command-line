import { Module } from './types';

export const CURRICULUM_DATA: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1: The Magic Box',
    description: 'Understanding the Interface, Bash vs. PowerShell, and overcoming the fear of the terminal.',
    content: [
      { type: 'header', content: 'The Magic Box' },
      { type: 'paragraph', content: 'The terminal looks intimidating. Black screen, blinking cursor, no buttons. It feels like one wrong keystroke will brick your system. This fear is deliberately manufactured. The command line is simply a text-based conversation with your computer.' },
      { type: 'subHeader', content: 'The Text Message Analogy' },
      { type: 'paragraph', content: 'Think about texting a friend. You type a message, hit send, and get a reply. The command line works identically, except your "friend" is an operating system with perfect memory, zero humor, and no ability to infer meaning from typos.' },
      { type: 'subHeader', content: 'The Two Chefs: Bash vs. PowerShell' },
      { type: 'paragraph', content: 'Both are shells—software that interprets your commands. They have different philosophies.' },
      { type: 'list', content: 'Bash: The Short-Order Cook. Optimized for brevity. Inherited from Unix. Commands are abbreviated (ls, cd, rm). Treats everything as text streams.' },
      { type: 'list', content: 'PowerShell: The Head Chef. Designed by Microsoft. Verbose but consistent (Verb-Noun structure). Works with Objects, not just text.' },
      { type: 'subHeader', content: 'Key Vocabulary' },
      { type: 'list', content: 'The Prompt: Text before cursor (e.g., user@computer:~$)' },
      { type: 'list', content: 'The Command: The verb/action (e.g., echo, Get-ChildItem)' },
      { type: 'list', content: 'The Argument: The noun/target (e.g., "Hello")' },
      { type: 'subHeader', content: 'Your First Command' },
      { type: 'paragraph', content: 'Try saying hello to your computer.' },
      { type: 'code', content: 'echo "Hello"', language: 'bash' },
      { type: 'code', content: 'Write-Host "Hello"', language: 'powershell' }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What is the primary "philosophical" difference between Bash and PowerShell described in the text?',
        options: [
          'Bash is for Windows, PowerShell is for Mac.',
          'Bash works with text streams; PowerShell works with objects.',
          'Bash uses Verb-Noun syntax; PowerShell uses abbreviations.',
          'There is no difference.'
        ],
        correctAnswer: 1,
        explanation: 'Bash treats output as raw text streams, whereas PowerShell treats output as structured objects (data with properties).'
      },
      {
        id: 'q1-2',
        question: 'What is the "Prompt"?',
        options: [
          'The blinking cursor.',
          'The command you type.',
          'The text appearing before your cursor showing context (user, path).',
          'The error message returned by the computer.'
        ],
        correctAnswer: 2,
        explanation: 'The prompt sets the context, showing you who you are and where you are in the system.'
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Where Am I?',
    description: 'Navigation, directory structures, and absolute vs. relative paths.',
    content: [
      { type: 'header', content: 'The Filing Cabinet' },
      { type: 'paragraph', content: 'Your hard drive is a hierarchical filing cabinet. A folder is a drawer; a file is a document inside. You are always standing in exactly one location, called your **working directory**.' },
      { type: 'subHeader', content: 'The Path' },
      { type: 'paragraph', content: 'A path is a set of directions to a file.' },
      { type: 'list', content: 'Absolute Path: Starts from the root (/) or Drive (C:\\). Unambiguous.' },
      { type: 'list', content: 'Relative Path: Starts from where you are right now.' },
      { type: 'subHeader', content: 'Special Notations' },
      { type: 'code', content: '.  (Current Directory)\n.. (Parent Directory/One level up)\n~  (Home Directory)', language: 'text' },
      { type: 'subHeader', content: 'Essential Navigation Commands' },
      { type: 'paragraph', content: '1. Where am I?' },
      { type: 'code', content: 'pwd', language: 'bash' },
      { type: 'code', content: 'Get-Location (alias: pwd)', language: 'powershell' },
      { type: 'paragraph', content: '2. What is here?' },
      { type: 'code', content: 'ls', language: 'bash' },
      { type: 'code', content: 'Get-ChildItem (alias: ls, dir)', language: 'powershell' },
      { type: 'paragraph', content: '3. Go there (Change Directory)' },
      { type: 'code', content: 'cd Documents\ncd ..\ncd ~', language: 'bash' },
      { type: 'paragraph', content: 'Fluency requires building a mental model of the file system as a tree structure.' }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What does the command "cd .." do?',
        options: [
          'Goes to the root directory.',
          'Goes to the home directory.',
          'Moves you up one level to the parent directory.',
          'Prints the current directory.'
        ],
        correctAnswer: 2,
        explanation: 'The double dot (..) is a universal shorthand for "parent directory".'
      },
      {
        id: 'q2-2',
        question: 'In PowerShell, "ls" is an alias for which formal command?',
        options: [
          'List-Files',
          'Get-ChildItem',
          'Show-Directory',
          'Get-Content'
        ],
        correctAnswer: 1,
        explanation: 'PowerShell uses aliases to make the transition easier for Bash and DOS users. "ls" calls "Get-ChildItem".'
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Creating & Destroying',
    description: 'File management: mkdir, touch, cp, mv, and rm.',
    content: [
      { type: 'header', content: 'The Lego Set' },
      { type: 'paragraph', content: 'File management is about construction and destruction. The command line offers immediacy—no clicking menus.' },
      { type: 'subHeader', content: 'Making Folders' },
      { type: 'code', content: 'mkdir ProjectName', language: 'bash' },
      { type: 'code', content: 'New-Item ProjectName -Type Directory', language: 'powershell' },
      { type: 'subHeader', content: 'Making Files' },
      { type: 'code', content: 'touch file.txt', language: 'bash' },
      { type: 'code', content: 'New-Item file.txt', language: 'powershell' },
      { type: 'subHeader', content: 'Copying (The Photocopier)' },
      { type: 'paragraph', content: 'Creates a duplicate, leaving original untouched.' },
      { type: 'code', content: 'cp source.txt dest.txt\ncp -r folder copy_folder', language: 'bash' },
      { type: 'code', content: 'Copy-Item source.txt dest.txt', language: 'powershell' },
      { type: 'subHeader', content: 'Moving & Renaming' },
      { type: 'paragraph', content: 'Moving and renaming are the same operation: changing the path.' },
      { type: 'code', content: 'mv old.txt new.txt', language: 'bash' },
      { type: 'code', content: 'Move-Item old.txt new.txt', language: 'powershell' },
      { type: 'subHeader', content: 'Deleting: The Shredder' },
      { type: 'paragraph', content: 'WARNING: There is no Recycle Bin. Deleted is gone.' },
      { type: 'code', content: 'rm file.txt\nrm -r folder', language: 'bash' },
      { type: 'code', content: 'Remove-Item file.txt', language: 'powershell' }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Why is the "rm" command dangerous?',
        options: [
          'It can break your keyboard.',
          'It moves files to a hidden trash folder.',
          'It deletes files permanently without a recycle bin.',
          'It requires a password for every file.'
        ],
        correctAnswer: 2,
        explanation: 'Command line deletion is typically final. There is no "undo" or recycle bin by default.'
      },
      {
        id: 'q3-2',
        question: 'How do you rename a file in the terminal?',
        options: [
          'rn old new',
          'rename old new',
          'mv old new (Move it to a new name)',
          'cp old new'
        ],
        correctAnswer: 2,
        explanation: 'Renaming is conceptually the same as moving a file to a new path (the new filename).'
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4: The Plumbing',
    description: 'Pipes (|) and Redirection (>), composing complex workflows.',
    content: [
      { type: 'header', content: 'The Bucket Brigade' },
      { type: 'paragraph', content: 'Commands are single-purpose tools. The real power comes from chaining them together using **Pipes**.' },
      { type: 'subHeader', content: 'The Pipe (|)' },
      { type: 'paragraph', content: 'Takes the output of the command on the left and feeds it as input to the command on the right.' },
      { type: 'code', content: 'ls | sort | head -5', language: 'bash' },
      { type: 'paragraph', content: 'This lists files, sorts them, and takes the top 5. It transforms data in stages.' },
      { type: 'subHeader', content: 'Redirection (>)' },
      { type: 'paragraph', content: 'Connects commands to files, saving the output.' },
      { type: 'list', content: '> : Overwrite file (Destroys previous content)' },
      { type: 'list', content: '>> : Append to file (Adds to end)' },
      { type: 'code', content: 'echo "Log Entry" >> log.txt', language: 'bash' },
      { type: 'subHeader', content: 'Standard Streams' },
      { type: 'paragraph', content: '1. stdin (Input)\n2. stdout (Success output)\n3. stderr (Error output)' }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What happens if you use ">" on an existing file?',
        options: [
          'It adds text to the end of the file.',
          'It throws an error.',
          'It overwrites the file, erasing previous content.',
          'It creates a backup copy.'
        ],
        correctAnswer: 2,
        explanation: 'The single greater-than (>) operator overwrites. Use double (>>) to append.'
      },
      {
        id: 'q4-2',
        question: 'What does the pipe symbol (|) do?',
        options: [
          'Redirects output to a file.',
          'Runs two commands at the same time.',
          'Passes the output of the first command as input to the second.',
          'Stops the command.'
        ],
        correctAnswer: 2,
        explanation: 'Pipes connect the stdout of one command to the stdin of the next.'
      }
    ]
  },
  {
    id: 'module-5',
    title: 'Module 5: Memory Boxes',
    description: 'Variables: Storing and retrieving data.',
    content: [
      { type: 'header', content: 'Tupperware Containers' },
      { type: 'paragraph', content: 'Variables are labeled boxes for data. They allow you to store a value once and reference it many times (Indirection).' },
      { type: 'subHeader', content: 'Bash Variables' },
      { type: 'paragraph', content: 'Bash is picky about spaces. No spaces around equals sign!' },
      { type: 'code', content: 'name="Alice"   # Assignment (No $)\necho $name     # Retrieval (Must use $)', language: 'bash' },
      { type: 'subHeader', content: 'PowerShell Variables' },
      { type: 'paragraph', content: 'PowerShell always uses the $ sign.' },
      { type: 'code', content: '$Name = "Alice"  # Assignment\nWrite-Host $Name # Retrieval', language: 'powershell' },
      { type: 'subHeader', content: 'Why use them?' },
      { type: 'paragraph', content: '1. Avoid repetition (DRY).\n2. Parameterize scripts (Reusable code).\n3. Capture command output.' }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Which is valid Bash syntax for assignment?',
        options: [
          'name = "Bob"',
          '$name = "Bob"',
          'name="Bob"',
          'set name "Bob"'
        ],
        correctAnswer: 2,
        explanation: 'Bash forbids spaces around the equals sign during assignment.'
      },
      {
        id: 'q5-2',
        question: 'In Bash, when do you use the dollar sign ($) with a variable?',
        options: [
          'When assigning the value.',
          'When reading/retrieving the value.',
          'Always.',
          'Never.'
        ],
        correctAnswer: 1,
        explanation: 'You assign without $, you read with $.'
      }
    ]
  },
  {
    id: 'module-6',
    title: 'Module 6: Robot Logic',
    description: 'Loops: Automating repetitive tasks.',
    content: [
      { type: 'header', content: 'From Repetition to Iteration' },
      { type: 'paragraph', content: 'Don\'t wash 400 plates individually. Tell the robot: "For every plate in the pile, wash it."' },
      { type: 'subHeader', content: 'The Foreach Loop' },
      { type: 'paragraph', content: 'Takes a collection, processes item one by one, stops when done.' },
      { type: 'subHeader', content: 'Bash Syntax' },
      { type: 'code', content: 'for file in *.txt\ndo\n  echo "Found $file"\ndone', language: 'bash' },
      { type: 'subHeader', content: 'PowerShell Syntax' },
      { type: 'code', content: 'foreach ($file in Get-ChildItem *.txt) {\n  Write-Host "Found $($file.Name)"\n}', language: 'powershell' },
      { type: 'subHeader', content: 'Use Cases' },
      { type: 'list', content: 'Renaming files in bulk.' },
      { type: 'list', content: 'Processing data files (CSV, Logs).' },
      { type: 'list', content: 'Backing up multiple configs.' }
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'What is the "collection" in a loop?',
        options: [
          'The code inside the loop.',
          'The list of items you want to iterate over.',
          'The variable name.',
          'The command to stop the loop.'
        ],
        correctAnswer: 1,
        explanation: 'The collection is the pile of data (files, names, numbers) that the loop processes one by one.'
      },
      {
        id: 'q6-2',
        question: 'In Bash, which keywords define the body of the loop?',
        options: [
          '{ and }',
          'begin and end',
          'do and done',
          'start and finish'
        ],
        correctAnswer: 2,
        explanation: 'Bash uses "do" to start the loop block and "done" to close it.'
      }
    ]
  }
];
