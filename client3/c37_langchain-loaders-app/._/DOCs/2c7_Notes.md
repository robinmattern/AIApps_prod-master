
## Langchain Loaders App Notes
### A. Setup
 1. Open the video []()
 2. Clone the repository  
     `# mkdir client3; cd client3`  
    `# git clone https://github.com/developersdigest/langchain-document-loaders-in-node-js/tree/main 3c7_langchain-loaders-app`   
    `# cp 3c7_langchain-loaders-app/package.json .`

 3. Install Node-gyp dependencies
    - Just type: `# python`, it will open up Microsoft Store and install everything for the latest version of python
    - Go to URL: [node-gyp github repository](https://github.com/nodejs/node-gyp?tab=readme-ov-file#on-windowsPython)

    - Download [VS Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)   
    `# run vs_buildtools__eab67278161549bc9c2169dda47228d5.exe``  

4. Install Node dependencies
    This installation requires the compiler node-gyp.  To install it visit this url:    
    [https://github.com/nodejs/node-gyp#on-windowsPython](https://github.com/nodejs/node-gyp#on-windowsPython)   
    `# npm install`

        added 48 packages, changed 1 package, and audited 50 packages in 2m

        7 packages are looking for funding
        run `npm fund` for details

        3 moderate severity vulnerabilities

        To address all issues (including breaking changes), run:
        npm audit fix --force

        Run `npm audit` for details.

 
 4. Edit package.json for app    
    `# cp 3c7_langchain-loaders-app`    
    `# nano package.json`   

        "scripts": 
           "start": "node index.js",

 5. Run app  
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