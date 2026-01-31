Hidden Markov Model – Forward Algorithm

Project Overview:
This project implements a web-based solution for the Hidden Markov Model (HMM) Likelihood Problem using the Forward Algorithm. The system computes the probability of an observation sequence given the HMM parameters.

Additionally, this project now includes an AI-powered Keyword Extraction Agent that uses Google Gemini API to extract important keywords from text paragraphs.

Objective:
To compute the likelihood P(O | λ) efficiently using dynamic programming, where O is the observation sequence and λ = (A, B, π) represents the HMM.

Concepts Used:
Hidden Markov Models
Forward Algorithm
Dynamic Programming
Natural Language Processing (Keyword Extraction)
Google Gemini API Integration

Algorithm Summary:
Initialization: α1(i) = πi × Bi(o1)
Induction: αt(j) = Σ[αt−1(i) × Aij] × Bj(ot)
Termination: P(O | λ) = Σ αT(i)

Features:
User input for hidden states, observations, and probabilities. Computes likelihood using the Forward Algorithm. Clean and responsive web interface. AI-powered keyword extraction from text using Google Gemini API.

Project Structure:
index.html – User interface
styles.css – Styling
index.js – Algorithm logic and keyword extraction functionality

How to Run:
Open index.html in a browser, enter HMM parameters and observation sequence, and click "Compute Likelihood".

Keyword Extraction Feature:
1. Obtain a Google Gemini API key from https://makersuite.google.com/app/apikey
2. Enter and save your API key in the "Keyword Extraction Agent" section
3. Paste or type your text paragraph in the input area
4. Click "Extract Keywords" to get AI-generated keywords
5. Keywords will be displayed as styled tags below the input

Note: The API key is stored only in your browser's session storage and is never sent to any server except Google's Gemini API.

Complexity:
Time: O(N² × T)
Space: O(N × T)

Author:
Atharv G Muttur
B.Tech – Computer Science

Conclusion:
This project demonstrates efficient computation of HMM likelihood using the Forward Algorithm and provides a foundation for advanced HMM techniques. The addition of the keyword extraction agent showcases the integration of modern AI capabilities for natural language processing tasks.
