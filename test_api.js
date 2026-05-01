const axios = require('axios');

async function testCandidate(constituency) {
  console.log(`\n=== Testing: ${constituency} ===\n`);
  try {
    const response = await axios.post('http://localhost:5000/api/candidates', { constituency });
    console.log('✅ Success!');
    console.log('Source:', response.data.source);
    console.log('Candidates:');
    response.data.candidates.forEach(c => {
      console.log(`  - ${c.name} (${c.party})`);
    });
  } catch (err) {
    console.error('❌ Error:', err.response?.data || err.message);
  }
}

// Test a few constituencies
testCandidate('Kolathur');
testCandidate('Anna Nagar');
testCandidate('K Thousand Lights');