# Chess Notation Trainer

## Check out the application for yourself

- Live link: https://www.chessnotationtrainer.com
- Don't want to create an account? Try out the application using one of our dummy accounts!
  - username: username1, username2, username3, ...username9
  - password: password

## Overview

Chess Notation Trainer is an interactive web application designed to help chess enthusiasts improve their skills in reading and writing chess notation. Whether you're a beginner learning the basics or an experienced player looking to sharpen your notation speed, this app provides a fun and engaging way to practice.

## Features

### Minigames

- **Make that Move**: Given a board position and a move in chess notation, you are tasked with making the correct move!
- **Name that Notation**: A move is shown on a board, correctly name the move's notation to move on!

### Chess Games

- **VS Bot**: Practice typing chess notation by playing against AI.
- **VS Human**: Want to challenge fellow humans? Well look no further!

### Analytics Dashboard

- Create an account to track your progress over time.
- View detailed statistics of your performance across our two minigames.
- Visualize your improvement with illustrative charts and graphs.

## Technical Stack

- **Frontend**: React.js, TypeScript, TailwindCSS
  - Useful packages: shadcn/ui used for many out-of-box UI components, recharts for data visualization, react-chessboard and chess.js for handling chess logic
- **Backend**: Spring Boot & Java
  - Link to backend repo: https://github.com/jsbyrd/chess-notation-trainer-api
- **Database**: PostgreSQL
- **Hosting**: AWS Amplify, AWS Elastic Beanstalk, Amazon RDS

## Getting Started

### Prerequisites

- Node.js (v22 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/chess-notation-trainer.git
   ```
2. Navigate to the project directory:
   ```
   cd chess-notation-trainer
   ```
3. Install dependencies:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```
4. Start the development server:
   ```
   npm dev
   ```
   or
   ```
   yarn dev
   ```
5. Open your browser and visit `http://localhost:5173` to see the application running.

## License

This project is licensed under the MIT License

## Contact

Like what you saw? Feel free to contact me on my LinkedIn: https://www.linkedin.com/in/joshuabyrddev/
