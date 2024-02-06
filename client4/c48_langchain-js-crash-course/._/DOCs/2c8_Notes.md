
## Langchain JS Full Course Notes
### A. Setup
 1. Open the video [LangChain with JavaScript - COMPLETE TUTORIAL - Basics to advanced concept!](https://www.youtube.com/watch?v=mAYS4d0hrek)
 2. Clone the repository  
     `# mkdir client4; cd client4`  
    `# git clone https://github.com/Coding-Crashkurse/LangChain-JS-Full-Course 3c8o_langchain-js-full-course`   
    `# git clone https://github.com/Coding-Crashkurse/LangChain-JS-Full-Course 3c8_langchain-js-full-course` 

 3. Delete .git and .gitignore from the client4 folder  

 4. Edit client4/package.json for app    
    `# cp 4c8_langchain-js-full-course/package.json package.json`
    `# nano package.json`   
        "name": "4c_langchain-js-crash-course apps",
        "scripts": {
          "start": "echo \"Run App in 4c8_langchain-js-crash-course\" && exit 1",

 5. Install Node dependencies
    `# npm install`

        npm WARN deprecated langchainplus-sdk@0.0.11: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.

        added 90 packages, and audited 91 packages in 3m

        18 packages are looking for funding
        run `npm fund` for details

        3 moderate severity vulnerabilities

        To address all issues (including breaking changes), run:
        npm audit fix --force

        Run `npm audit` for details.
 
 5. Edit client4/package.json in the app folder    
    `# cd 4c8_langchain-js-full-course`    
    `# nano package.json`   
        "name": "4c8_langchain-js-crash-course-app",

        "scripts": 
           "start": "node 00_basics.js",
           "run1":  "node 01_first_chain.js",
          
 6. Get and set API_Key for Open AI
    - Create an account at: [https://platform.openai.com/apps](https://platform.openai.com/apps) (for suzee.parker@gmail.com)
    - Go to URL: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
    - Click on the button, Create new secret key
    - Enter a name: 4c8_langchain-js-crash-course
    - In popup window, click on the button, Create new key
    - Click on the button, Copy
    - Create new file: .env, edit it and paste the key after OPENAI_API_KEY= 
    `# nano .env`
          OPENAI_API_KEY=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

 7. Run app  
    `# npm start`
   
### Problems

    `$ npm install`
        npm ERR! code 1
        npm ERR! path E:\Repos\Robin\AIApps_\dev01-robin\client3\node_modules\hnswlib-node
        npm ERR! command failed
        npm ERR! command C:\Windows\system32\cmd.exe /d /s /c node-gyp rebuild
        npm ERR! gyp info it worked if it ends with ok
        npm ERR! gyp info using node-gyp@10.0.1
        npm ERR! gyp info using node@20.10.0 | win32 | x64
        npm ERR! gyp ERR! find Python 
        npm ERR! gyp ERR! find Python Python is not set from command line or npm configuration
        npm ERR! gyp ERR! find Python Python is not set from environment variable PYTHON
        npm ERR! gyp ERR! find Python checking if the py launcher can be used to find Python 3
        npm ERR! gyp ERR! find Python - executable path is ""
        npm ERR! gyp ERR! find Python - "" could not be run
        npm ERR! gyp ERR! find Python checking if "python3" can be used
        npm ERR! gyp ERR! find Python - executable path is ""
        npm ERR! gyp ERR! find Python - "" could not be run
        npm ERR! gyp ERR! find Python checking if "python" can be used
        npm ERR! gyp ERR! find Python - executable path is ""
        npm ERR! gyp ERR! find Python - "" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Users\Robin\AppData\Local\Programs\Python\Python311\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Users\Robin\AppData\Local\Programs\Python\Python311\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files\Python311\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files\Python311\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Users\Robin\AppData\Local\Programs\Python\Python311-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Users\Robin\AppData\Local\Programs\Python\Python311-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files\Python311-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files\Python311-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files (x86)\Python311-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files (x86)\Python311-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Users\Robin\AppData\Local\Programs\Python\Python310\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Users\Robin\AppData\Local\Programs\Python\Python310\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files\Python310\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files\Python310\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Users\Robin\AppData\Local\Programs\Python\Python310-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Users\Robin\AppData\Local\Programs\Python\Python310-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files\Python310-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files\Python310-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files (x86)\Python310-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files (x86)\Python310-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Users\Robin\AppData\Local\Programs\Python\Python39\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Users\Robin\AppData\Local\Programs\Python\Python39\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files\Python39\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files\Python39\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Users\Robin\AppData\Local\Programs\Python\Python39-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Users\Robin\AppData\Local\Programs\Python\Python39-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files\Python39-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files\Python39-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files (x86)\Python39-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files (x86)\Python39-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Users\Robin\AppData\Local\Programs\Python\Python38\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Users\Robin\AppData\Local\Programs\Python\Python38\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files\Python38\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files\Python38\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Users\Robin\AppData\Local\Programs\Python\Python38-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Users\Robin\AppData\Local\Programs\Python\Python38-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files\Python38-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files\Python38-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python checking if Python is C:\Program Files (x86)\Python38-32\python.exe
        npm ERR! gyp ERR! find Python - version is ""
        npm ERR! gyp ERR! find Python - version is  - should be >=3.6.0
        npm ERR! gyp ERR! find Python - THIS VERSION OF PYTHON IS NOT SUPPORTED
        npm ERR! gyp ERR! find Python - "C:\Program Files (x86)\Python38-32\python.exe" could not be run
        npm ERR! gyp ERR! find Python
        npm ERR! gyp ERR! find Python **********************************************************
        npm ERR! gyp ERR! find Python You need to install the latest version of Python.
        npm ERR! gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
        npm ERR! gyp ERR! find Python you can try one of the following options:
        npm ERR! gyp ERR! find Python - Use the switch --python="C:\Path\To\python.exe"
        npm ERR! gyp ERR! find Python (accepted by both node-gyp and npm)
        npm ERR! gyp ERR! find Python - Set the environment variable PYTHON
        npm ERR! gyp ERR! find Python - Set the npm configuration variable python:
        npm ERR! gyp ERR! find Python npm config set python "C:\Path\To\python.exe"
        npm ERR! gyp ERR! find Python For more information consult the documentation at:
        npm ERR! gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
        npm ERR! gyp ERR! find Python **********************************************************
        npm ERR! gyp ERR! find Python
        npm ERR! gyp ERR! configure error
        npm ERR! gyp ERR! stack Error: Could not find any Python installation to use
        npm ERR! gyp ERR! stack at PythonFinder.fail (C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\npm\node_modules\node-gyp\lib\find-python.js:306:11)
        npm ERR! gyp ERR! stack at PythonFinder.findPython (C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\npm\node_modules\node-gyp\lib\find-python.js:164:17)
        npm ERR! gyp ERR! stack at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
        npm ERR! gyp ERR! stack at async configure (C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\npm\node_modules\node-gyp\lib\configure.js:23:18)
        npm ERR! gyp ERR! stack at async run (C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js:81:18)
        npm ERR! gyp ERR! System Windows_NT 10.0.22631
        npm ERR! gyp ERR! command "C:\\Users\\Robin\\AppData\\Local\\nvs\\default\\node.exe" "C:\\Users\\Robin\\AppData\\Local\\nvs\\node\\20.10.0\\x64\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild" 
        npm ERR! gyp ERR! cwd E:\Repos\Robin\AIApps_\dev01-robin\client3\node_modules\hnswlib-node
        npm ERR! gyp ERR! node -v v20.10.0
        npm ERR! gyp ERR! node-gyp -v v10.0.1
        npm ERR! gyp ERR! not ok

        npm ERR! A complete log of this run can be found in: C:\Users\Robin\AppData\Local\npm-cache\_logs\2024-01-25T14_34_30_922Z-debug-0.log

    `$ npm install --global --production windows-build-tools``

        Starting installation...
        npm ERR! Downloading installers failed. Error: TypeError: 'process.env' only accepts a configurable, writable, and enumerable data descriptor
        npm ERR!     at Function.defineProperty (<anonymous>)
        npm ERR!     at Object.removePath (C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\windows-build-tools\dist\utils\remove-path.js:11:12)
        npm ERR!     at Object.install (C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\windows-build-tools\dist\install\index.js:29:19)
        npm ERR!     at C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\windows-build-tools\dist\start.js:17:19
        npm ERR!     at Object.download (C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\windows-build-tools\dist\download.js:35:5)
        npm ERR!     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
        npm ERR!     at async Object.aquireInstallers (C:\Users\Robin\AppData\Local\nvs\node\20.10.0\x64\node_modules\windows-build-tools\dist\aquire-installers.js:32:13) {
        npm ERR!   code: 'ERR_INVALID_OBJECT_DEFINE_PROPERTY'
        npm ERR! }
        npm ERR! windows-build-tools will now exit.