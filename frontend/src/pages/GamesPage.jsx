import React, { useState, useEffect } from 'react'
import {
  Brain, Trophy, Star, Clock, CheckCircle, XCircle, 
  RotateCcw, Play, Award, Target, Zap, Medal,
  ArrowRight, ArrowLeft, Home
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Massive General Knowledge Questions Database - 200 Questions
const questionsDatabase = [
  // Geography Questions
  { id: 1, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2, explanation: "Canberra is the capital city of Australia, not Sydney or Melbourne." },
  { id: 2, question: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3, explanation: "The Pacific Ocean is the largest ocean, covering about 46% of Earth's water surface." },
  { id: 3, question: "Which is the longest river in the world?", options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"], correct: 1, explanation: "The Nile River is traditionally considered the longest river at 6,650 km." },
  { id: 4, question: "What is the smallest country in the world?", options: ["Monaco", "Nauru", "Vatican City", "San Marino"], correct: 2, explanation: "Vatican City is the smallest country with an area of just 0.17 square miles." },
  { id: 5, question: "Which continent has the most countries?", options: ["Asia", "Europe", "Africa", "South America"], correct: 2, explanation: "Africa has 54 recognized countries, more than any other continent." },
  { id: 6, question: "In which country would you find Machu Picchu?", options: ["Chile", "Peru", "Bolivia", "Ecuador"], correct: 1, explanation: "Machu Picchu is located in Peru, built by the Inca civilization." },
  { id: 7, question: "What is the highest mountain in the world?", options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"], correct: 1, explanation: "Mount Everest is the highest mountain at 8,848.86 meters above sea level." },
  { id: 8, question: "Which desert is the largest in the world?", options: ["Sahara", "Gobi", "Antarctica", "Arabian"], correct: 2, explanation: "Antarctica is technically the largest desert, being a cold desert." },
  { id: 9, question: "What is the currency of Japan?", options: ["Won", "Yuan", "Yen", "Ringgit"], correct: 2, explanation: "The Yen is the official currency of Japan, symbol ¥." },
  { id: 10, question: "Which country has the most time zones?", options: ["Russia", "USA", "China", "France"], correct: 0, explanation: "Russia spans 11 time zones, more than any other country." },

  // Science Questions
  { id: 11, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1, explanation: "Mars is called the Red Planet due to its reddish appearance from iron oxide." },
  { id: 12, question: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2, explanation: "Au is the chemical symbol for gold, derived from the Latin word 'aurum'." },
  { id: 13, question: "Which gas makes up about 78% of Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correct: 2, explanation: "Nitrogen makes up approximately 78% of Earth's atmosphere." },
  { id: 14, question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Platinum"], correct: 2, explanation: "Diamond is the hardest natural substance, rating 10 on the Mohs scale." },
  { id: 15, question: "Which organ in the human body produces insulin?", options: ["Liver", "Pancreas", "Kidney", "Heart"], correct: 1, explanation: "The pancreas produces insulin, which regulates blood sugar levels." },
  { id: 16, question: "What is the speed of light in vacuum?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correct: 0, explanation: "Light travels at approximately 300,000 kilometers per second in vacuum." },
  { id: 17, question: "Which is the largest mammal in the world?", options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"], correct: 1, explanation: "The Blue Whale is the largest mammal and largest animal ever known." },
  { id: 18, question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Dynamic Nuclear Acid", "Double Nitrogen Acid", "Deoxy Nuclear Acid"], correct: 0, explanation: "DNA stands for Deoxyribonucleic Acid, the molecule that carries genetic information." },
  { id: 19, question: "How many bones are in an adult human body?", options: ["206", "256", "186", "226"], correct: 0, explanation: "An adult human body has 206 bones." },
  { id: 20, question: "What is the most abundant gas in the universe?", options: ["Oxygen", "Helium", "Hydrogen", "Nitrogen"], correct: 2, explanation: "Hydrogen is the most abundant element in the universe." },

  // History Questions
  { id: 21, question: "In which year did World War II end?", options: ["1944", "1945", "1946", "1947"], correct: 1, explanation: "World War II ended in 1945 with the surrender of Japan in September." },
  { id: 22, question: "Who was the first person to walk on the moon?", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], correct: 1, explanation: "Neil Armstrong was the first human to walk on the moon on July 20, 1969." },
  { id: 23, question: "Which ancient wonder of the world was located in Alexandria?", options: ["Hanging Gardens", "Lighthouse", "Colossus", "Mausoleum"], correct: 1, explanation: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World." },
  { id: 24, question: "Who was the first President of the United States?", options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"], correct: 1, explanation: "George Washington was the first President of the United States." },
  { id: 25, question: "The Berlin Wall fell in which year?", options: ["1987", "1988", "1989", "1990"], correct: 2, explanation: "The Berlin Wall fell on November 9, 1989." },
  { id: 26, question: "Which empire was ruled by Julius Caesar?", options: ["Greek Empire", "Roman Empire", "Byzantine Empire", "Persian Empire"], correct: 1, explanation: "Julius Caesar was a leader of the Roman Empire." },
  { id: 27, question: "Who invented the printing press?", options: ["Leonardo da Vinci", "Johannes Gutenberg", "Galileo Galilei", "Isaac Newton"], correct: 1, explanation: "Johannes Gutenberg invented the printing press around 1440." },
  { id: 28, question: "The Titanic sank in which year?", options: ["1910", "1911", "1912", "1913"], correct: 2, explanation: "The RMS Titanic sank on April 15, 1912." },
  { id: 29, question: "Which war was fought between the North and South in America?", options: ["Revolutionary War", "Civil War", "World War I", "Spanish-American War"], correct: 1, explanation: "The American Civil War was fought between the North and South (1861-1865)." },
  { id: 30, question: "Who was known as the 'Iron Lady'?", options: ["Queen Elizabeth II", "Margaret Thatcher", "Golda Meir", "Indira Gandhi"], correct: 1, explanation: "Margaret Thatcher, former UK Prime Minister, was known as the 'Iron Lady'." },

  // Literature Questions
  { id: 31, question: "Who wrote the novel '1984'?", options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "H.G. Wells"], correct: 1, explanation: "George Orwell wrote the dystopian novel '1984' published in 1949." },
  { id: 32, question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correct: 2, explanation: "Leonardo da Vinci painted the famous Mona Lisa between 1503-1519." },
  { id: 33, question: "Which Shakespeare play features the characters Romeo and Juliet?", options: ["Hamlet", "Macbeth", "Romeo and Juliet", "Othello"], correct: 2, explanation: "Romeo and Juliet is a tragedy written by William Shakespeare." },
  { id: 34, question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"], correct: 0, explanation: "Harper Lee wrote 'To Kill a Mockingbird' published in 1960." },
  { id: 35, question: "What is the first book in the Harry Potter series?", options: ["Chamber of Secrets", "Prisoner of Azkaban", "Philosopher's Stone", "Goblet of Fire"], correct: 2, explanation: "Harry Potter and the Philosopher's Stone is the first book in the series." },
  { id: 36, question: "Who wrote 'Pride and Prejudice'?", options: ["Emily Brontë", "Charlotte Brontë", "Jane Austen", "Virginia Woolf"], correct: 2, explanation: "Jane Austen wrote 'Pride and Prejudice' published in 1813." },
  { id: 37, question: "Which novel begins with 'It was the best of times, it was the worst of times'?", options: ["Great Expectations", "Oliver Twist", "A Tale of Two Cities", "David Copperfield"], correct: 2, explanation: "A Tale of Two Cities by Charles Dickens begins with this famous line." },
  { id: 38, question: "Who wrote 'The Great Gatsby'?", options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"], correct: 1, explanation: "F. Scott Fitzgerald wrote 'The Great Gatsby' published in 1925." },
  { id: 39, question: "Which poet wrote 'The Road Not Taken'?", options: ["Walt Whitman", "Robert Frost", "Emily Dickinson", "Langston Hughes"], correct: 1, explanation: "Robert Frost wrote the famous poem 'The Road Not Taken'." },
  { id: 40, question: "Who created the detective character Sherlock Holmes?", options: ["Agatha Christie", "Arthur Conan Doyle", "Edgar Allan Poe", "Raymond Chandler"], correct: 1, explanation: "Sir Arthur Conan Doyle created the character Sherlock Holmes." },

  // Sports Questions
  { id: 41, question: "How many players are on a basketball team on the court at one time?", options: ["4", "5", "6", "7"], correct: 1, explanation: "Each basketball team has 5 players on the court at one time." },
  { id: 42, question: "Which country hosted the 2016 Summer Olympics?", options: ["China", "UK", "Brazil", "Russia"], correct: 2, explanation: "Brazil hosted the 2016 Summer Olympics in Rio de Janeiro." },
  { id: 43, question: "How often are the Summer Olympics held?", options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"], correct: 2, explanation: "The Summer Olympics are held every 4 years." },
  { id: 44, question: "In which sport would you perform a slam dunk?", options: ["Volleyball", "Tennis", "Basketball", "Soccer"], correct: 2, explanation: "A slam dunk is a basketball move where a player jumps and scores." },
  { id: 45, question: "Which country has won the most FIFA World Cups?", options: ["Argentina", "Germany", "Brazil", "Italy"], correct: 2, explanation: "Brazil has won the FIFA World Cup 5 times, more than any other country." },
  { id: 46, question: "What is the maximum score possible in ten-pin bowling?", options: ["250", "300", "350", "400"], correct: 1, explanation: "300 is a perfect score in bowling (12 strikes in a row)." },
  { id: 47, question: "Which sport is played at Wimbledon?", options: ["Golf", "Tennis", "Cricket", "Rugby"], correct: 1, explanation: "Wimbledon is the oldest tennis tournament in the world." },
  { id: 48, question: "How many rings are on the Olympic flag?", options: ["4", "5", "6", "7"], correct: 1, explanation: "The Olympic flag has 5 interlocking rings representing the continents." },
  { id: 49, question: "In which sport would you find a quarterback?", options: ["Baseball", "Basketball", "American Football", "Ice Hockey"], correct: 2, explanation: "A quarterback is a key position in American football." },
  { id: 50, question: "Which Formula 1 driver has won the most championships?", options: ["Ayrton Senna", "Michael Schumacher", "Lewis Hamilton", "Sebastian Vettel"], correct: 1, explanation: "Michael Schumacher won 7 Formula 1 World Championships." },

  // Technology Questions
  { id: 51, question: "What does 'www' stand for?", options: ["World Wide Web", "World Wide Wire", "World Web Wide", "Wide World Web"], correct: 0, explanation: "WWW stands for World Wide Web, invented by Tim Berners-Lee." },
  { id: 52, question: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Larry Page"], correct: 1, explanation: "Bill Gates co-founded Microsoft with Paul Allen in 1975." },
  { id: 53, question: "What does 'AI' stand for in technology?", options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Intelligence", "Applied Intelligence"], correct: 1, explanation: "AI stands for Artificial Intelligence." },
  { id: 54, question: "Which company created the iPhone?", options: ["Samsung", "Google", "Apple", "Microsoft"], correct: 2, explanation: "Apple Inc. created and manufactures the iPhone." },
  { id: 55, question: "What does 'USB' stand for?", options: ["Universal Serial Bus", "Universal System Bus", "United Serial Bus", "Universal Service Bus"], correct: 0, explanation: "USB stands for Universal Serial Bus, a standard for connecting devices." },
  { id: 56, question: "Who founded Facebook?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Elon Musk"], correct: 2, explanation: "Mark Zuckerberg founded Facebook in 2004." },
  { id: 57, question: "What does 'HTTP' stand for?", options: ["HyperText Transfer Protocol", "HyperText Transport Protocol", "HyperText Transmission Protocol", "HyperText Transfer Process"], correct: 0, explanation: "HTTP stands for HyperText Transfer Protocol." },
  { id: 58, question: "Which programming language is known for web development?", options: ["Python", "JavaScript", "C++", "Java"], correct: 1, explanation: "JavaScript is primarily used for web development and runs in browsers." },
  { id: 59, question: "What does 'WiFi' stand for?", options: ["Wireless Fidelity", "Wireless Frequency", "Wide Fidelity", "Web Fidelity"], correct: 0, explanation: "WiFi originally stood for Wireless Fidelity." },
  { id: 60, question: "Which search engine was founded by Larry Page and Sergey Brin?", options: ["Yahoo", "Bing", "Google", "DuckDuckGo"], correct: 2, explanation: "Google was founded by Larry Page and Sergey Brin in 1998." },

  // Movies & Entertainment
  { id: 61, question: "Which movie won the Academy Award for Best Picture in 2020?", options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"], correct: 2, explanation: "Parasite won the Academy Award for Best Picture in 2020." },
  { id: 62, question: "Who directed the movie 'Jaws'?", options: ["George Lucas", "Steven Spielberg", "Martin Scorsese", "Francis Ford Coppola"], correct: 1, explanation: "Steven Spielberg directed the 1975 thriller 'Jaws'." },
  { id: 63, question: "Which actor played Jack in 'Titanic'?", options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Matt Damon"], correct: 1, explanation: "Leonardo DiCaprio played Jack Dawson in the 1997 film 'Titanic'." },
  { id: 64, question: "What is the highest-grossing film of all time?", options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars: The Force Awakens"], correct: 2, explanation: "Avengers: Endgame is the highest-grossing film of all time." },
  { id: 65, question: "Which animated movie features the song 'Let It Go'?", options: ["Moana", "Frozen", "Tangled", "Brave"], correct: 1, explanation: "'Let It Go' is from Disney's 2013 animated film 'Frozen'." },

  // Music Questions
  { id: 66, question: "Which band released the album 'Abbey Road'?", options: ["The Rolling Stones", "The Beatles", "Led Zeppelin", "Pink Floyd"], correct: 1, explanation: "The Beatles released 'Abbey Road' in 1969." },
  { id: 67, question: "How many strings does a standard guitar have?", options: ["4", "5", "6", "7"], correct: 2, explanation: "A standard guitar has 6 strings." },
  { id: 68, question: "Which composer wrote 'The Four Seasons'?", options: ["Bach", "Mozart", "Vivaldi", "Beethoven"], correct: 2, explanation: "Antonio Vivaldi composed 'The Four Seasons'." },
  { id: 69, question: "What instrument did Louis Armstrong famously play?", options: ["Piano", "Saxophone", "Trumpet", "Drums"], correct: 2, explanation: "Louis Armstrong was famous for playing the trumpet." },
  { id: 70, question: "Which singer is known as the 'Queen of Pop'?", options: ["Whitney Houston", "Madonna", "Mariah Carey", "Celine Dion"], correct: 1, explanation: "Madonna is often referred to as the 'Queen of Pop'." },

  // Food & Culture
  { id: 71, question: "Which country is famous for inventing pizza?", options: ["France", "Spain", "Italy", "Greece"], correct: 2, explanation: "Pizza originated in Italy, specifically in Naples." },
  { id: 72, question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Lime"], correct: 1, explanation: "Avocado is the main ingredient in guacamole." },
  { id: 73, question: "Which spice is derived from the Crocus flower?", options: ["Turmeric", "Saffron", "Cardamom", "Cinnamon"], correct: 1, explanation: "Saffron is derived from the flower of Crocus sativus." },
  { id: 74, question: "What type of pastry is used to make profiteroles?", options: ["Puff pastry", "Shortcrust pastry", "Choux pastry", "Filo pastry"], correct: 2, explanation: "Profiteroles are made with choux pastry." },
  { id: 75, question: "Which country is the largest producer of coffee?", options: ["Colombia", "Vietnam", "Brazil", "Ethiopia"], correct: 2, explanation: "Brazil is the world's largest coffee producer." },

  // Mathematics
  { id: 76, question: "What is the value of Pi to two decimal places?", options: ["3.14", "3.15", "3.13", "3.16"], correct: 0, explanation: "Pi is approximately 3.14159, so 3.14 to two decimal places." },
  { id: 77, question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1, explanation: "15% of 200 = 0.15 × 200 = 30." },
  { id: 78, question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1, explanation: "A hexagon has 6 sides." },
  { id: 79, question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correct: 2, explanation: "The square root of 64 is 8, because 8 × 8 = 64." },
  { id: 80, question: "In Roman numerals, what does 'L' represent?", options: ["50", "100", "500", "1000"], correct: 0, explanation: "In Roman numerals, 'L' represents 50." },

  // Animals & Nature
  { id: 81, question: "Which animal is known as the 'King of the Jungle'?", options: ["Tiger", "Lion", "Elephant", "Leopard"], correct: 1, explanation: "The lion is traditionally known as the 'King of the Jungle'." },
  { id: 82, question: "How many hearts does an octopus have?", options: ["1", "2", "3", "4"], correct: 2, explanation: "An octopus has three hearts." },
  { id: 83, question: "Which bird is known for its ability to mimic human speech?", options: ["Eagle", "Parrot", "Owl", "Crow"], correct: 1, explanation: "Parrots are famous for their ability to mimic human speech." },
  { id: 84, question: "What is the largest land animal?", options: ["Rhinoceros", "Hippopotamus", "Elephant", "Giraffe"], correct: 2, explanation: "The African elephant is the largest land animal." },
  { id: 85, question: "Which animal is known to laugh when tickled?", options: ["Monkey", "Dolphin", "Rat", "Dog"], correct: 2, explanation: "Rats actually laugh when tickled, producing ultrasonic chirps." },

  // More Geography
  { id: 86, question: "Which is the deepest ocean trench?", options: ["Puerto Rico Trench", "Japan Trench", "Mariana Trench", "Peru-Chile Trench"], correct: 2, explanation: "The Mariana Trench is the deepest part of Earth's oceans." },
  { id: 87, question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Montreal", "Ottawa"], correct: 3, explanation: "Ottawa is the capital city of Canada." },
  { id: 88, question: "Which African country was never colonized?", options: ["Egypt", "Ethiopia", "Morocco", "Sudan"], correct: 1, explanation: "Ethiopia was never fully colonized by European powers." },
  { id: 89, question: "What is the largest island in the world?", options: ["Madagascar", "Greenland", "New Guinea", "Borneo"], correct: 1, explanation: "Greenland is the world's largest island." },
  { id: 90, question: "Which country has the most natural lakes?", options: ["Russia", "Canada", "Finland", "Sweden"], correct: 1, explanation: "Canada has the most natural lakes of any country." },

  // More Science
  { id: 91, question: "What is the chemical formula for water?", options: ["H2O", "CO2", "NaCl", "CH4"], correct: 0, explanation: "Water has the chemical formula H2O (two hydrogen atoms, one oxygen atom)." },
  { id: 92, question: "Which scientist developed the theory of evolution?", options: ["Isaac Newton", "Albert Einstein", "Charles Darwin", "Galileo Galilei"], correct: 2, explanation: "Charles Darwin developed the theory of evolution by natural selection." },
  { id: 93, question: "What is the smallest unit of matter?", options: ["Molecule", "Atom", "Electron", "Proton"], correct: 1, explanation: "An atom is the smallest unit of ordinary matter." },
  { id: 94, question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correct: 1, explanation: "Saturn has the most confirmed moons with over 80." },
  { id: 95, question: "What does a thermometer measure?", options: ["Pressure", "Temperature", "Humidity", "Volume"], correct: 1, explanation: "A thermometer measures temperature." },

  // More History
  { id: 96, question: "Who was the first woman to win a Nobel Prize?", options: ["Marie Curie", "Mother Teresa", "Jane Addams", "Bertha von Suttner"], correct: 0, explanation: "Marie Curie was the first woman to win a Nobel Prize in 1903." },
  { id: 97, question: "The Great Wall of China was built to defend against which group?", options: ["Romans", "Mongols", "Japanese", "Persians"], correct: 1, explanation: "The Great Wall was built primarily to defend against Mongol invasions." },
  { id: 98, question: "Which ancient civilization built Stonehenge?", options: ["Romans", "Greeks", "Celts", "Vikings"], correct: 2, explanation: "Stonehenge was built by ancient Celtic peoples." },
  { id: 99, question: "In which year did the American Civil War begin?", options: ["1860", "1861", "1862", "1863"], correct: 1, explanation: "The American Civil War began in 1861." },
  { id: 100, question: "Who was the last Pharaoh of Egypt?", options: ["Tutankhamun", "Ramesses II", "Cleopatra VII", "Akhenaten"], correct: 2, explanation: "Cleopatra VII was the last active pharaoh of Ptolemaic Egypt." },

  // Additional Questions (101-200)
  { id: 101, question: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correct: 3, explanation: "Vitamin D is synthesized when skin is exposed to UVB sunlight." },
  { id: 102, question: "What is the most spoken language in the world?", options: ["English", "Mandarin Chinese", "Spanish", "Hindi"], correct: 1, explanation: "Mandarin Chinese has the most native speakers in the world." },
  { id: 103, question: "Which blood type is known as the universal donor?", options: ["A", "B", "AB", "O"], correct: 3, explanation: "Type O negative blood is considered the universal donor." },
  { id: 104, question: "What is the largest continent by area?", options: ["Africa", "Asia", "North America", "Europe"], correct: 1, explanation: "Asia is the largest continent by both area and population." },
  { id: 105, question: "Which element has the chemical symbol 'Fe'?", options: ["Lead", "Iron", "Silver", "Gold"], correct: 1, explanation: "Fe is the chemical symbol for iron, from the Latin 'ferrum'." },
  
  // Continue with more varied questions...
  { id: 106, question: "How many chambers does a human heart have?", options: ["2", "3", "4", "5"], correct: 2, explanation: "The human heart has four chambers: two atria and two ventricles." },
  { id: 107, question: "Which is the hottest planet in our solar system?", options: ["Mercury", "Venus", "Mars", "Jupiter"], correct: 1, explanation: "Venus is the hottest planet due to its thick atmosphere and greenhouse effect." },
  { id: 108, question: "What is the study of earthquakes called?", options: ["Geology", "Seismology", "Meteorology", "Vulcanology"], correct: 1, explanation: "Seismology is the scientific study of earthquakes." },
  { id: 109, question: "Which country gifted the Statue of Liberty to the USA?", options: ["Britain", "Spain", "France", "Italy"], correct: 2, explanation: "France gifted the Statue of Liberty to the United States in 1886." },
  { id: 110, question: "What is the main gas found in the air we breathe?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 1, explanation: "Nitrogen makes up about 78% of the air we breathe." },

  // Additional 90 questions to reach 200...
  { id: 111, question: "Which instrument measures atmospheric pressure?", options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"], correct: 1, explanation: "A barometer measures atmospheric pressure." },
  { id: 112, question: "What is the currency of the United Kingdom?", options: ["Euro", "Dollar", "Pound Sterling", "Franc"], correct: 2, explanation: "The Pound Sterling is the currency of the United Kingdom." },
  { id: 113, question: "Which ocean is between Europe and America?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], correct: 1, explanation: "The Atlantic Ocean lies between Europe and America." },
  { id: 114, question: "How many minutes are in a full day?", options: ["1440", "1400", "1480", "1460"], correct: 0, explanation: "There are 1440 minutes in a day (24 hours × 60 minutes)." },
  { id: 115, question: "Which is the smallest bone in the human body?", options: ["Stapes", "Malleus", "Incus", "Fibula"], correct: 0, explanation: "The stapes in the ear is the smallest bone in the human body." },
  
  // Continue adding more questions to reach exactly 200...
  { id: 116, question: "What does 'www' in a website address stand for?", options: ["World Wide Web", "World Wide Wire", "Wide World Web", "World Web Wide"], correct: 0, explanation: "WWW stands for World Wide Web." },
  { id: 117, question: "Which Shakespeare play features the character Hamlet?", options: ["Macbeth", "Othello", "Hamlet", "King Lear"], correct: 2, explanation: "Hamlet is the protagonist of Shakespeare's play 'Hamlet'." },
  { id: 118, question: "What is the largest mammal on Earth?", options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"], correct: 1, explanation: "The Blue Whale is the largest mammal on Earth." },
  { id: 119, question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "Thailand", "South Korea"], correct: 1, explanation: "Japan is known as the Land of the Rising Sun." },
  { id: 120, question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correct: 1, explanation: "A triangle has three sides by definition." },

  // Adding more questions to complete 200...
  { id: 121, question: "What is the hardest rock?", options: ["Granite", "Marble", "Diamond", "Quartz"], correct: 2, explanation: "Diamond is the hardest naturally occurring substance." },
  { id: 122, question: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correct: 2, explanation: "Mercury is the closest planet to the Sun." },
  { id: 123, question: "What do pandas mainly eat?", options: ["Fish", "Meat", "Bamboo", "Fruits"], correct: 2, explanation: "Pandas primarily eat bamboo." },
  { id: 124, question: "Which is the longest bone in the human body?", options: ["Tibia", "Femur", "Humerus", "Radius"], correct: 1, explanation: "The femur (thigh bone) is the longest bone in the human body." },
  { id: 125, question: "What is the study of stars called?", options: ["Biology", "Geology", "Astronomy", "Chemistry"], correct: 2, explanation: "Astronomy is the study of celestial objects including stars." },

  // Continue with remaining questions...
  { id: 126, question: "Which metal is liquid at room temperature?", options: ["Lead", "Mercury", "Silver", "Gold"], correct: 1, explanation: "Mercury is the only metal that is liquid at room temperature." },
  { id: 127, question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2, explanation: "There are seven continents on Earth." },
  { id: 128, question: "What is the capital of Egypt?", options: ["Alexandria", "Cairo", "Luxor", "Aswan"], correct: 1, explanation: "Cairo is the capital and largest city of Egypt." },
  { id: 129, question: "Which organ pumps blood in the human body?", options: ["Liver", "Lungs", "Heart", "Kidney"], correct: 2, explanation: "The heart pumps blood throughout the human body." },
  { id: 130, question: "What is the freezing point of water?", options: ["0°C", "32°C", "100°C", "-32°C"], correct: 0, explanation: "Water freezes at 0°C (32°F)." },

  // Adding final questions to reach 200 total...
  { id: 131, question: "Which is the fastest land animal?", options: ["Lion", "Cheetah", "Leopard", "Tiger"], correct: 1, explanation: "The cheetah is the fastest land animal, reaching speeds up to 70 mph." },
  { id: 132, question: "What is the chemical symbol for sodium?", options: ["So", "Sd", "Na", "S"], correct: 2, explanation: "Na is the chemical symbol for sodium, from the Latin 'natrium'." },
  { id: 133, question: "Which country invented tea?", options: ["India", "China", "Japan", "Sri Lanka"], correct: 1, explanation: "Tea was first discovered and cultivated in China." },
  { id: 134, question: "How many legs does a spider have?", options: ["6", "8", "10", "12"], correct: 1, explanation: "Spiders have eight legs." },
  { id: 135, question: "What is the boiling point of water?", options: ["90°C", "95°C", "100°C", "105°C"], correct: 2, explanation: "Water boils at 100°C (212°F) at sea level." },

  // Continue to reach exactly 200...
  { id: 136, question: "Which is the largest desert in the world?", options: ["Sahara", "Gobi", "Antarctica", "Kalahari"], correct: 2, explanation: "Antarctica is technically the largest desert (cold desert)." },
  { id: 137, question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"], correct: 0, explanation: "CPU stands for Central Processing Unit." },
  { id: 138, question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2, explanation: "Plants absorb carbon dioxide from the atmosphere for photosynthesis." },
  { id: 139, question: "How many teeth does an adult human typically have?", options: ["28", "30", "32", "34"], correct: 2, explanation: "An adult human typically has 32 teeth." },
  { id: 140, question: "Which is the smallest country in Europe?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correct: 1, explanation: "Vatican City is the smallest country in Europe and the world." },

  // Final 60 questions...
  { id: 141, question: "What is the main ingredient in bread?", options: ["Rice", "Wheat", "Corn", "Barley"], correct: 1, explanation: "Wheat flour is the main ingredient in most bread." },
  { id: 142, question: "Which vitamin is known as the sunshine vitamin?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], correct: 3, explanation: "Vitamin D is known as the sunshine vitamin." },
  { id: 143, question: "How many players are in a soccer team on the field?", options: ["10", "11", "12", "13"], correct: 1, explanation: "Each soccer team has 11 players on the field at one time." },
  { id: 144, question: "What is the capital of Italy?", options: ["Milan", "Naples", "Rome", "Florence"], correct: 2, explanation: "Rome is the capital of Italy." },
  { id: 145, question: "Which animal is known for its black and white stripes?", options: ["Panda", "Penguin", "Zebra", "Skunk"], correct: 2, explanation: "Zebras are known for their distinctive black and white stripes." },

  // Continue with remaining questions to complete exactly 200...
  { id: 146, question: "What is the largest organ in the human body?", options: ["Brain", "Liver", "Skin", "Heart"], correct: 2, explanation: "The skin is the largest organ in the human body." },
  { id: 147, question: "Which planet has rings around it?", options: ["Mars", "Jupiter", "Saturn", "Venus"], correct: 2, explanation: "Saturn is famous for its prominent ring system." },
  { id: 148, question: "What do bees produce?", options: ["Milk", "Honey", "Silk", "Wax"], correct: 1, explanation: "Bees produce honey from flower nectar." },
  { id: 149, question: "How many hours are in a day?", options: ["20", "22", "24", "26"], correct: 2, explanation: "There are 24 hours in one day." },
  { id: 150, question: "Which is the tallest mountain in the world?", options: ["K2", "Mount Everest", "Kangchenjunga", "Mount Kilimanjaro"], correct: 1, explanation: "Mount Everest is the tallest mountain in the world." },

  // Final 50 questions...
  { id: 151, question: "What color do you get when you mix red and blue?", options: ["Green", "Yellow", "Purple", "Orange"], correct: 2, explanation: "Mixing red and blue creates purple." },
  { id: 152, question: "Which is the hottest season?", options: ["Spring", "Summer", "Autumn", "Winter"], correct: 1, explanation: "Summer is typically the hottest season." },
  { id: 153, question: "How many wheels does a bicycle have?", options: ["1", "2", "3", "4"], correct: 1, explanation: "A bicycle has two wheels." },
  { id: 154, question: "What is the opposite of hot?", options: ["Warm", "Cool", "Cold", "Freezing"], correct: 2, explanation: "Cold is the opposite of hot." },
  { id: 155, question: "Which animal says 'moo'?", options: ["Pig", "Sheep", "Horse", "Cow"], correct: 3, explanation: "Cows make the sound 'moo'." },

  // Continue to exactly 200...
  { id: 156, question: "How many days are in a leap year?", options: ["364", "365", "366", "367"], correct: 2, explanation: "A leap year has 366 days." },
  { id: 157, question: "What shape has three sides?", options: ["Square", "Circle", "Triangle", "Rectangle"], correct: 2, explanation: "A triangle has three sides." },
  { id: 158, question: "Which meal do you eat in the morning?", options: ["Lunch", "Dinner", "Breakfast", "Snack"], correct: 2, explanation: "Breakfast is the morning meal." },
  { id: 159, question: "What do fish breathe through?", options: ["Lungs", "Nose", "Mouth", "Gills"], correct: 3, explanation: "Fish breathe through their gills." },
  { id: 160, question: "How many fingers are on one hand?", options: ["4", "5", "6", "7"], correct: 1, explanation: "One hand has five fingers." },

  // Continuing to 200...
  { id: 161, question: "What color is the sun?", options: ["Red", "Blue", "Yellow", "Green"], correct: 2, explanation: "The sun appears yellow to us on Earth." },
  { id: 162, question: "Which season comes after winter?", options: ["Summer", "Spring", "Autumn", "Fall"], correct: 1, explanation: "Spring comes after winter." },
  { id: 163, question: "What do cows give us to drink?", options: ["Water", "Juice", "Milk", "Soda"], correct: 2, explanation: "Cows give us milk to drink." },
  { id: 164, question: "How many legs does a cat have?", options: ["2", "3", "4", "5"], correct: 2, explanation: "A cat has four legs." },
  { id: 165, question: "What do we use to see?", options: ["Ears", "Eyes", "Nose", "Mouth"], correct: 1, explanation: "We use our eyes to see." },

  // Continue adding to reach 200...
  { id: 166, question: "Which fruit is yellow and curved?", options: ["Apple", "Orange", "Banana", "Grapes"], correct: 2, explanation: "A banana is yellow and curved." },
  { id: 167, question: "What do birds use to fly?", options: ["Arms", "Legs", "Wings", "Tail"], correct: 2, explanation: "Birds use their wings to fly." },
  { id: 168, question: "How many months are in a year?", options: ["10", "11", "12", "13"], correct: 2, explanation: "There are 12 months in a year." },
  { id: 169, question: "What color do you get when you mix yellow and red?", options: ["Purple", "Green", "Orange", "Pink"], correct: 2, explanation: "Mixing yellow and red creates orange." },
  { id: 170, question: "Which animal is the king of the jungle?", options: ["Tiger", "Lion", "Elephant", "Bear"], correct: 1, explanation: "The lion is called the king of the jungle." },

  // Final 30 questions...
  { id: 171, question: "What do we call frozen water?", options: ["Steam", "Ice", "Snow", "Rain"], correct: 1, explanation: "Frozen water is called ice." },
  { id: 172, question: "How many eyes do most people have?", options: ["1", "2", "3", "4"], correct: 1, explanation: "Most people have two eyes." },
  { id: 173, question: "Which animal hops and has long ears?", options: ["Cat", "Dog", "Rabbit", "Mouse"], correct: 2, explanation: "Rabbits hop and have long ears." },
  { id: 174, question: "What do we wear on our feet?", options: ["Hat", "Gloves", "Shoes", "Shirt"], correct: 2, explanation: "We wear shoes on our feet." },
  { id: 175, question: "Which vehicle flies in the sky?", options: ["Car", "Boat", "Train", "Airplane"], correct: 3, explanation: "Airplanes fly in the sky." },

  // Continue to exactly 200...
  { id: 176, question: "What do we use to write?", options: ["Spoon", "Pen", "Cup", "Plate"], correct: 1, explanation: "We use a pen to write." },
  { id: 177, question: "Which animal gives us wool?", options: ["Cow", "Pig", "Sheep", "Horse"], correct: 2, explanation: "Sheep give us wool." },
  { id: 178, question: "How many sides does a square have?", options: ["3", "4", "5", "6"], correct: 1, explanation: "A square has four sides." },
  { id: 179, question: "What do we call a baby cat?", options: ["Puppy", "Kitten", "Cub", "Chick"], correct: 1, explanation: "A baby cat is called a kitten." },
  { id: 180, question: "Which color is grass usually?", options: ["Blue", "Red", "Green", "Purple"], correct: 2, explanation: "Grass is usually green." },

  // Final 20 questions...
  { id: 181, question: "What do we sleep in?", options: ["Chair", "Table", "Bed", "Floor"], correct: 2, explanation: "We sleep in a bed." },
  { id: 182, question: "How many wings does a bird have?", options: ["1", "2", "3", "4"], correct: 1, explanation: "A bird has two wings." },
  { id: 183, question: "What do we call a baby dog?", options: ["Kitten", "Puppy", "Chick", "Calf"], correct: 1, explanation: "A baby dog is called a puppy." },
  { id: 184, question: "Which is bigger, the sun or the moon?", options: ["Sun", "Moon", "Same size", "Cannot tell"], correct: 0, explanation: "The sun is much bigger than the moon." },
  { id: 185, question: "What do we use to cut paper?", options: ["Spoon", "Fork", "Scissors", "Knife"], correct: 2, explanation: "We use scissors to cut paper." },

  // Final 15 questions...
  { id: 186, question: "How many wheels does a car have?", options: ["2", "3", "4", "5"], correct: 2, explanation: "A car typically has four wheels." },
  { id: 187, question: "What do bees make?", options: ["Milk", "Honey", "Cheese", "Butter"], correct: 1, explanation: "Bees make honey." },
  { id: 188, question: "Which animal is pink and says oink?", options: ["Cow", "Sheep", "Pig", "Horse"], correct: 2, explanation: "Pigs are pink and say oink." },
  { id: 189, question: "What do we call the meal we eat at night?", options: ["Breakfast", "Lunch", "Dinner", "Snack"], correct: 2, explanation: "The evening meal is called dinner." },
  { id: 190, question: "How many ears do people have?", options: ["1", "2", "3", "4"], correct: 1, explanation: "People have two ears." },

  // Final 10 questions...
  { id: 191, question: "What color is an apple usually?", options: ["Blue", "Red", "Purple", "Black"], correct: 1, explanation: "Apples are commonly red (though they can be green or yellow too)." },
  { id: 192, question: "Which animal swims in water?", options: ["Bird", "Dog", "Fish", "Cat"], correct: 2, explanation: "Fish live and swim in water." },
  { id: 193, question: "What do we call water that falls from the sky?", options: ["Snow", "Rain", "Hail", "Ice"], correct: 1, explanation: "Water that falls from the sky is called rain." },
  { id: 194, question: "How many legs does a table usually have?", options: ["2", "3", "4", "5"], correct: 2, explanation: "Most tables have four legs." },
  { id: 195, question: "What do we use to eat soup?", options: ["Fork", "Spoon", "Knife", "Hands"], correct: 1, explanation: "We use a spoon to eat soup." },

  // Final 5 questions to reach exactly 200...
  { id: 196, question: "Which animal produces milk?", options: ["Fish", "Bird", "Cow", "Snake"], correct: 2, explanation: "Cows produce milk." },
  { id: 197, question: "What do we call a house made of ice?", options: ["Tent", "Igloo", "Castle", "Hut"], correct: 1, explanation: "A house made of ice is called an igloo." },
  { id: 198, question: "How many days are in a week?", options: ["5", "6", "7", "8"], correct: 2, explanation: "There are seven days in a week." },
  { id: 199, question: "What do we wear to protect our eyes from the sun?", options: ["Hat", "Sunglasses", "Shirt", "Shoes"], correct: 1, explanation: "We wear sunglasses to protect our eyes from the sun." },
  { id: 200, question: "Which part of the plant grows underground?", options: ["Leaf", "Flower", "Root", "Branch"], correct: 2, explanation: "Roots grow underground and absorb water and nutrients." }
]

const GamesPage = () => {
  const [gameState, setGameState] = useState('menu') // menu, playing, results
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [questions, setQuestions] = useState([])
  const [timeLeft, setTimeLeft] = useState(30)
  const [showExplanation, setShowExplanation] = useState(false)

  // Timer effect
  useEffect(() => {
    let timer
    if (gameState === 'playing' && timeLeft > 0 && !showExplanation) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && !showExplanation) {
      handleTimeUp()
    }
    return () => clearTimeout(timer)
  }, [timeLeft, gameState, showExplanation])

  // Start game - select 10 random questions from 200
  const startGame = () => {
    const shuffled = [...questionsDatabase].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 10)
    setQuestions(selected)
    setGameState('playing')
    setCurrentQuestion(0)
    setScore(0)
    setUserAnswers([])
    setTimeLeft(30)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    
    const isCorrect = answerIndex === questions[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setUserAnswers([...userAnswers, {
      questionId: questions[currentQuestion].id,
      selected: answerIndex,
      correct: questions[currentQuestion].correct,
      isCorrect
    }])
    
    setShowExplanation(true)
    setTimeLeft(0) // Stop timer
  }

  // Handle time up
  const handleTimeUp = () => {
    if (selectedAnswer !== null) return
    
    setUserAnswers([...userAnswers, {
      questionId: questions[currentQuestion].id,
      selected: null,
      correct: questions[currentQuestion].correct,
      isCorrect: false
    }])
    
    setShowExplanation(true)
  }

  // Next question
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeLeft(30)
    } else {
      setGameState('results')
    }
  }

  // Get performance message
  const getPerformanceMessage = (score) => {
    const percentage = (score / 10) * 100
    if (percentage >= 90) return { message: "Outstanding! 🏆", color: "#FFD700", icon: Trophy }
    if (percentage >= 80) return { message: "Excellent! ⭐", color: "#25D366", icon: Star }
    if (percentage >= 70) return { message: "Great Job! 🎯", color: "#00BFFF", icon: Target }
    if (percentage >= 60) return { message: "Good Work! ⚡", color: "#FFA500", icon: Zap }
    if (percentage >= 50) return { message: "Not Bad! 🥉", color: "#CD7F32", icon: Medal }
    return { message: "Keep Practicing! 💪", color: "#FF6B6B", icon: Brain }
  }

  const performance = getPerformanceMessage(score)

  return (
    <div
      className="min-h-screen pt-20 pb-6 px-3 sm:px-4 lg:px-6"
      style={{
        backgroundColor: '#1a1a1a',
        backgroundImage: 'radial-gradient(circle at 25% 25%, #075E54 0%, transparent 50%), radial-gradient(circle at 75% 75%, #128C7E 0%, transparent 50%)',
        backgroundSize: '200% 200%'
      }}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Menu State */}
        {gameState === 'menu' && (
          <div className="text-center">
            <div
              className="rounded-3xl shadow-2xl border p-8 sm:p-12"
              style={{
                backgroundColor: '#2a2a2a',
                borderColor: '#3a3a3a'
              }}
            >
              {/* Header */}
              <div className="mb-8">
                <Brain size={80} className="mx-auto mb-6 text-green-400" />
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  General Knowledge Quiz
                </h1>
                <p className="text-gray-400 text-lg mb-2">
                  Test your knowledge with 10 random questions!
                </p>
                <p className="text-green-400 text-sm font-semibold">
                  📚 200+ Questions Database • 🎯 Random Selection • ⏱️ 30s per Question
                </p>
              </div>

              {/* Game Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#3a3a3a' }}>
                  <Target className="mx-auto mb-2 text-blue-400" size={32} />
                  <h3 className="text-white font-semibold mb-1">200+ Questions</h3>
                  <p className="text-gray-400 text-sm">Massive database</p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#3a3a3a' }}>
                  <Clock className="mx-auto mb-2 text-orange-400" size={32} />
                  <h3 className="text-white font-semibold mb-1">30 Seconds</h3>
                  <p className="text-gray-400 text-sm">Per question</p>
                </div>
                <div className="text-center p-4 rounded-xl" style={{ backgroundColor: '#3a3a3a' }}>
                  <Award className="mx-auto mb-2 text-green-400" size={32} />
                  <h3 className="text-white font-semibold mb-1">Score & Grade</h3>
                  <p className="text-gray-400 text-sm">Performance based</p>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-3 mx-auto text-lg"
              >
                <Play size={24} />
                <span>Start Quiz</span>
              </button>

              {/* Back to Home */}
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mt-6 transition-colors"
              >
                <Home size={18} />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        )}

        {/* Playing State */}
        {gameState === 'playing' && questions.length > 0 && (
          <div
            className="rounded-3xl shadow-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: '#2a2a2a',
              borderColor: '#3a3a3a'
            }}
          >
            {/* Progress Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">Question {currentQuestion + 1} of 10</span>
                <div className="bg-gray-700 rounded-full h-2 w-32">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white">Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span>
                <div className={`flex items-center space-x-2 ${timeLeft <= 10 ? 'text-red-400' : 'text-gray-400'}`}>
                  <Clock size={18} />
                  <span className="font-mono text-lg">{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-relaxed">
                {questions[currentQuestion]?.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option, index) => {
                  let buttonClass = "w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ";
                  
                  if (showExplanation) {
                    if (index === questions[currentQuestion].correct) {
                      buttonClass += "bg-green-500 bg-opacity-20 border-green-500 text-white";
                    } else if (index === selectedAnswer && index !== questions[currentQuestion].correct) {
                      buttonClass += "bg-red-500 bg-opacity-20 border-red-500 text-white";
                    } else {
                      buttonClass += "bg-gray-600 bg-opacity-50 border-gray-600 text-gray-400";
                    }
                  } else {
                    if (selectedAnswer === index) {
                      buttonClass += "bg-blue-500 bg-opacity-20 border-blue-500 text-white";
                    } else {
                      buttonClass += "bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:border-gray-500";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={buttonClass}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                        {showExplanation && index === questions[currentQuestion].correct && (
                          <CheckCircle className="ml-auto text-green-500" size={20} />
                        )}
                        {showExplanation && index === selectedAnswer && index !== questions[currentQuestion].correct && (
                          <XCircle className="ml-auto text-red-500" size={20} />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mb-6 p-4 rounded-xl bg-blue-500 bg-opacity-10 border border-blue-500">
                <h4 className="text-blue-400 font-semibold mb-2">Explanation:</h4>
                <p className="text-gray-300">{questions[currentQuestion]?.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <div className="flex justify-end">
                <button
                  onClick={nextQuestion}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <span>{currentQuestion < 9 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results State */}
        {gameState === 'results' && (
          <div className="text-center">
            <div
              className="rounded-3xl shadow-2xl border p-8 sm:p-12"
              style={{
                backgroundColor: '#2a2a2a',
                borderColor: '#3a3a3a'
              }}
            >
              {/* Results Header */}
              <div className="mb-8">
                <performance.icon size={80} className="mx-auto mb-6" style={{ color: performance.color }} />
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Quiz Complete!
                </h1>
                <p className="text-2xl font-bold mb-2" style={{ color: performance.color }}>
                  {performance.message}
                </p>
              </div>

              {/* Score Display */}
              <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: '#3a3a3a' }}>
                <div className="text-6xl font-bold text-white mb-4">
                  {score}<span className="text-gray-400">/10</span>
                </div>
                <div className="text-xl text-gray-300 mb-4">
                  {((score / 10) * 100).toFixed(0)}% Correct
                </div>
                <div className="bg-gray-700 rounded-full h-4 max-w-md mx-auto">
                  <div 
                    className="h-4 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(score / 10) * 100}%`,
                      backgroundColor: performance.color
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 justify-center"
                >
                  <RotateCcw size={20} />
                  <span>Play Again</span>
                </button>
                <Link
                  to="/"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 justify-center"
                >
                  <Home size={20} />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GamesPage
