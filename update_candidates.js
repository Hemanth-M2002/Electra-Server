const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../client/src/data/tnConstituencies.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Prominent Tamil Nadu politicians for realistic 2026 data
const dmkLeaders = ["Durai Murugan", "K. N. Nehru", "I. Periyasamy", "K. Ponmudy", "E. V. Velu", "M. R. K. Panneerselvam", "K. K. S. S. R. Ramachandran", "Thangam Thennarasu", "S. Regupathy", "Anbil Mahesh Poyyamozhi", "P. K. Sekar Babu", "T. R. B. Rajaa"];
const admkLeaders = ["O. Panneerselvam", "D. Jayakumar", "C. Ve. Shanmugam", "K. P. Munusamy", "S. P. Velumani", "P. Thangamani", "R. Kamaraj", "C. Vijayabaskar", "Dindigul C. Sreenivasan", "K. A. Sengottaiyan"];
const tvkLeaders = ["Bussy Anand", "R. K. Suresh", "Mansoor Ali Khan", "S. A. Chandrasekhar", "Vijay", "P. Ramesh", "S. Karthik"];
const ntkLeaders = ["Seeman", "Idumbavanam Karthik", "Kaliammal", "Himayavan", "Vetri", "Sathyakala", "Abhinaya"];
const bjpLeaders = ["L. Murugan", "H. Raja", "Vanathi Srinivasan", "K. Annamalai", "Nainar Nagendran", "Pon Radhakrishnan", "C. P. Radhakrishnan"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const initials = ["A.", "K.", "S.", "M.", "P.", "R.", "V.", "J.", "T.", "G."];
const names = ["Kumar", "Rajan", "Selvam", "Murugan", "Senthil", "Baskar", "Prabhu", "Vijay", "Arun", "Dinesh", "Ganesan", "Natarajan", "Ramesh", "Suresh", "Karthik", "Balu", "Sekar", "Pandian", "Muthu", "Saravanan"];

const generateName = (party) => {
  if (party === "DMK" && Math.random() > 0.7) return getRandom(dmkLeaders);
  if (party === "AIADMK" && Math.random() > 0.7) return getRandom(admkLeaders);
  if (party === "TVK" && Math.random() > 0.7) return getRandom(tvkLeaders);
  if (party === "NTK" && Math.random() > 0.7) return getRandom(ntkLeaders);
  if (party === "BJP" && Math.random() > 0.7) return getRandom(bjpLeaders);
  return `${getRandom(initials)} ${getRandom(names)}`;
};

const updatedData = data.map(c => {
  c.nextElectionCandidates = [];
  
  // High profile overrides
  if (c.id === "13") { // Kolathur
    c.nextElectionCandidates.push({ name: "M. K. Stalin", party: "DMK" });
    c.nextElectionCandidates.push({ name: "D. Jayakumar", party: "AIADMK" });
    c.nextElectionCandidates.push({ name: "Bussy Anand", party: "TVK" });
    c.nextElectionCandidates.push({ name: "Soundara Pandian", party: "NTK" });
    c.nextElectionCandidates.push({ name: "K. Annamalai", party: "BJP" });
  } else if (c.id === "85" || c.name.toUpperCase().includes("EDAPPADI")) {
    c.nextElectionCandidates.push({ name: "Edappadi K. Palaniswami", party: "AIADMK" });
    c.nextElectionCandidates.push({ name: "T. M. Selvaganapathy", party: "DMK" });
    c.nextElectionCandidates.push({ name: "Vijay", party: "TVK" });
    c.nextElectionCandidates.push({ name: "R. Dinesh", party: "NTK" });
  } else if (c.id === "12" || c.name.toUpperCase().includes("PERAMBUR")) {
    c.nextElectionCandidates.push({ name: "R. D. Shekar", party: "DMK" });
    c.nextElectionCandidates.push({ name: "C. Joseph Vijay", party: "TVK" });
    c.nextElectionCandidates.push({ name: "S. Vetri Thamizhan", party: "NTK" });
    c.nextElectionCandidates.push({ name: "K. Elumalai", party: "AIADMK" });
  } else {
    // Standard set
    const parties = ["DMK", "AIADMK", "TVK", "NTK", "BJP"];
    parties.forEach(p => {
       c.nextElectionCandidates.push({
         name: generateName(p),
         party: p
       });
    });
  }

  return c;
});

fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
console.log("Successfully updated 2026 projections with real politician names and simulated candidates.");
