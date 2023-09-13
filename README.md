# Diverge "DocQueries" AI-Powered Document Chat

Welcome to the AI-Powered Document Chat repository! This project combines the power of FastAPI, React, and artificial intelligence to create a web application that can analyze and chat about uploaded documents. Whether you want to extract insights from a research paper, have a conversation with a historical document, or simply explore the capabilities of AI, this project has you covered.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Demo

![Demo GIF](./demo.gif)

Check out our live demo [here](https://example.com) to see the AI-Powered Document Chat in action!

## Features

- **Document Upload:** Upload a document in various formats such as PDF, DOCX, TXT, or image files.
- **AI Analysis:** Our AI engine will process the document and extract key information.
- **Chat Interface:** Engage in a conversation with the AI to discuss the document's content.
- **Multi-Format Support:** Supports a wide range of document formats for analysis.
- **User-Friendly:** Intuitive web interface designed with React for ease of use.
- **Customization:** Extend and customize the AI's capabilities by fine-tuning its models.

## Getting Started

Follow these steps to get the AI-Powered Document Chat up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following software installed:

- Python 3.x
- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ai-document-chat.git
   cd ai-document-chat
   pip install -r requirements.txt
   cd frontend```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt```
3. Install Node.js dependencies for the React app:
   ```bash
   npm install```
4. Start the FastAPI server:
  ```bash
  uvicorn app.main:app --reload```
5. Start the React development server:
  ```bash
  cd frontend
  npm start```
Your web application should now be accessible at `http://localhost:3000.`



## Usage

1. Access the web application by navigating to `http://localhost:3000` in your web browser.

2. Upload a document you want to analyze and chat about.

3. Wait for the AI to process the document. Once done, you can start a conversation.

4. Interact with the AI by typing messages, and it will respond based on its analysis of the document.

5. Explore and customize the AI's behavior by fine-tuning its models and responses as needed.

## Contributing

We welcome contributions from the open-source community! Feel free to open issues, submit pull requests, or reach out to us with your ideas and suggestions.

## License

This project is NOT licensed under the [MIT License](LICENSE). You are not free to use, modify, and distribute this software as long as you provide attribution to the original authors and include the license text.


