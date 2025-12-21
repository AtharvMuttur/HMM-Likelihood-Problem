Hidden Markov Model – Forward Algorithm

Project Overview:
This project implements a web-based solution for the Hidden Markov Model (HMM) Likelihood Problem using the Forward Algorithm. The system computes the probability of an observation sequence given the HMM parameters.

Objective:
To compute the likelihood P(O | λ) efficiently using dynamic programming, where O is the observation sequence and λ = (A, B, π) represents the HMM.

Concepts Used:
Hidden Markov Models
Forward Algorithm
Dynamic Programming

Algorithm Summary:
Initialization: α1(i) = πi × Bi(o1)
Induction: αt(j) = Σ[αt−1(i) × Aij] × Bj(ot)
Termination: P(O | λ) = Σ αT(i)

Features:
User input for hidden states, observations, and probabilities. Computes likelihood using the Forward Algorithm. Clean and responsive web interface.

Project Structure:
index.html – User interface
styles.css – Styling
index.js – Algorithm logic

How to Run:
Open index.html in a browser, enter HMM parameters and observation sequence, and click “Compute Likelihood”.

Complexity:
Time: O(N² × T)
Space: O(N × T)

Author:
Atharv G Muttur
B.Tech – Computer Science

Conclusion:
This project demonstrates efficient computation of HMM likelihood using the Forward Algorithm and provides a foundation for advanced HMM techniques.